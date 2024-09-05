import styled from "styled-components";

const BasePosition = styled.div`
    position: absolute;
`;

// PositionEnd 컴포넌트
export const PositionEnd = styled(BasePosition)`
    bottom: 2.5rem;
`;
// PositionStart 컴포넌트
export const PositionStart = styled(BasePosition)`
    top: 1rem;
`;

export const Relative = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
`;
