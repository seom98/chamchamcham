import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../hooks/useAccount";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import { PosEC } from "../components/ui/molecules/CustomPosition";
import { IptNor, IptPas } from "../components/ui/atoms/CustomInput";
import { BtnWhi } from "../components/ui/atoms/CustomButton";
import { Text12, Text16 } from "../components/ui/atoms/CustomText";
import Title from "../components/ui/organisms/Title";
import { AtIcon, Cancel01Icon, ViewIcon, ViewOffIcon } from "hugeicons-react";
import { Flex, FlexE } from "../components/ui/molecules/CustomDisplay";

export default function LoginPage() {
    // useAccount 훅에서 필요한 상태와 함수들을 가져옴
    const {
        formData,
        errors,
        showPassword,
        loading,
        setShowPassword,
        handleChange,
        handleLogin,
        handleClearInput,
        InputIcon,
    } = useAccount();
    const navigate = useNavigate();

    // 폼의 유효성을 검사하는 메모이제이션된 값
    const isFormValid = useMemo(
        () =>
            !errors.email &&
            !errors.password &&
            formData.email &&
            formData.password,
        [errors.email, errors.password, formData.email, formData.password]
    );

    // useAuthRedirect 훅을 사용하여 인증된 사용자를 리다이렉트
    return useAuthRedirect(
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (isFormValid) handleLogin();
            }}
        >
            <PosEC>
                <Title margin="2rem" />
                {/* 이메일 입력 필드 */}
                <IptNor
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={formData.email}
                    onChange={handleChange}
                    required
                >
                    <InputIcon
                        value={formData.email}
                        icon={AtIcon}
                        isGrey={true}
                    />
                    <InputIcon
                        value={formData.email}
                        icon={Cancel01Icon}
                        onClick={() => handleClearInput("email")}
                    />
                </IptNor>

                {/* 이메일 에러 메시지 */}
                <FlexE>
                    <Text12 $red $height={"1rem"}>
                        {errors.email}
                    </Text12>
                </FlexE>

                {/* 비밀번호 입력 필드 */}
                <IptPas
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                    required
                >
                    <InputIcon
                        value={formData.password}
                        icon={showPassword ? ViewIcon : ViewOffIcon}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                    <InputIcon
                        value={formData.password}
                        icon={Cancel01Icon}
                        onClick={() => handleClearInput("password")}
                    />
                </IptPas>

                {/* 비밀번호 에러 메시지 */}
                <FlexE>
                    <Text12 $red $height={"1rem"} $margin={"0 0 1rem"}>
                        {errors.password}
                    </Text12>
                </FlexE>

                {/* 로그인 버튼 */}
                <BtnWhi
                    type="submit"
                    $margin={"0 2.5rem 1.2rem"}
                    disabled={loading || !isFormValid}
                >
                    {loading ? "로그인 하는중..." : "로그인"}
                </BtnWhi>

                {/* 회원가입 링크 */}
                <Flex>
                    <Text16 $grey>아직 회원이 아니신가요?&nbsp;&nbsp;</Text16>
                    <Text16 $blue onClick={() => navigate("/signup")}>
                        회원가입하기
                    </Text16>
                </Flex>
            </PosEC>
        </form>
    );
}
