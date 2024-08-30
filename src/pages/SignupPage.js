import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function SignupPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    // 이메일 형식을 실시간으로 검증
    const handleEmailChange = (e) => {
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

    // 비밀번호 입력이 변경될 때마다 길이 검증
    const handlePasswordChange = (e) => {
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

    // 비밀번호 확인 입력 필드가 변경될 때마다 비밀번호 일치 여부 확인
    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;

        setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword:
                value !== password ? "비밀번호가 일치하지 않습니다." : "",
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

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

    if (loading) {
        return (
            <div>
                <div>회원가입 하는중!!! 좀만기달~~</div>
                <div>아 경고안달았는데 비번 6자리 이상 적어야함.</div>
                <div>이메일 형식도 지켜야함!!</div>
            </div>
        );
    }

    return (
        <div>
            <h2>회원가입</h2>
            <div>
                혹시 벌써 회원이세요?{" "}
                <b onClick={() => navigate("/login")}>로그인하기</b>
            </div>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <p
                    style={{
                        color: "var(--red)",
                        fontSize: "0.8rem",
                        marginLeft: "1rem",
                    }}
                >
                    {errors.email}
                </p>
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <p
                    style={{
                        color: "var(--red)",
                        fontSize: "0.8rem",
                        marginLeft: "1rem",
                    }}
                >
                    {errors.password}
                </p>
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    onChange={handleConfirmPasswordChange}
                    required
                />
                <p
                    style={{
                        color: "var(--red)",
                        fontSize: "0.8rem",
                        marginLeft: "1rem",
                    }}
                >
                    {errors.confirmPassword}
                </p>
                <input
                    type="text"
                    placeholder="닉네임"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}
