import styled from "styled-components";

export const Box1 = styled.div`
    background-color: var(--grey1);
    border-radius: 2rem;
    width: 100%;
    padding: 1rem;
    box-shadow: 0 2px 40px 0 var(--shadow1);
    position: relative;
`;

export const Box2 = styled.div`
    margin: ${(props) => props.$margin || "1rem"};
    background-color: ${(props) => props.$Bg || "var(--grey3)"};
    border-radius: 1rem;
    padding: 1rem;
    width: ${(props) => props.$width || "calc(100% - 2rem)"};
    position: relative;
`;

export const BackBox = styled.div`
    background: var(--bottom);
    width: 100%;
    height: ${(props) => props.$height || "5.5rem"};
`;
