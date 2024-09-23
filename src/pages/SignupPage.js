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
    const {
        formData,
        errors,
        showPassword,
        loading,
        setShowPassword,
        handleChange,
        handleSignup,
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
                    <IptNor
                        type="email"
                        name="email"
                        placeholder="이메일"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    >
                        <AtIcon
                            size={24}
                            color={
                                formData.email ? "var(--grey8)" : "var(--grey5)"
                            }
                        />
                        <Cancel01Icon
                            size={24}
                            color={
                                formData.email ? "var(--grey8)" : "transparent"
                            }
                            onClick={() =>
                                handleChange({
                                    target: { name: "email", value: "" },
                                })
                            }
                        />
                    </IptNor>
                    <FlexE>
                        <Text12 $red $height={"1rem"}>
                            {errors.email}
                        </Text12>
                    </FlexE>
                    <IptPas
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="비밀번호"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    >
                        {showPassword ? (
                            <ViewIcon
                                size={24}
                                color={
                                    formData.password
                                        ? "var(--grey8)"
                                        : "transparent"
                                }
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <ViewOffIcon
                                size={24}
                                color={
                                    formData.password
                                        ? "var(--grey8)"
                                        : "transparent"
                                }
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                        <Cancel01Icon
                            size={24}
                            color={
                                formData.password
                                    ? "var(--grey8)"
                                    : "transparent"
                            }
                            onClick={() =>
                                handleChange({
                                    target: { name: "password", value: "" },
                                })
                            }
                        />
                    </IptPas>
                    <FlexE>
                        <Text12 $red $height={"1rem"}>
                            {errors.password}
                        </Text12>
                    </FlexE>
                    <IptNor
                        type="password"
                        name="confirmPassword"
                        placeholder="비밀번호 확인"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    >
                        <CheckmarkSquare01Icon
                            size={24}
                            color={
                                formData.confirmPassword
                                    ? "var(--grey8)"
                                    : "var(--grey5)"
                            }
                        />
                        <Cancel01Icon
                            size={24}
                            color={
                                formData.confirmPassword
                                    ? "var(--grey8)"
                                    : "transparent"
                            }
                            onClick={() =>
                                handleChange({
                                    target: {
                                        name: "confirmPassword",
                                        value: "",
                                    },
                                })
                            }
                        />
                    </IptNor>
                    <FlexE>
                        <Text12 $red $height={"1rem"}>
                            {errors.confirmPassword}
                        </Text12>
                    </FlexE>
                    <IptNor
                        type="text"
                        name="nickname"
                        placeholder="닉네임"
                        value={formData.nickname}
                        onChange={handleChange}
                        required
                    >
                        <UserSquareIcon
                            size={24}
                            color={
                                formData.nickname
                                    ? "var(--grey8)"
                                    : "var(--grey5)"
                            }
                        />
                        <Cancel01Icon
                            size={24}
                            color={
                                formData.nickname
                                    ? "var(--grey8)"
                                    : "transparent"
                            }
                            onClick={() =>
                                handleChange({
                                    target: { name: "nickname", value: "" },
                                })
                            }
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
        </>
    );
}
