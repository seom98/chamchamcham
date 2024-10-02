import { Flex } from "../../ui/atoms/CustomDisplay";
import { Text16, Text30 } from "../../ui/atoms/CustomText";

// 월간 절약한 금액을 보여주는 타이틀
const MonthlySavingTitle = ({ month, monthlyData }) => {
    return (
        <Flex $align={"baseline"} $gap={"0.3rem"}>
            <Text16>{month + 1}월 동안 </Text16>
            <Text30 $awesome $margin={"0 0 1rem"}>
                {monthlyData ? monthlyData.monthlySuccess : 0}
            </Text30>
            <Text16> 원 절약</Text16>
        </Flex>
    );
};
export default MonthlySavingTitle;
