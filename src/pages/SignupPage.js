import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Firebase Authentication을 통해 사용자 등록
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            // Firestore에 사용자 데이터 저장
            await setDoc(doc(db, "users", user.uid), {
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
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
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
