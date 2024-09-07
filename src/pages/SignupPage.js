import React from "react";
import { useNavigate } from "react-router-dom";
// 훅
import { useAccount } from "../hooks/useAccount";
import {
    Flex,
    FlexEnd,
    PositionEnd,
    Relative,
} from "../components/ui/molecules/CustomPosition";
import { ButtonAwesome } from "../components/ui/atoms/CustomButton";
import { Text12, Text16 } from "../components/ui/atoms/CustomText";
import Title from "../components/ui/organisms/Title";
import { InputNormal, InputPassword } from "../components/ui/atoms/CustomInput";
import { AtIcon, Cancel01Icon, ViewIcon, ViewOffIcon } from "hugeicons-react";

export default function SignupPage() {
    const {
        email,
        password,
        confirmPassword,
        loading,
        nickname,
        errors,
        showPassword,
        setEmail,
        setShowPassword,
        setPassword,
        signup,
        emailChange,
        passwordChange,
        confirmPasswordChange,
        nicknameChange,
    } = useAccount(); //로그인 커스텀 훅을 가져옴.
    const navigate = useNavigate();

    return (
        <Relative>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    signup();
                }}
            >
                <PositionEnd>
                    <Title margin="2rem" />
                    <InputNormal
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={emailChange}
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
                    <FlexEnd>
                        <Text12 $red $height={"1rem"}>
                            {errors.email}
                        </Text12>
                    </FlexEnd>
                    <InputPassword
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호"
                        value={password}
                        onChange={passwordChange}
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
                    <FlexEnd>
                        <Text12 $red $height={"1rem"}>
                            {errors.password}
                        </Text12>
                    </FlexEnd>
                    <InputNormal
                        type="password"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={confirmPasswordChange}
                        required
                    >
                        <AtIcon
                            size={24}
                            color={
                                confirmPassword
                                    ? "var(--grey8)"
                                    : "var(--grey5)"
                            }
                            variant={"stroke"}
                            style={{ transition: "0.2s" }}
                        />
                        <Cancel01Icon
                            size={24}
                            color={
                                confirmPassword ? "var(--grey8)" : "transparent"
                            }
                            variant={"stroke"}
                            style={{ transition: "0.2s" }}
                            onClick={() => setEmail("")}
                        />
                    </InputNormal>
                    <FlexEnd>
                        <Text12 $red $height={"1rem"}>
                            {errors.confirmPassword}
                        </Text12>
                    </FlexEnd>
                    <InputNormal
                        type="text"
                        placeholder="닉네임"
                        value={nickname}
                        onChange={nicknameChange}
                        required
                    >
                        <AtIcon
                            size={24}
                            color={nickname ? "var(--grey8)" : "var(--grey5)"}
                            variant={"stroke"}
                            style={{ transition: "0.2s" }}
                        />
                        <Cancel01Icon
                            size={24}
                            color={nickname ? "var(--grey8)" : "transparent"}
                            variant={"stroke"}
                            style={{ transition: "0.2s" }}
                            onClick={() => setEmail("")}
                        />
                    </InputNormal>
                    <FlexEnd>
                        <Text12 $red $height={"1rem"} $margin={"0 0 1rem"}>
                            {errors.nickname}
                        </Text12>
                    </FlexEnd>
                    <ButtonAwesome
                        type="submit"
                        $margin={"0 2.5rem 1.2rem"}
                        disabled={loading}
                    >
                        {loading ? "회원가입 하는중..." : "회원가입"}
                    </ButtonAwesome>
                    <Flex>
                        <Text16 $grey>이미 회원이신가요?&nbsp;&nbsp;</Text16>
                        <Text16 $blue onClick={() => navigate("/login")}>
                            로그인하기
                        </Text16>
                    </Flex>
                </PositionEnd>
            </form>
        </Relative>
    );
}
