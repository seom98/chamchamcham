import { useState, useEffect, useCallback, useMemo } from "react";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
} from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";

export function useCalendar() {
    const today = useMemo(() => new Date(), []);
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [monthlyData, setMonthlyData] = useState(null);
    const { userInfo } = useGetUserInfo();
    const db = getFirestore();

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

    // 날짜형식을 바꿔주는 함수
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // 특정 연월의 날짜 수를 반환하는 함수
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // 월별 문서 생성 함수
    const createMonthlyDoc = useCallback(
        async (year, month) => {
            if (!userInfo) return;

            const daysInMonth = getDaysInMonth(year, month);
            const userRef = doc(db, "users", userInfo.uid);
            const monthlyRef = collection(userRef, "monthly");

            const formattedMonth = (month + 1).toString().padStart(2, "0");
            await setDoc(doc(monthlyRef, `${year}-${formattedMonth}`), {
                monthlySuccess: 0,
                monthlyFailure: 0,
                monthlySuccessList: Array(daysInMonth + 1).fill(null),
                monthlyconsumptionList: Array(daysInMonth + 1).fill(null),
            });
        },
        [db, userInfo]
    );

    // 해당 월의 monthly 문서를 가져오는 함수
    const fetchMonthlyData = useCallback(async () => {
        if (!userInfo) return;

        const formattedMonth = (month + 1).toString().padStart(2, "0");
        const monthlyRef = doc(
            db,
            "users",
            userInfo.uid,
            "monthly",
            `${year}-${formattedMonth}`
        );
        const monthlyDoc = await getDoc(monthlyRef);

        if (monthlyDoc.exists()) {
            setMonthlyData(monthlyDoc.data());
        } else {
            await createMonthlyDoc(year, month);
            const newMonthlyDoc = await getDoc(monthlyRef);
            setMonthlyData(newMonthlyDoc.data());
        }
    }, [db, userInfo, year, month, createMonthlyDoc]);

    // 년도나 월이 변경될 때마다 monthly 문서를 가져옴
    useEffect(() => {
        fetchMonthlyData();
    }, [fetchMonthlyData]);

    // 전 달로 가는 함수
    const goToPrevMonth = useCallback(() => {
        if (month === 0 && year === 2024) {
            alert("2024년 이전의 기록은 작성할수 없어요ㅠㅠ 죄송함미다..");
        } else if (month === 0) {
            setMonthlyData(null);
            setYear((prev) => prev - 1);
            setMonth(11);
        } else {
            setMonthlyData(null);
            setMonth((prev) => prev - 1);
        }
    }, [month, year]);

    // 다음 달로 가는 함수
    const goToNextMonth = useCallback(() => {
        if (!(year === today.getFullYear() && month === today.getMonth())) {
            if (month === 11) {
                setMonthlyData(null);
                setYear((prev) => prev + 1);
                setMonth(0);
            } else {
                setMonthlyData(null);
                setMonth((prev) => prev + 1);
            }
        }
    }, [month, year, today]);

    return {
        year,
        month,
        dates: getDates(),
        goToPrevMonth,
        goToNextMonth,
        formatDate,
        today,
        monthlyData,
    };
}
