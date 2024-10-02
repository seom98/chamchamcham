import React, { useState } from "react";
import { useParams } from "react-router";
import {} from "../components/ui/atoms/CustomPosition";
import {
    Text12,
    Text16,
    Text20,
    Text30,
} from "../components/ui/atoms/CustomText";
import HeaderOfDate from "../components/ui/organisms/HeaderOfDate";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import LoadingPopup from "../components/ui/organisms/LoadingPopup";
import styled from "styled-components";
import {
    Content,
    Flex,
    FlexA,
    FlexC,
} from "../components/ui/atoms/CustomDisplay";
import { Box1 } from "../components/ui/atoms/CustomBox";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import { BtnWhi } from "../components/ui/atoms/CustomButton";

const OverflowHidden = styled.div`
    overflow: hidden;
    width: 100vw;
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
const Slide1 = styled.div`
    flex: 0 0 90vw; /* 각 슬라이드는 100vw 폭을 가짐 */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 1.5rem;
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

    const [translateX, setTranslateX] = useState(-90); // 처음에 2번 슬라이드를 보여줌
    const [x, setX] = useState(-90); // 처음에 2번 슬라이드를 보여줌
    const [startX, setStartX] = useState(0);
    const [endX, setEndX] = useState(0); // 드래그 종료 시점의 X 좌표

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        const deltaX = endX - startX;
        const threshold = window.innerWidth * 0.05;
        if (deltaX > threshold && translateX < 0) {
            setTranslateX(x + 90);
            setX(translateX + 90);
        } else if (deltaX < -threshold && translateX > -180) {
            setTranslateX(x - 90);
            setX(translateX - 90);
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
                    <Content $padding={"5rem 0 0rem"}>
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
                            <Slide1>
                                <FlexC>
                                    <Text16>
                                        와아아!! 가만히 있었을 뿐인데
                                    </Text16>
                                    <Text30 $margin="1rem">398400원</Text30>
                                    <Text16>이 생겼습니다.!!</Text16>
                                    <BtnWhi $blue>축하드려요~! 완료</BtnWhi>
                                </FlexC>
                            </Slide1>

                            {/* 2번 슬라이드: 드래그하라는 문구 */}
                            <Slide>
                                <Box1 $margin="3rem 1rem">
                                    <Text20 $light $margin={"2rem 0 1rem"}>
                                        {userInfo.itemList[0]}
                                    </Text20>
                                    <Text30 $margin={"0 0 2rem"}>
                                        {userInfo.moneyList[0]} 원? 0원?
                                    </Text30>
                                    <FlexA>
                                        <div>
                                            <ArrowLeft01Icon
                                                size={60}
                                                color={"var(--red)"}
                                            />
                                            <Text20 $red $light>
                                                1원 이상
                                            </Text20>
                                        </div>
                                        <div>
                                            <ArrowRight01Icon
                                                size={60}
                                                color={"var(--blue)"}
                                            />
                                            <Text20 $blue $light>
                                                0원
                                            </Text20>
                                        </div>
                                    </FlexA>
                                    <Text12 $light $margin={"2rem 0 0"}>
                                        참기 성공했다면 오른쪽으로 스와이프,
                                    </Text12>
                                    <Text12 $light $margin={"0 0 2rem"}>
                                        실패했다면 왼쪽으로 스와이프해주세요.
                                    </Text12>
                                </Box1>
                            </Slide>

                            {/* 3번 슬라이드: 숫자 입력 및 버튼 */}
                            <Slide1>
                                <FlexC>
                                    <Text16>{userInfo.itemList[0]}에</Text16>
                                    <Text16>얼마나 쓰셨어요..?</Text16>
                                    <Input
                                        type="number"
                                        placeholder="숫자를 입력하세요"
                                    />
                                    <BtnWhi $red>
                                        그래도 7000원 아꼈어요..! 완료
                                    </BtnWhi>
                                </FlexC>
                            </Slide1>
                        </SliderContainer>
                    </OverflowHidden>
                </>
            )}
        </>
    );
}
