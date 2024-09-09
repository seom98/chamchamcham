import styled from "styled-components";

const BasePosition = styled.div`
    position: absolute;
`;

// PositionEnd 컴포넌트
export const PositionEnd = styled(BasePosition)`
    bottom: ${(props) => props.$bottom || "2.5rem"};
    left: 0;
    right: 0;
`;
// PositionStart 컴포넌트
export const PositionStart = styled(BasePosition)`
    top: ${(props) => props.$top || "1rem"};
`;

export const Relative = styled.div`
    position: relative;
    height: ${(props) => props.$height || "100vh"};
    z-index: ${(props) => props.$zIndex || "0"};
`;

export const Flex = styled.div`
    gap: ${(props) => props.$gap || "0"};
    display: flex;
    justify-content: center;
`;
export const FlexAround = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0 1.5rem;
`;
export const FlexEnd = styled.div`
    width: calc(100% - 5rem);
    display: flex;
    justify-content: flex-end;
`;
export const FlexCenter = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
