import { useNavigate } from "react-router-dom";
import { BtnDate } from "../../ui/atoms/CustomButton";
import { CalendarFrame, Flex } from "../../ui/atoms/CustomDisplay";
import { useCalendar } from "../../../hooks/useCalendar";

// 날짜들이 적혀져 있는 부분
const DateFrame = ({ dates, monthlyData }) => {
    const navigate = useNavigate();
    const { today, formatDate } = useCalendar();

    return (
        <CalendarFrame>
            {dates.map((d, index) => {
                return (
                    <Flex key={index}>
                        <BtnDate
                            onClick={() => {
                                if (
                                    !(
                                        d.date.getMonth() ===
                                            today.getMonth() &&
                                        d.date.getDate() > today.getDate()
                                    ) &&
                                    d.isInCurrentMonth
                                ) {
                                    navigate(`${formatDate(d.date)}`);
                                }
                            }}
                            $today={
                                d.date.getFullYear() === today.getFullYear() &&
                                d.date.getMonth() === today.getMonth() &&
                                d.date.getDate() === today.getDate()
                            }
                            $null={!d.isInCurrentMonth}
                            $after={
                                d.date.getMonth() === today.getMonth() &&
                                d.date.getDate() > today.getDate()
                            }
                            $blue={
                                monthlyData &&
                                monthlyData.monthlySuccessList[index] === "blue"
                            }
                            $yellow={
                                monthlyData &&
                                monthlyData.monthlySuccessList[index] ===
                                    "yellow"
                            }
                            $red={
                                monthlyData &&
                                monthlyData.monthlySuccessList[index] === "red"
                            }
                        >
                            {d.date.getDate()}
                        </BtnDate>
                    </Flex>
                );
            })}
        </CalendarFrame>
    );
};

export default DateFrame;
