import { ArrowRight01Icon } from "hugeicons-react";
import { Box1 } from "../../ui/atoms/CustomBox";
import { BtnNor } from "../../ui/atoms/CustomButton";
import { Text12, Text16 } from "../../ui/atoms/CustomText";
import { FlexB } from "../../ui/atoms/CustomDisplay";

// 앱정보에 관련된 박스
const AppInformations = () => {
    return (
        <Box1>
            <BtnNor>
                <FlexB $gap={"1rem"}>
                    <Text16>개인정보 처리방침</Text16>
                    <ArrowRight01Icon size={24} color={"var(--grey8)"} />
                </FlexB>
            </BtnNor>
            <BtnNor>
                <FlexB $gap={"1rem"}>
                    <Text16>이용약관</Text16>
                    <ArrowRight01Icon size={24} color={"var(--grey8)"} />
                </FlexB>
            </BtnNor>
            <BtnNor>
                <FlexB $gap={"1rem"}>
                    <Text16>앱정보</Text16>
                    <ArrowRight01Icon size={24} color={"var(--grey8)"} />
                </FlexB>
            </BtnNor>
            <BtnNor>
                <FlexB $gap={"1rem"}>
                    <Text16>버전</Text16>
                    <Text12 $light $grey $margin={"0 0.5rem"}>
                        Ver.0.4.0
                    </Text12>
                </FlexB>
            </BtnNor>
        </Box1>
    );
};

export default AppInformations;
