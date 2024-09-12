import { Box1, Box2 } from "../../ui/atoms/CustomBox";
import { Text12, Text16 } from "../../ui/atoms/CustomText";
import { FlexB } from "../../ui/molecules/CustomPosition";

export default function Explanation() {
    return (
        <Box1>
            <Text16 $margin={"1rem 0 0"}>하루에 낭비된다고 생각하는</Text16>
            <Text16 $margin={"0 0 1rem"}>항목들을 추가해보세요~!</Text16>
            <Text12 $light>{"예시)"}</Text12>
            <Box2>
                <FlexB>
                    <Text12 $light>간식</Text12>
                    <Text12>3,000원</Text12>
                </FlexB>
            </Box2>
            <Box2>
                <FlexB>
                    <Text12 $light>술</Text12>
                    <Text12>12,000원</Text12>
                </FlexB>
            </Box2>
        </Box1>
    );
}
