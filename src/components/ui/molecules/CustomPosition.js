import styled from "styled-components";

const BasePosition = styled.div`
    position: absolute;
`;

export const PosSti = styled.div`
    position: sticky;
    width: 100%;
    bottom: 0;
`;

// 하단 가운데 위치
export const PosEC = styled(BasePosition)`
    bottom: ${(props) => props.$bottom || "2.5rem"};
    left: 0;
    right: 0;
`;

// 상단 왼쪽 위치
export const PosSL = styled(BasePosition)`
    top: ${(props) => props.$top || "1rem"};
`;

// 상단 오른쪽 위치
export const PosSR = styled(BasePosition)`
    top: ${(props) => props.$top || "1rem"};
    right: 0;
`;

// 포지션 - relative
export const PosRela = styled.div`
    position: relative;
    height: ${(props) => props.$height || "100vh"};
    z-index: ${(props) => props.$zIndex || "0"};
`;

// 디스플레이 - flex
export const Flex = styled.div`
    z-index: ${(props) => props.$zIndex || "0"};
    gap: ${(props) => props.$gap || "0"};
    display: flex;
    justify-content: center;
`;

// space-around
export const FlexA = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0 1.5rem;
`;

// 오른쪽으로 정렬
export const FlexE = styled.div`
    width: calc(100% - 3rem);
    display: flex;
    justify-content: flex-end;
`;

// 가로세로 가운데 정렬
export const FlexCC = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
