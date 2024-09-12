import styled from "styled-components";
import { SquareLockPasswordIcon } from "hugeicons-react";
import { usePress } from "../../../hooks/usePress"; // 버튼을 누르고 있는지 확인하는 커스텀 훅

// 기본 인풋 스타일
const BaseInput = styled.input`
    background-color: var(--grey3);
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
    width: ${(props) => props.$width || "calc(100% - 5rem)"};

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
export const IptNor = ({ children, ...props }) => {
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
export const IptPas = ({ children, onChange, value, ...props }) => {
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
                />
            </AbsoluteDiv>
            <AbsoluteLigthDiv>{children}</AbsoluteLigthDiv>
        </BaseDiv>
    );
};
