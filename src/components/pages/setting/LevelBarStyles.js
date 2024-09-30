import styled from "styled-components";

export const LevelWrapper = styled.div`
    margin-top: 1rem;
    width: 100%;
    height: 30px;
    background-color: var(--grey3);
    border-radius: 15px;
    padding: 3px;
    position: relative;
`;
export const LevelBar = styled.div`
    width: ${(props) => props.$width || "24px"};
    min-width: 24px;
    max-width: 100%;
    height: 24px;
    background-color: var(--grey1);
    border-radius: 12px;
    padding: 3px;
`;
export const Level = styled.div`
    position: absolute;
    right: 1rem;
    top: 7px;
`;
