import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import { FlexA } from "../../ui/atoms/CustomDisplay";
import { Text20 } from "../../ui/atoms/CustomText";
import { useCalendar } from "../../../hooks/useCalendar";

// 월 이동을 하는 부분
const MonthlyMovement = () => {
    const { year, month, today, goToPrevMonth, goToNextMonth } = useCalendar();
    return (
        <FlexA>
            <ArrowLeft01Icon
                size={24}
                color={"var(--grey8)"}
                onClick={goToPrevMonth}
            />
            <Text20>
                {year}년 {month + 1}월
            </Text20>

            <ArrowRight01Icon
                size={24}
                color={
                    !(
                        year === today.getFullYear() &&
                        month === today.getMonth()
                    )
                        ? "var(--grey8)"
                        : "var(--grey2)"
                }
                onClick={goToNextMonth}
            />
        </FlexA>
    );
};
export default MonthlyMovement;
