import { useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { db, auth } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// 로그인, 회원가입, 로그아웃을 위한 커스텀 훅
export function useAccount() {
    const [email, setEmail] = useState(""); //이메일
    const [password, setPassword] = useState(""); // 비밀번호
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호확인
    const [showPassword, setShowPassword] = useState(false); //비밀번호 보기
    const [loading, setLoading] = useState(false); //로딩 상태
    const [nickname, setNickname] = useState(""); //닉네임
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        nickname: "",
    }); // 각각에 대한 에러메시지
    const navigate = useNavigate();

    // 로그인 함수
    const login = async () => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (error) {
            alert("로그인 실패: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    // 회원가입 함수
    const signup = async () => {
        // 모든 오류 메시지가 빈 문자열인지 확인
        const isValid = Object.values(errors).every((error) => error === "");

        if (!isValid) {
            alert("입력한 정보를 확인해주세요.");
            return;
        }

        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                failure: 0,
                success: 0,
                point: 0,
                level: 1,
                itemList: [],
                moneyList: [],
                email: user.email,
                nickname: nickname,
                uid: user.uid,
            });

            alert("회원가입 성공");
            navigate("/login");
        } catch (error) {
            alert("회원가입 실패: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    // 로그아웃 함수
    const logout = async () => {
        try {
            await signOut(auth);
            sessionStorage.clear(); // 세션 스토리지에 있는 모든 데이터를 삭제
            navigate("/"); // 로그아웃 후 메인 페이지로 리디렉션
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    // 이메일 형식 검증 함수
    const emailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: !emailRegex.test(value)
                ? "유효한 이메일 형식을 입력하세요."
                : "",
        }));
    };

    // 비밀번호 길이 검증 함수
    const passwordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        setErrors((prevErrors) => ({
            ...prevErrors,
            password:
                value.length < 6
                    ? "비밀번호는 최소 6자리 이상이어야 합니다."
                    : "",
        }));
    };
    // 비밀번호 길이 검증 함수
    const nicknameChange = (e) => {
        const value = e.target.value;
        setNickname(value);

        setErrors((prevErrors) => ({
            ...prevErrors,
            nickname:
                value.length < 1 || value.length > 10
                    ? "닉네임은 1자리 - 10자리 이어야 합니다."
                    : "",
        }));
    };

    // 비밀번호 확인 입력 필드와 일치 여부 검증 함수
    const confirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword:
                value !== password ? "비밀번호가 일치하지 않습니다." : "",
        }));
    };

    return {
        email,
        password,
        showPassword,
        loading,
        nickname,
        errors,
        confirmPassword,
        setEmail,
        setPassword,
        setShowPassword,
        setNickname,
        setErrors,
        setConfirmPassword,
        login,
        signup,
        logout,
        emailChange,
        passwordChange,
        confirmPasswordChange,
        nicknameChange,
    };
}
