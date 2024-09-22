import React from "react";
import { useState } from "react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import { PositionRelative } from "../components/ui/molecules/CustomPosition";
import {
    Text12,
    Text16,
    Text20,
    Text30,
} from "../components/ui/atoms/CustomText";
import { BtnDate } from "../components/ui/atoms/CustomButton";
import Loading from "../components/ui/organisms/Loading";
import UserHeader from "../components/ui/organisms/UserHeader";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { Cycle } from "../components/pages/Calendar/CalendarStyles";
import { useNavigate } from "react-router-dom";
import {
    CalendarFrame,
    Content,
    Flex,
    FlexA,
} from "../components/ui/molecules/CustomDisplay";

export default function CalendarPage() {
    const navigate = useNavigate();
    // 현재 날짜 가져오기 및 상태 설정
    const { userInfo, loading } = useGetUserInfo();
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
        if (month === 0 && year === 2024) {
            alert("2024년 이전의 기록은 작성할수 없어요ㅠㅠ 죄송함미다..");
        } else if (month === 0) {
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

    // 주소반환
    function formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    return (
        <PositionRelative>
            {loading ? (
                <Loading>정보를 불러오는 중..</Loading>
            ) : (
                <>
                    <UserHeader userInfo={userInfo} />
                    <Content $padding={"4rem 1.5rem 10rem"}>
                        <Flex $align={"baseline"} $gap={"0.3rem"}>
                            <Text16>{month + 1}월 동안 </Text16>
                            <Text30 $awesome $margin={"0 0 1rem"}>
                                1,325,000
                            </Text30>
                            <Text16> 원 절약</Text16>
                        </Flex>
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
                                                        d.date.getDate() >
                                                            today.getDate()
                                                    ) &&
                                                    d.isInCurrentMonth
                                                ) {
                                                    navigate(
                                                        `${formatDate(d.date)}`
                                                    );
                                                }
                                            }}
                                            $today={
                                                d.date.getFullYear() ===
                                                    today.getFullYear() &&
                                                d.date.getMonth() ===
                                                    today.getMonth() &&
                                                d.date.getDate() ===
                                                    today.getDate()
                                            }
                                            $null={!d.isInCurrentMonth}
                                            $after={
                                                d.date.getMonth() ===
                                                    today.getMonth() &&
                                                d.date.getDate() >
                                                    today.getDate()
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
                        <Flex $gap={"3rem"}>
                            <Flex $gap={"1rem"}>
                                <Cycle $blue />
                                <Text12 $light>성공</Text12>
                            </Flex>
                            <Flex $gap={"1rem"}>
                                <Cycle $yellow />
                                <Text12 $light>부분성공</Text12>
                            </Flex>
                            <Flex $gap={"1rem"}>
                                <Cycle $red />
                                <Text12 $light>실패</Text12>
                            </Flex>
                        </Flex>
                    </Content>
                </>
            )}
        </PositionRelative>
    );
}
