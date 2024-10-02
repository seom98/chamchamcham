import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";

export const useInitialLoad = () => {
    const navigate = useNavigate();
    const [isInitialLoad, setIsInitialLoad] = useState(false);
    const db = getFirestore();
    const { userInfo, loading } = useGetUserInfo();

    // 첫 방문 여부를 확인하고 설정하는 효과
    useEffect(() => {
        const hasVisitedBefore = sessionStorage.getItem("hasVisitedMove");

        if (!hasVisitedBefore) {
            // 첫 방문인 경우, 세션 스토리지에 방문 기록을 저장하고 초기 로드 상태를 true로 설정
            sessionStorage.setItem("hasVisitedMove", "true");
            setIsInitialLoad(true);
        }
    }, []);

    // 사용자 데이터 초기화 및 라우트 프리로딩을 수행하는 효과
    useEffect(() => {
        // 초기 로드 상태가 아니거나 사용자 정보 로딩 중이면 실행하지 않음
        if (!isInitialLoad || loading) return;

        // 특정 연월의 날짜 수를 반환하는 함수
        const getDaysInMonth = (year, month) => {
            return new Date(year, month, 0).getDate();
        };
        const userRef = doc(db, "users", userInfo.uid);
        const monthlyRef = collection(userRef, "monthly");

        // 월별 문서 생성 함수
        const createMonthlyDoc = async (year, month) => {
            const daysInMonth = getDaysInMonth(year, month);
            await setDoc(
                doc(monthlyRef, `${year}-${month.toString().padStart(2, "0")}`),
                {
                    monthlySuccess: 0,
                    monthlyFailure: 0,
                    monthlySuccessList: Array(+daysInMonth + 1).fill(null),
                    monthlyconsumptionList: Array(+daysInMonth + 1).fill(null),
                }
            );
        };

        const initializeUserData = async () => {
            const userRef = doc(db, "users", userInfo.uid);
            const monthlyRef = collection(userRef, "monthly");

            // 현재 날짜 정보 가져오기
            const now = new Date();
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth() + 1;
            const currentDay = now.getDate();

            // 현재 월의 monthly 문서 확인 및 생성
            const monthlyDoc = await getDoc(
                doc(
                    monthlyRef,
                    `${currentYear}-${currentMonth.toString().padStart(2, "0")}`
                )
            );
            if (!monthlyDoc.exists()) {
                // 문서가 존재하지 않으면 새로 생성
                await createMonthlyDoc(currentYear, currentMonth);
            }

            // 1일인 경우 이전 월 문서도 확인 및 생성
            if (currentDay === 1) {
                const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
                const prevYear =
                    currentMonth === 1 ? currentYear - 1 : currentYear;
                const prevMonthDoc = await getDoc(
                    doc(
                        monthlyRef,
                        `${prevYear}-${prevMonth.toString().padStart(2, "0")}`
                    )
                );
                if (!prevMonthDoc.exists()) {
                    // 이전 월 문서가 존재하지 않으면 새로 생성
                    await createMonthlyDoc(prevYear, prevMonth);
                }
            }

            // daily 서브컬렉션 생성 (문서는 생성하지 않음)
            collection(
                doc(
                    monthlyRef,
                    `${currentYear}-${currentMonth.toString().padStart(2, "0")}`
                ),
                "daily"
            );
            // 주의: 여기서는 daily 컬렉션만 생성하고 문서는 생성하지 않습니다.
        };

        const preloadRoutes = async () => {
            // 사용자 데이터 초기화
            await initializeUserData();

            // 라우트 프리로딩
            const routes = ["/plan", "/calendar", "/setting"];

            for (const route of routes) {
                await navigateTo(route);
            }

            // 모든 프리로딩이 완료된 후 홈으로 이동
            navigate("/home");
            setIsInitialLoad(false);
        };

        // 각 라우트로 짧게 이동하는 함수
        const navigateTo = (path) => {
            return new Promise((resolve) => {
                navigate(path);
                setTimeout(resolve, 5); // 5ms 후에 다음 작업 수행
            });
        };

        // 프리로딩 실행
        preloadRoutes();
    }, [isInitialLoad, navigate, userInfo, db, loading]);
};
