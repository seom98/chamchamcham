import styled, { css, keyframes } from "styled-components";

const gradient = keyframes`
  0% { background-position-x: 0%; }
  100% { background-position-x: 150%; }
`;

const BaseText = styled.div`
    margin: ${(props) => props.$margin || "0"};
    height: ${(props) => props.$height || "auto"};
    color: var(--grey8);
    letter-spacing: -0.05em;
    font-weight: ${(props) => (props.$bold ? 700 : props.$light ? 300 : 400)};
    text-align: center;

    ${(props) => props.$grey && `color: var(--grey5);`}
    ${(props) => props.$red && `color: var(--red);`}
  ${(props) => props.$blue && `color: var(--blue);`}

  ${(props) =>
        props.$awesome &&
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
        `}
`;

const createTextComponent = (size) => styled(BaseText)`
    font-size: ${size}px;
`;

export const Text12 = createTextComponent(12);
export const Text16 = createTextComponent(16);
export const Text20 = createTextComponent(20);
export const Text25 = createTextComponent(25);
export const Text30 = createTextComponent(30);
export const Text36 = createTextComponent(36);
