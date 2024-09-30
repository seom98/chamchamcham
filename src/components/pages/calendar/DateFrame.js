import { useNavigate } from "react-router-dom";
import { BtnDate } from "../../ui/atoms/CustomButton";
import { CalendarFrame, Flex } from "../../ui/atoms/CustomDisplay";
import { useCalendar } from "../../../hooks/useCalendar";

// 날짜들이 적혀져 있는 부분
const DateFrame = () => {
    const navigate = useNavigate();
    const { dates, today, formatDate } = useCalendar();
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
                            $blue={d.date.getDate() === 3}
                            $yellow={d.date.getDate() === 5}
                            $red={d.date.getDate() === 7}
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
