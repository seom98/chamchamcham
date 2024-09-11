import { useNavigate } from "react-router-dom";
import { useAccount } from "../hooks/useAccount"; // 회원가입 커스텀 훅
import { useAuthRedirect } from "../hooks/useAuthRedirect"; // 로그인 한 상태인경우 화면이동 커스텀 훅
import {
    Flex,
    FlexE,
    PosEC,
    PosRela,
} from "../components/ui/molecules/CustomPosition"; // 포지션 컴포넌트
import { BtnAwe } from "../components/ui/atoms/CustomButton"; //버튼 컴포넌트
import { Text12, Text16 } from "../components/ui/atoms/CustomText"; // 텍스트 컴포넌트
import { IptNor, IptPas } from "../components/ui/atoms/CustomInput"; // 인풋 컴포넌트
import Title from "../components/ui/organisms/Title"; // 타이틀 컴포넌트
import {
    AtIcon,
    Cancel01Icon,
    CheckmarkSquare01Icon,
    UserSquareIcon,
    ViewIcon,
    ViewOffIcon,
} from "hugeicons-react";

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
        setConfirmPassword,
        setNickname,
        signup,
        emailChange,
        passwordChange,
        confirmPasswordChange,
        nicknameChange,
    } = useAccount(); //로그인 커스텀 훅을 가져옴.
    const navigate = useNavigate();

    return useAuthRedirect(
        <PosRela>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    signup();
                }}
            >
                <PosEC>
                    <Title margin="2rem" />
                    <IptNor
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={emailChange}
                        required
                    >
                        <AtIcon
                            size={24}
                            color={email ? "var(--grey8)" : "var(--grey5)"}
                            style={{ transition: "0.2s" }}
                        />
                        <Cancel01Icon
                            size={24}
                            color={email ? "var(--grey8)" : "transparent"}
                            style={{ transition: "0.2s" }}
                            onClick={() => setEmail("")}
                        />
                    </IptNor>
                    <FlexE>
                        <Text12 $red $height={"1rem"}>
                            {errors.email}
                        </Text12>
                    </FlexE>
                    <IptPas
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
                                style={{ transition: "0.2s" }}
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <ViewOffIcon
                                size={24}
                                color={
                                    password ? "var(--grey8)" : "transparent"
                                }
                                style={{ transition: "0.2s" }}
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                        <Cancel01Icon
                            size={24}
                            color={password ? "var(--grey8)" : "transparent"}
                            style={{ transition: "0.2s" }}
                            onClick={() => setPassword("")}
                        />
                    </IptPas>
                    <FlexE>
                        <Text12 $red $height={"1rem"}>
                            {errors.password}
                        </Text12>
                    </FlexE>
                    <IptNor
                        type="password"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={confirmPasswordChange}
                        required
                    >
                        <CheckmarkSquare01Icon
                            size={24}
                            color={
                                confirmPassword
                                    ? "var(--grey8)"
                                    : "var(--grey5)"
                            }
                            style={{ transition: "0.2s" }}
                        />
                        <Cancel01Icon
                            size={24}
                            color={
                                confirmPassword ? "var(--grey8)" : "transparent"
                            }
                            style={{ transition: "0.2s" }}
                            onClick={() => setConfirmPassword("")}
                        />
                    </IptNor>
                    <FlexE>
                        <Text12 $red $height={"1rem"}>
                            {errors.confirmPassword}
                        </Text12>
                    </FlexE>
                    <IptNor
                        type="text"
                        placeholder="닉네임"
                        value={nickname}
                        onChange={nicknameChange}
                        required
                    >
                        <UserSquareIcon
                            size={24}
                            color={nickname ? "var(--grey8)" : "var(--grey5)"}
                            style={{ transition: "0.2s" }}
                        />
                        <Cancel01Icon
                            size={24}
                            color={nickname ? "var(--grey8)" : "transparent"}
                            style={{ transition: "0.2s" }}
                            onClick={() => setNickname("")}
                        />
                    </IptNor>
                    <FlexE>
                        <Text12 $red $height={"1rem"} $margin={"0 0 1rem"}>
                            {errors.nickname}
                        </Text12>
                    </FlexE>
                    <BtnAwe
                        type="submit"
                        $margin={"0 2.5rem 1.2rem"}
                        disabled={loading}
                    >
                        {loading ? "회원가입 하는중..." : "회원가입"}
                    </BtnAwe>
                    <Flex>
                        <Text16 $grey>이미 회원이신가요?&nbsp;&nbsp;</Text16>
                        <Text16 $blue onClick={() => navigate("/login")}>
                            로그인하기
                        </Text16>
                    </Flex>
                </PosEC>
            </form>
        </PosRela>
    );
}
