import styled, { css } from "styled-components";

//
export const Cycle = styled.div`
    height: 1rem;
    width: 1rem;
    border-radius: 0.5rem;
    ${(props) =>
        props.$blue &&
        css`
            background-color: var(--skyblue);
            box-shadow: 0 2px 25px 0 var(--shadow1);
        `};
    ${(props) =>
        props.$yellow &&
        css`
            background-color: var(--yellow);
            box-shadow: 0 2px 25px 0 var(--shadow1);
        `};
    ${(props) =>
        props.$red &&
        css`
            background-color: var(--pink);
            box-shadow: 0 2px 25px 0 var(--shadow1);
        `};
`;
