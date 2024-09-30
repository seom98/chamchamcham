import { useState } from "react";

// 캘린더에서 쓰는 커스텀 훅
export function useCalendar() {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // 월간 날짜들을 구하는 함수
    const getDates = () => {
        const dates = [];
        const firstDayOfWeek = firstDayOfMonth.getDay();

        for (let i = 1 - firstDayOfWeek; i <= lastDayOfMonth.getDate(); i++) {
            const currDate = new Date(year, month, i);
            if (i > 0) {
                dates.push({ date: currDate, isInCurrentMonth: true });
            } else {
                dates.push({ date: currDate, isInCurrentMonth: false });
            }
        }
        return dates;
    };

    // 전 달로 가는 함수
    const goToPrevMonth = () => {
        if (month === 0 && year === 2024) {
            alert("2024년 이전의 기록은 작성할수 없어요ㅠㅠ 죄송함미다..");
        } else if (month === 0) {
            setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
    };

    // 다음 달로 가는 함수
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

    // 날짜형식을 바꿔주는 함수
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return {
        year,
        month,
        dates: getDates(),
        goToPrevMonth,
        goToNextMonth,
        formatDate,
        today,
    };
}
