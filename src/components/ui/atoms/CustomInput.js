import styled from "styled-components";
import React, { useState } from "react";
import { SquareLockPasswordIcon } from "hugeicons-react";

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

// 기본 인풋 스타일
const BaseInput = styled.input`
    background-color: var(--grey3);
    border: solid 1px var(--grey5);
    font-size: 1rem;
    margin: 0.5rem 2.5rem;
    padding: 1rem 3rem;
    border-radius: 0.5rem;
    letter-spacing: -0.05em;
    transition: ease-in-out 0.2s;
    color: var(--grey8);
    cursor: pointer;
    outline: none;
    box-shadow: 0 2px 25px 0 var(--shadow1);
    width: calc(100% - 5rem);

    &:focus {
        border: solid 1px var(--grey8);
        background-color: var(--grey1);
    }
    &::placeholder {
        color: var(--grey5);
    }
`;

const BaseDiv = styled.div`
    position: relative;
    width: 100%;
`;

const AbsoluteDiv = styled.div`
    position: absolute;
    top: 1.35rem;
    left: 3.5rem;
    width: calc(100% - 7rem);
    height: 0;
    display: flex;
    justify-content: space-between;
`;
const AbsoluteLigthDiv = styled.div`
    position: absolute;
    top: 1.35rem;
    height: 0;
    right: 3.5rem;
    display: flex;
    gap: 0.5rem;
`;

// 화이트 버튼 컴포넌트
export const InputNormal = ({ children, ...props }) => {
    const { isPressed, handleTouchStart, handleTouchEnd, handleTouchCancel } =
        usePress();

    return (
        <BaseDiv>
            <BaseInput
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchCancel}
                style={{
                    transform: isPressed ? "scale(0.97)" : "scale(1)",
                }}
                {...props}
            />
            <AbsoluteDiv>{children}</AbsoluteDiv>
        </BaseDiv>
    );
};
// 화이트 버튼 컴포넌트
export const InputPassword = ({ children, onChange, value, ...props }) => {
    const { isPressed, handleTouchStart, handleTouchEnd, handleTouchCancel } =
        usePress();
    return (
        <BaseDiv>
            <BaseInput
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchCancel}
                value={value}
                onChange={onChange} // onChange 이벤트로 글자 입력 감지
                style={{
                    transform: isPressed ? "scale(0.97)" : "scale(1)",
                }}
                {...props}
            />
            <AbsoluteDiv>
                <SquareLockPasswordIcon
                    size={24}
                    color={value ? "var(--grey8)" : "var(--grey5)"}
                    variant={"stroke"}
                    style={{ transition: "0.2s" }}
                />
            </AbsoluteDiv>
            <AbsoluteLigthDiv>{children}</AbsoluteLigthDiv>
        </BaseDiv>
    );
};
