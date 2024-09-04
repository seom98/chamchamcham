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

// 공통 스타일
const commonStyles = css`
    /* 드래그 금지 */
    user-select: none;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */

    margin: ${(props) => props.margin || "0"};
    color: var(--grey8);
    letter-spacing: -0.05em;
    font-weight: 400;

    ${(props) =>
        props.center &&
        css`
            text-align: center;
        `};
    ${(props) =>
        props.grey &&
        css`
            color: var(--grey5);
        `};
    ${(props) =>
        props.red &&
        css`
            color: var(--red);
        `};
    ${(props) =>
        props.blue &&
        css`
            color: var(--blue);
        `};
    ${(props) =>
        props.awesome &&
        css`
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            background-image: linear-gradient(
                80deg,
                var(--grey8) 0%,
                var(--grey7) 33%,
                var(--grey6) 50%,
                var(--grey7) 66%,
                var(--grey8) 100%
            );
            background-size: 300% 100%;
            background-position-x: 0%;
            animation: ${gradient} 2s linear infinite;
        `};

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
`;

// 기본 텍스트 스타일을 위한 베이스 컴포넌트
const BaseText = styled.div`
    ${commonStyles}
`;

// Text12 컴포넌트
export const Text12 = styled(BaseText)`
    font-size: 12px;
`;

// Text16 컴포넌트
export const Text16 = styled(BaseText)`
    font-size: 16px;
`;
// Text20 컴포넌트
export const Text20 = styled(BaseText)`
    font-size: 20px;
`;
// Text25 컴포넌트
export const Text25 = styled(BaseText)`
    font-size: 25px;
`;
// Text30 컴포넌트
export const Text30 = styled(BaseText)`
    font-size: 30px;
`;
// Text36 컴포넌트
export const Text36 = styled(BaseText)`
    font-size: 36px;
`;
