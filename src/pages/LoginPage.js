// src/pages/LoginPage.js

import React, { useState } from "react";

import { useAuthRedirect } from "../components/hooks/useAuthRedirect"; // 커스텀 훅 불러오기
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { InputNormal, InputPassword } from "../components/ui/atoms/CustomInput";
import Title from "../components/ui/organisms/Title";
import { ButtonWhite } from "../components/ui/atoms/CustomButton";
import { Text16 } from "../components/ui/atoms/CustomText";
import {
    Flex,
    FlexCenter,
    PositionEnd,
    Relative,
} from "../components/ui/molecules/CustomPosition";
import { AtIcon, Cancel01Icon, ViewIcon, ViewOffIcon } from "hugeicons-react";

export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    return useAuthRedirect(
        <Relative>
            <form onSubmit={handleLogin}>
                <FlexCenter>
                    <Title margin="2rem" />
                    <InputNormal
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    >
                        <AtIcon
                            size={24}
                            color={email ? "var(--grey8)" : "var(--grey5)"}
                            variant={"stroke"}
                            style={{ transition: "0.2s" }}
                        />
                        <Cancel01Icon
                            size={24}
                            color={email ? "var(--grey8)" : "transparent"}
                            variant={"stroke"}
                            style={{ transition: "0.2s" }}
                            onClick={() => setEmail("")}
                        />
                    </InputNormal>
                    <InputPassword
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    >
                        {showPassword ? (
                            <ViewIcon
                                size={24}
                                color={
                                    password ? "var(--grey8)" : "transparent"
                                }
                                variant={"stroke"}
                                style={{ transition: "0.2s" }}
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <ViewOffIcon
                                size={24}
                                color={
                                    password ? "var(--grey8)" : "transparent"
                                }
                                variant={"stroke"}
                                style={{ transition: "0.2s" }}
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                        <Cancel01Icon
                            size={24}
                            color={password ? "var(--grey8)" : "transparent"}
                            variant={"stroke"}
                            style={{ transition: "0.2s" }}
                            onClick={() => setPassword("")}
                        />
                    </InputPassword>
                </FlexCenter>
                <PositionEnd>
                    <ButtonWhite
                        type="submit"
                        $margin={"0 2.5rem 1.2rem"}
                        disabled={loading}
                    >
                        {loading ? "로그인 하는중..." : "로그인"}
                    </ButtonWhite>
                    <Flex>
                        <Text16 $grey>
                            아직 회원이 아니신가요?&nbsp;&nbsp;
                        </Text16>
                        <Text16 $blue onClick={() => navigate("/signup")}>
                            회원가입하기
                        </Text16>
                    </Flex>
                </PositionEnd>
            </form>
        </Relative>
    );
}
