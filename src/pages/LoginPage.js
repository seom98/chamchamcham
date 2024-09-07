import React from "react";
import { useNavigate } from "react-router-dom";
// 훅
import { useAccount } from "../hooks/useAccount";
// 스타일드 컴포넌트
import { InputNormal, InputPassword } from "../components/ui/atoms/CustomInput";
import { ButtonWhite } from "../components/ui/atoms/CustomButton";
import { Text16 } from "../components/ui/atoms/CustomText";
import {
    Flex,
    FlexCenter,
    PositionEnd,
    Relative,
} from "../components/ui/molecules/CustomPosition";
// 타이틀
import Title from "../components/ui/organisms/Title";
// 아이콘
import { AtIcon, Cancel01Icon, ViewIcon, ViewOffIcon } from "hugeicons-react";

export default function LoginPage() {
    const {
        email,
        password,
        showPassword,
        loading,
        setEmail,
        setPassword,
        setShowPassword,
        login,
    } = useAccount(); //로그인 커스텀 훅을 가져옴.
    const navigate = useNavigate();

    return (
        <Relative>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    login();
                }}
            >
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
