import { CalendarFrame } from "../../ui/atoms/CustomDisplay";
import { Text16 } from "../../ui/atoms/CustomText";

// 요일이 적혀져있는 부분
const WeekFrame = () => {
    return (
        <CalendarFrame>
            <Text16 $red $light>
                일
            </Text16>
            <Text16 $light>월</Text16>
            <Text16 $light>화</Text16>
            <Text16 $light>수</Text16>
            <Text16 $light>목</Text16>
            <Text16 $light>금</Text16>
            <Text16 $blue $light>
                토
            </Text16>
        </CalendarFrame>
    );
};
export default WeekFrame;
