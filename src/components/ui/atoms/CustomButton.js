import styled, { css, keyframes } from "styled-components";
import React, { useState } from "react";

// 터치 효과를 위한 커스텀 훅 usePress
const usePress = () => {
    const [isPressed, setIsPressed] = useState(false);

    const handleTouchStart = () => {
        setIsPressed(true);
    };

    const handleTouchEnd = () => {
        setIsPressed(false);
    };

    const handleTouchCancel = () => {
        setIsPressed(false);
    };

    return {
        isPressed,
        handleTouchStart,
        handleTouchEnd,
        handleTouchCancel,
    };
};

// 그라데이션 애니메이션 정의
const gradient = keyframes`
  from {
    background-position-x: 0%;
  }
  to {
    background-position-x: 150%;
  }
`;

// 기본 버튼 스타일
const BaseButton = styled.button`
    /* 드래그 금지 */
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent; // 버튼클릭시 하이라이트 제거!!!

    margin: ${(props) => props.$margin || "0.5rem 2.5rem"};
    padding: 1rem 3.5rem;
    font-size: 20px;
    letter-spacing: -0.05em;
    border-radius: 3rem;
    transition: 0.2s;
    border: none;
    outline: none;
    width: calc(100% - 5rem);
    ${(props) =>
        props.bold &&
        css`
            font-weight: 700;
        `};
    ${(props) =>
        props.light &&
        css`
            font-weight: 300;
        `};
    &:active {
        outline: none;
    }
    &:focus {
        outline: none;
    }
`;

// 화이트 버튼 스타일
const ButtonWhiteStyled = styled(BaseButton)`
    box-shadow: 0 2px 25px 0 var(--shadow1);
    background-color: var(--grey1);
    color: var(--grey8);
`;

// 어썸 버튼 스타일
const ButtonAwesomeStyled = styled(BaseButton)`
    background-color: transparent;
    background-image: var(--awesome);
    background-size: 300% 100%;
    animation: ${gradient} 1500ms linear infinite;
    color: var(--white);
    box-shadow: 0 2px 25px 0 var(--shadow2);
`;

// 화이트 버튼 컴포넌트
export const ButtonWhite = ({ children, ...props }) => {
    const { isPressed, handleTouchStart, handleTouchEnd, handleTouchCancel } =
        usePress();

    return (
        <ButtonWhiteStyled
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
            style={{
                backgroundColor: isPressed && "var(--grey4)",
                boxShadow: isPressed && "0 2px 25px 0 var(--grey4)",
                transform: isPressed && "scale(0.97)",
            }}
            {...props}
        >
            {children}
        </ButtonWhiteStyled>
    );
};

// 어썸 버튼 컴포넌트
export const ButtonAwesome = ({ children, ...props }) => {
    const { isPressed, handleTouchStart, handleTouchEnd, handleTouchCancel } =
        usePress();

    return (
        <ButtonAwesomeStyled
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
            style={{
                backgroundImage: isPressed && "var(--awesome2)",
                boxShadow: isPressed && "0 2px 25px 0 var(--grey4)",
                transform: isPressed && "scale(0.97)",
            }}
            {...props}
        >
            {children}
        </ButtonAwesomeStyled>
    );
};
