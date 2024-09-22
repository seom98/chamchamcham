import React, { useMemo } from "react";
import styled from "styled-components";
import { SquareLockPasswordIcon } from "hugeicons-react";
import { usePress } from "../../../hooks/usePress";

// 기본 인풋 스타일
const BaseInput = styled.input`
    background-color: var(--grey1);
    border: solid 1px var(--grey5);
    font-size: 1rem;
    margin: 0.5rem 2.5rem;
    padding: 1rem 3rem;
    border-radius: 0.5rem;
    letter-spacing: -0.05em;
    color: var(--grey8);
    cursor: pointer;
    outline: none;
    box-shadow: 0 2px 25px 0 var(--shadow1);
    width: calc(100% - 5rem);
    transition: transform 0.2s ease-in-out;

    &:focus {
        border: solid 1px var(--grey8);
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

const AbsoluteLightDiv = styled.div`
    position: absolute;
    top: 1.35rem;
    height: 0;
    right: 3.5rem;
    display: flex;
    gap: 0.5rem;
`;

const pressedStyle = { transform: "scale(0.97)" };
const normalStyle = { transform: "scale(1)" };

export const IptNor = React.memo(({ children, ...props }) => {
    const { isPressed, handleTouchStart, handleTouchEnd, handleTouchCancel } =
        usePress();

    const touchHandlers = useMemo(
        () => ({
            onTouchStart: handleTouchStart,
            onTouchEnd: handleTouchEnd,
            onTouchCancel: handleTouchCancel,
        }),
        [handleTouchStart, handleTouchEnd, handleTouchCancel]
    );

    return (
        <BaseDiv>
            <BaseInput
                {...touchHandlers}
                style={isPressed ? pressedStyle : normalStyle}
                {...props}
            />
            <AbsoluteDiv>{children}</AbsoluteDiv>
        </BaseDiv>
    );
});

export const IptPas = React.memo(({ children, onChange, value, ...props }) => {
    const { isPressed, handleTouchStart, handleTouchEnd, handleTouchCancel } =
        usePress();

    const touchHandlers = useMemo(
        () => ({
            onTouchStart: handleTouchStart,
            onTouchEnd: handleTouchEnd,
            onTouchCancel: handleTouchCancel,
        }),
        [handleTouchStart, handleTouchEnd, handleTouchCancel]
    );

    const iconColor = value ? "var(--grey8)" : "var(--grey5)";

    return (
        <BaseDiv>
            <BaseInput
                {...touchHandlers}
                value={value}
                onChange={onChange}
                style={isPressed ? pressedStyle : normalStyle}
                {...props}
            />
            <AbsoluteDiv>
                <SquareLockPasswordIcon size={24} color={iconColor} />
            </AbsoluteDiv>
            <AbsoluteLightDiv>{children}</AbsoluteLightDiv>
        </BaseDiv>
    );
});
