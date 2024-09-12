import styled from "styled-components";
import {
    AppleReminderIcon,
    Calendar03Icon,
    ChartBarLineIcon,
    Home02Icon,
    Menu01Icon,
} from "hugeicons-react";
import { Flex, PosEC, PosSti, PosRela } from "../molecules/CustomPosition";
import { Text12 } from "../atoms/CustomText";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePress } from "../../../hooks/usePress";

const SelectBox = styled.div`
    background-color: var(--grey3);
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
    transform: translateY(-0.4rem) translateX(${(props) => props.translate});
`;
const BackBox = styled.div`
    background: var(--bottom);
    width: 100%;
    height: 5.5rem;
`;

const IconBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 0.5rem;
`;

// 클릭했을때 크기가 바뀌도록
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

// 네비게이션 컴포넌트
const Nav = React.memo(() => {
    const location = useLocation();
    const [tap, setTap] = useState(0);
    const navigate = useNavigate();

    const taps = ["-8.75rem", "-4.4rem", "0", "4.4rem", "8.75rem"];

    // 현재 경로에 따라 tap 상태를 업데이트
    useEffect(() => {
        const pathMap = {
            "/home": 0,
            "/plan": 1,
            "/stat": 2,
            "/calendar": 3,
            "/setting": 4,
        };
        setTap(pathMap[location.pathname] || 0);
    }, [location.pathname]);

    return (
        <PosSti>
            <PosEC $bottom="4.5rem">
                <PosRela $height="1rem" $zIndex="5">
                    <BackBox></BackBox>
                </PosRela>
                <PosRela $height="0" $zIndex="6">
                    <Flex>
                        <SelectBox translate={taps[tap]} />
                    </Flex>
                </PosRela>
                <PosRela $height="0rem" $zIndex="7">
                    <Flex $gap="2.5rem">
                        <NavButton
                            onClick={() => {
                                setTap(0);
                                navigate("/home");
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
                            <AppleReminderIcon
                                size={30}
                                color={"var(--grey8)"}
                            />
                            <Text12 $light>목표</Text12>
                        </NavButton>
                        <NavButton
                            onClick={() => {
                                alert("서비스준비중입니다.");
                            }}
                        >
                            <ChartBarLineIcon
                                size={30}
                                color={"var(--grey8)"}
                            />
                            <Text12 $light>통계</Text12>
                        </NavButton>
                        <NavButton
                            onClick={() => {
                                setTap(3);
                                navigate("/calendar");
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
                </PosRela>
            </PosEC>
        </PosSti>
    );
});

export default Nav;
