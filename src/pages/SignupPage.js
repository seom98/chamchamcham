import { useNavigate } from "react-router-dom";
import { useAccount } from "../hooks/useAccount";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import { PosEC } from "../components/ui/molecules/CustomPosition";
import { BtnAwe } from "../components/ui/atoms/CustomButton";
import { Text12, Text16 } from "../components/ui/atoms/CustomText";
import { IptNor, IptPas } from "../components/ui/atoms/CustomInput";
import Title from "../components/ui/organisms/Title";
import {
    AtIcon,
    Cancel01Icon,
    CheckmarkSquare01Icon,
    UserSquareIcon,
    ViewIcon,
    ViewOffIcon,
} from "hugeicons-react";
import { Flex, FlexE } from "../components/ui/molecules/CustomDisplay";

export default function SignupPage() {
    // useAccount 훅에서 필요한 상태와 함수들을 가져옴
    const {
        formData,
        errors,
        showPassword,
        loading,
        setShowPassword,
        handleChange,
        handleSignup,
        handleClearInput,
        InputIcon,
    } = useAccount();
    const navigate = useNavigate();

    return useAuthRedirect(
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSignup();
                }}
            >
                <PosEC>
                    <Title margin="2rem" />

                    {/*이메일 입력 필드*/}
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
                        <Text12 $red $height={"1rem"}>
                            {errors.password}
                        </Text12>
                    </FlexE>

                    {/* 비밀번호확인 입력 필드 */}
                    <IptNor
                        type="password"
                        name="confirmPassword"
                        placeholder="비밀번호 확인"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    >
                        <InputIcon
                            value={formData.confirmPassword}
                            icon={CheckmarkSquare01Icon}
                            isGrey={true}
                        />
                        <InputIcon
                            value={formData.confirmPassword}
                            icon={Cancel01Icon}
                            onClick={() => handleClearInput("confirmPassword")}
                        />
                    </IptNor>

                    {/* 비밀번호확인 에러 메시지 */}
                    <FlexE>
                        <Text12 $red $height={"1rem"}>
                            {errors.confirmPassword}
                        </Text12>
                    </FlexE>

                    {/* 닉네임 입력 필드 */}
                    <IptNor
                        type="text"
                        name="nickname"
                        placeholder="닉네임"
                        value={formData.nickname}
                        onChange={handleChange}
                        required
                    >
                        <InputIcon
                            value={formData.nickname}
                            icon={UserSquareIcon}
                            isGrey={true}
                        />
                        <InputIcon
                            value={formData.nickname}
                            icon={Cancel01Icon}
                            onClick={() => handleClearInput("nickname")}
                        />
                    </IptNor>

                    {/* 닉네임 에러 메시지 */}
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
        </>
    );
}
