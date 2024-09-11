import styled, { css, keyframes } from "styled-components";
import { usePress } from "../../../hooks/usePress"; // 버튼을 누르고 있는지 확인하는 커스텀 훅

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
const BtnWhiStyled = styled(BaseButton)`
    box-shadow: 0 2px 25px 0 var(--shadow1);
    background-color: var(--grey1);
    color: var(--grey8);
`;

// 어썸 버튼 스타일
const BtnAweStyled = styled(BaseButton)`
    background-color: transparent;
    background-image: var(--awesome);
    background-size: 300% 100%;
    animation: ${gradient} 1500ms linear infinite;
    color: var(--white);
    box-shadow: 0 2px 25px 0 var(--shadow2);
`;

const BtnNorStyled = styled.div`
    /* 드래그 금지 */
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent; // 버튼클릭시 하이라이트 제거!!!
    border-radius: 1rem;
    transition: 0.2s;
    padding: 1rem;
`;

// 화이트 버튼 컴포넌트
export const BtnWhi = ({ children, ...props }) => {
    const { isPressed, handleTouchStart, handleTouchEnd, handleTouchCancel } =
        usePress();

    return (
        <BtnWhiStyled
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
            style={{
                backgroundColor: isPressed && "var(--grey3)",
                boxShadow: isPressed && "0 2px 25px 0 var(--grey4)",
                transform: isPressed && "scale(0.97)",
            }}
            {...props}
        >
            {children}
        </BtnWhiStyled>
    );
};

// 어썸 버튼 컴포넌트
export const BtnAwe = ({ children, ...props }) => {
    const { isPressed, handleTouchStart, handleTouchEnd, handleTouchCancel } =
        usePress();

    return (
        <BtnAweStyled
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
        </BtnAweStyled>
    );
};
// 노멀 버튼 컴포넌트
export const BtnNor = ({ children, ...props }) => {
    const { isPressed, handleTouchStart, handleTouchEnd, handleTouchCancel } =
        usePress();

    return (
        <BtnNorStyled
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
            style={{
                backgroundColor: isPressed && "var(--grey2)",
                transform: isPressed && "scale(0.97)",
            }}
            {...props}
        >
            {children}
        </BtnNorStyled>
    );
};
