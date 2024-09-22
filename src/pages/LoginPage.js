import React from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../hooks/useAccount"; // 로그인 커스텀 훅
import { useAuthRedirect } from "../hooks/useAuthRedirect"; // 로그인 한 상태인경우 화면이동 커스텀 훅
import { PosEC } from "../components/ui/molecules/CustomPosition"; // 포지션 컴포넌트
import { IptNor, IptPas } from "../components/ui/atoms/CustomInput"; // 인풋 컴포넌트
import { BtnWhi } from "../components/ui/atoms/CustomButton"; //버튼 컴포넌트
import { Text16 } from "../components/ui/atoms/CustomText"; // 텍스트 컴포넌트
import Title from "../components/ui/organisms/Title"; // 타이틀 컴포넌트
import { AtIcon, Cancel01Icon, ViewIcon, ViewOffIcon } from "hugeicons-react";
import { Flex, FlexCC } from "../components/ui/molecules/CustomDisplay";

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

    return useAuthRedirect(
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    login();
                }}
            >
                <FlexCC>
                    <Title margin="2rem" />
                    <IptNor
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    >
                        <AtIcon
                            size={24}
                            color={email ? "var(--grey8)" : "var(--grey5)"}
                        />
                        <Cancel01Icon
                            size={24}
                            color={email ? "var(--grey8)" : "transparent"}
                            onClick={() => setEmail("")}
                        />
                    </IptNor>
                    <IptPas
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
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <ViewOffIcon
                                size={24}
                                color={
                                    password ? "var(--grey8)" : "transparent"
                                }
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                        <Cancel01Icon
                            size={24}
                            color={password ? "var(--grey8)" : "transparent"}
                            onClick={() => setPassword("")}
                        />
                    </IptPas>
                </FlexCC>
                <PosEC>
                    <BtnWhi
                        type="submit"
                        $margin={"0 2.5rem 1.2rem"}
                        disabled={loading}
                    >
                        {loading ? "로그인 하는중..." : "로그인"}
                    </BtnWhi>
                    <Flex>
                        <Text16 $grey>
                            아직 회원이 아니신가요?&nbsp;&nbsp;
                        </Text16>
                        <Text16 $blue onClick={() => navigate("/signup")}>
                            회원가입하기
                        </Text16>
                    </Flex>
                </PosEC>
            </form>
        </>
    );
}
