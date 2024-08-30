// src/pages/LoginPage.js

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/move");
        } catch (error) {
            alert("로그인 실패: " + error.message);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <div>
                <div>로그인 하는중!!! 좀만기달~~</div>
            </div>
        );
    }

    return (
        <div>
            <h2>로그인</h2>
            <div>
                혹시 아직 회원이 아니세요?
                <b onClick={() => navigate("/signup")}>회원가입하기</b>
            </div>
            <form onSubmit={handleLogin}>
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
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}
