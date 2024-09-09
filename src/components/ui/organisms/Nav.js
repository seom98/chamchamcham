import styled from "styled-components";
import {
    AppleReminderIcon,
    Calendar03Icon,
    ChartBarLineIcon,
    Home02Icon,
    Menu01Icon,
} from "hugeicons-react";
import { Flex, PositionEnd, Relative } from "../molecules/CustomPosition";
import { Text12 } from "../atoms/CustomText";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePress } from "../../../hooks/usePress";

const SelectBox = styled.div`
    background-color: var(--grey3);
    width: 4rem;
    height: 4rem;
    transition: transform 0.3s ease-in-out;
    border-radius: 1rem;
    transform: translateY(-0.4rem) translateX(${(props) => props.translate});
`;

const IconBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 0.5rem;
    transition: 0.3s ease-in-out;
    /* 드래그 금지 */
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent; // 버튼클릭시 하이라이트 제거!!!
`;

const NavButton = ({ children, ...props }) => {
    const { isPressed, handleTouchStart, handleTouchEnd, handleTouchCancel } =
        usePress();

    return (
        <IconBox
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
            style={{
                transform: isPressed && "scale(0.9)",
            }}
            {...props}
        >
            {children}
        </IconBox>
    );
};

const Nav = React.memo(() => {
    const location = useLocation();
    const [tap, setTap] = useState(0);
    const navigate = useNavigate();

    const taps = ["-8.75rem", "-4.4rem", "0", "4.4rem", "8.75rem"];

    // 현재 경로에 따라 tap 상태를 업데이트
    useEffect(() => {
        const pathMap = {
            "/move": 0,
            "/plan": 1,
            "/stat": 2,
            "/diary": 3,
            "/setting": 4,
        };
        setTap(pathMap[location.pathname] || 0);
    }, [location.pathname]);

    return (
        <Relative $height={"0"}>
            <PositionEnd>
                <Relative $height="0" $zIndex="-1">
                    <Flex>
                        <SelectBox translate={taps[tap]} />
                    </Flex>
                </Relative>
                <Flex $gap="2.5rem">
                    <NavButton
                        onClick={() => {
                            setTap(0);
                            navigate("/move");
                        }}
                    >
                        <Home02Icon size={30} color={"var(--grey8)"} />
                        <Text12 $light>홈</Text12>
                    </NavButton>
                    <NavButton
                        onClick={() => {
                            setTap(1);
                            navigate("/plan");
                        }}
                    >
                        <AppleReminderIcon size={30} color={"var(--grey8)"} />
                        <Text12 $light>목표</Text12>
                    </NavButton>
                    <NavButton
                        onClick={() => {
                            alert("서비스준비중입니다.");
                        }}
                    >
                        <ChartBarLineIcon size={30} color={"var(--grey8)"} />
                        <Text12 $light>통계</Text12>
                    </NavButton>
                    <NavButton
                        onClick={() => {
                            setTap(3);
                            navigate("/diary");
                        }}
                    >
                        <Calendar03Icon size={30} color={"var(--grey8)"} />
                        <Text12 $light>달력</Text12>
                    </NavButton>
                    <NavButton
                        onClick={() => {
                            setTap(4);
                            navigate("/setting");
                        }}
                    >
                        <Menu01Icon size={30} color={"var(--grey8)"} />
                        <Text12 $light>전체</Text12>
                    </NavButton>
                </Flex>
            </PositionEnd>
        </Relative>
    );
});

export default Nav;
