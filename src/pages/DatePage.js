import React, { useState } from "react";
import { useParams } from "react-router";
import {} from "../components/ui/atoms/CustomPosition";
import { Text12, Text16, Text30 } from "../components/ui/atoms/CustomText";
import HeaderOfDate from "../components/ui/organisms/HeaderOfDate";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import LoadingPopup from "../components/ui/organisms/LoadingPopup";
import styled from "styled-components";
import { Content, Flex, FlexB } from "../components/ui/atoms/CustomDisplay";
import { Box1 } from "../components/ui/atoms/CustomBox";
import { ArrowLeft01Icon } from "hugeicons-react";

const OverflowHidden = styled.div`
    overflow: hidden;
    width: 100vw;
    height: 25rem;
`;

const SliderContainer = styled.div`
    display: flex;
    width: 300vw; /* 100% * 3 슬라이드 */
    height: 100%;
    transition: transform 0.3s ease-in-out;
    transform: translateX(${(props) => props.$transX}vw);
`;

const Slide = styled.div`
    flex: 0 0 100vw; /* 각 슬라이드는 100vw 폭을 가짐 */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 1.5rem;
`;

const Button = styled.button`
    padding: 1rem 2rem;
    font-size: 1rem;
    cursor: pointer;
`;

const Input = styled.input`
    padding: 0.5rem;
    font-size: 1.5rem;
    margin-right: 1rem;
`;

export default function DatePage() {
    const { date } = useParams();
    const { userInfo, loading } = useGetUserInfo();
    const [, month, day] = date.split("-").map((e) => +e);

    const [translateX, setTranslateX] = useState(-100); // 처음에 2번 슬라이드를 보여줌
    const [x, setX] = useState(-100); // 처음에 2번 슬라이드를 보여줌
    const [startX, setStartX] = useState(0);
    const [endX, setEndX] = useState(0); // 드래그 종료 시점의 X 좌표

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        const deltaX = endX - startX;
        const threshold = window.innerWidth * 0.05;
        if (deltaX > threshold && translateX < 0) {
            setTranslateX(x + 100);
            setX(translateX + 100);
        } else if (deltaX < -threshold && translateX > -200) {
            setTranslateX(x - 100);
            setX(translateX - 100);
        }
    };

    const handleTouchMove = (e) => {
        setEndX(e.touches[0].clientX);
    };

    return (
        <>
            {loading ? (
                <LoadingPopup>정보를 불러오는 중..</LoadingPopup>
            ) : (
                <>
                    <HeaderOfDate day={day} month={month} />
                    <Content>
                        <Text12 $light>
                            {month}월 {day}일에 아낀돈
                        </Text12>
                        <Flex $align={"baseline"} $gap={"0.3rem"}>
                            <Text30 $awesome $margin={"0 0 1rem"}>
                                23
                            </Text30>
                            <Text16> 원</Text16>
                        </Flex>
                    </Content>
                    <OverflowHidden>
                        <SliderContainer
                            $transX={translateX}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd} // 터치 종료 시 호출
                        >
                            {/* 1번 슬라이드: 버튼만 있음 */}
                            <Slide style={{ backgroundColor: "lightcoral" }}>
                                <Button>1번 슬라이드 버튼</Button>
                            </Slide>

                            {/* 2번 슬라이드: 드래그하라는 문구 */}
                            <Slide>
                                <Box1 $margin="0.5rem 1rem">
                                    <Text16 $light>
                                        {userInfo.itemList[0]}
                                    </Text16>
                                    <Text30>
                                        {userInfo.moneyList[0]} 원? 0원?
                                    </Text30>
                                    <FlexB>
                                        <ArrowLeft01Icon />
                                    </FlexB>
                                </Box1>
                            </Slide>

                            {/* 3번 슬라이드: 숫자 입력 및 버튼 */}
                            <Slide style={{ backgroundColor: "lightgreen" }}>
                                <Input
                                    type="number"
                                    placeholder="숫자를 입력하세요"
                                />
                                <Button>3번 슬라이드 버튼</Button>
                            </Slide>
                        </SliderContainer>
                    </OverflowHidden>
                </>
            )}
        </>
    );
}
