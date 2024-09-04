import styled, { css, keyframes } from "styled-components";

// 그라데이션 애니메이션 정의
const gradient = keyframes`
  from {
    background-position-x: 0%;
  }
  to {
    background-position-x: 150%;
  }
`;

// 기본 텍스트 스타일을 위한 베이스 컴포넌트
const BaseButton = styled.button`
    user-select: none;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    margin: ${(props) => props.margin || "0.5rem 2.5rem"};
    padding: ${(props) => props.padding || "1rem 3.5rem"};
    border: none;
    font-size: 20px;
    letter-spacing: -0.05em;
    width: calc(100vw - 5rem);
    border-radius: 3rem;
    transition: 0.3s;
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
    &:hover {
        scale: 0.9;
    }
    &:active {
        scale: 1;
    }
`;

// ButtonWhite 컴포넌트
export const ButtonWhite = styled(BaseButton)`
    background-color: var(--grey1);
    box-shadow: 0 2px 25px 0 var(--shadow1);
`;

// ButtonAwesome 컴포넌트
export const ButtonAwesome = styled(BaseButton)`
    color: var(--white);
    background-image: var(--awesome);
    background-size: 300% 100%;
    background-position-x: 0%;
    animation: ${gradient} 2s linear infinite;
    box-shadow: 0 2px 25px 0 var(--shadow2);
`;
