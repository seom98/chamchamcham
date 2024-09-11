import React from "react";
import styles from "./CalendarPage.module.css";
import { useState } from "react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import { PosRela } from "../components/ui/molecules/CustomPosition";

export default function CalendarPage() {
    // const navigate = useNavigate();
    // 현재 날짜 가져오기 및 상태 설정
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());

    // 달의 첫째 날과 마지막 날 구하기
    const firstDayOfMonth = new Date(year, month, 1); // 해당 월의 첫째 날을 구함
    const lastDayOfMonth = new Date(year, month + 1, 0); // 해당 월의 마지막 날을 구함

    // 달력에 표시할 날짜 배열 만들기
    const dates = []; // 날짜를 저장할 배열 생성
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 해당 월의 첫째 날의 요일을 구함
    for (let i = 1 - firstDayOfWeek; i <= lastDayOfMonth.getDate(); i++) {
        // 해당 월의 날짜를 순회하며 배열에 추가
        const currDate = new Date(year, month, i); // 현재 날짜를 생성
        if (i > 0) {
            dates.push({ date: currDate, isInCurrentMonth: true }); // 현재 월에 속하는 날짜인 경우 배열에 추가
        } else {
            dates.push({ date: currDate, isInCurrentMonth: false }); // 이전 달 또는 다음 달에 속하는 날짜인 경우 배열에 추가
        }
    }

    // 이전 달로 이동하는 함수
    const goToPrevMonth = () => {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
    };
    // 다음 달로 이동하는 함수
    const goToNextMonth = () => {
        if (!(year === today.getFullYear() && month === today.getMonth())) {
            if (month === 11) {
                setYear(year + 1);
                setMonth(0);
            } else {
                setMonth(month + 1);
            }
        }
    };

    return (
        <PosRela>
            <div>
                {year}년 {month + 1}월
            </div>
            <div className={styles.main}>
                <div>
                    <div className={styles.navigation}>
                        <div className={styles.icon_container}>
                            <ArrowLeft01Icon
                                size={48}
                                color={"#000000"}
                                onClick={goToPrevMonth}
                            />
                        </div>

                        <div>{`${month + 1}월`}</div>
                        <div className={styles.icon_container}>
                            {!(
                                year === today.getFullYear() &&
                                month === today.getMonth()
                            ) ? (
                                <ArrowRight01Icon
                                    size={48}
                                    color={"#000000"}
                                    onClick={goToNextMonth}
                                />
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                    <div className={styles.week}>
                        <div className={styles.sunday}>일</div>
                        <div>월</div>
                        <div>화</div>
                        <div>수</div>
                        <div>목</div>
                        <div>금</div>
                        <div className={styles.saturday}>토</div>
                    </div>
                    <div className={styles.calendar}>
                        {/* 달력 영역 */}
                        {/* 날짜 요소 매핑 */}
                        {dates.map((d, index) => {
                            let className = styles.date;

                            // 특별한 날짜에 따라 클래스 추가
                            if (d.date.getDay() === 0)
                                className += " " + styles.sunday;
                            if (d.date.getDay() === 6)
                                className += " " + styles.saturday;

                            if (!d.isInCurrentMonth)
                                className += " " + styles.otherMonth;
                            if (d.date > today)
                                className += " " + styles.grayedOut;
                            if (
                                d.date.getFullYear() === today.getFullYear() &&
                                d.date.getMonth() === today.getMonth() &&
                                d.date.getDate() === today.getDate()
                            )
                                className += " " + styles.today;

                            return (
                                <div key={index} className={className}>
                                    <div className={styles.number}>
                                        {d.date.getDate()}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </PosRela>
    );
}
