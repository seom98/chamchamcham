import { useState, useCallback } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { db, auth } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// 상수 정의
const ERROR_MESSAGES = {
    EMAIL: "유효한 이메일 형식을 입력하세요.",
    PASSWORD: "비밀번호는 최소 6자리 이상이어야 합니다.",
    CONFIRM_PASSWORD: "비밀번호가 일치하지 않습니다.",
    NICKNAME: "닉네임은 1자리 - 10자리 이어야 합니다.",
};

const INITIAL_USER_DATA = {
    failure: 0,
    success: 0,
    point: 0,
    level: 1,
    itemList: [],
    moneyList: [],
};

// 로그인, 회원가입, 로그아웃을 위한 커스텀 훅
export function useAccount() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        nickname: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        nickname: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateField = useCallback(
        (name, value) => {
            let error = "";
            switch (name) {
                case "email":
                    error =
                        value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                            ? ERROR_MESSAGES.EMAIL
                            : "";
                    break;
                case "password":
                    error =
                        value && value.length < 6
                            ? ERROR_MESSAGES.PASSWORD
                            : "";
                    break;
                case "confirmPassword":
                    error =
                        value && value !== formData.password
                            ? ERROR_MESSAGES.CONFIRM_PASSWORD
                            : "";
                    break;
                case "nickname":
                    error =
                        value && (value.length < 1 || value.length > 10)
                            ? ERROR_MESSAGES.NICKNAME
                            : "";
                    break;
                default:
                    break;
            }
            setErrors((prev) => ({ ...prev, [name]: error }));
        },
        [formData.password]
    );

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
            validateField(name, value);
        },
        [validateField]
    );

    //
    const handleError = useCallback((error, action) => {
        console.error(`Error during ${action}:`, error);
        alert(`${action} 실패: ${error.message}`);
    }, []);

    const handleLogin = useCallback(async () => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            navigate("/home");
        } catch (error) {
            handleError(error, "로그인");
        } finally {
            setLoading(false);
        }
    }, [formData.email, formData.password, navigate, handleError]);

    const handleSignup = useCallback(async () => {
        const isValid = Object.values(errors).every((error) => error === "");
        if (!isValid) {
            alert("입력한 정보를 확인해주세요.");
            return;
        }

        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                ...INITIAL_USER_DATA,
                email: user.email,
                nickname: formData.nickname,
                uid: user.uid,
            });

            alert("회원가입 성공");
            navigate("/handleLogin");
        } catch (error) {
            handleError(error, "회원가입");
        } finally {
            setLoading(false);
        }
    }, [formData, errors, navigate, handleError]);

    const handleLogout = useCallback(async () => {
        try {
            await signOut(auth);
            sessionStorage.clear();
            navigate("/");
        } catch (error) {
            handleError(error, "로그아웃");
        }
    }, [navigate, handleError]);

    // 입력 필드를 초기화하는 함수
    const handleClearInput = (fieldName) => {
        handleChange({ target: { name: fieldName, value: "" } });
    };

    // 입력 필드 아이콘을 위한 재사용 가능한 컴포넌트
    const InputIcon = ({ value, icon: Icon, onClick, isGrey }) => (
        <Icon
            size={24}
            color={
                value ? "var(--grey8)" : isGrey ? "var(--grey5)" : "transparent"
            }
            onClick={onClick}
        />
    );

    return {
        formData,
        errors,
        showPassword,
        loading,
        setShowPassword,
        handleChange,
        handleLogin,
        handleSignup,
        handleLogout,
        handleClearInput,
        InputIcon,
    };
}
