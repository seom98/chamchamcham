import styled, { keyframes } from "styled-components";

const BasePosition = styled.div`
    position: absolute;
`;

export const PosSti = styled.div`
    position: sticky;
    width: 100%;
    bottom: ${(props) => props.$bottom || "0"};
    left: 0;
    right: 0;

    // 모바일 환경일 경우
    @media (max-width: 650px) {
        position: fixed;
        width: 100%;
        left: 0;
        right: 0;
        bottom: ${(props) => props.$bottom || "0"};
    }
`;

// 업다운 애니메이션 정의
const updown = keyframes`
  0% {
    transform: translateY(0.5rem) rotateZ(5deg);
  }
  50% {
    transform: translateY(0rem) rotateZ(-5deg);
  }

  100% {
    transform: translateY(0.5rem) rotateZ(5deg);
  }
`;

// 원하는 위치
const PosAb = styled(BasePosition)`
    width: 3.5rem;
    height: 3.5rem;
    background-color: var(--blur3);
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${updown} ${(props) => props.$s || "1.5s"} ease-in-out infinite;
`;

export const PosTL = styled(PosAb)`
    top: ${(props) => props.$top || "2.5rem"};
    left: ${(props) => props.$left || "2.5rem"};
`;
export const PosTR = styled(PosAb)`
    top: ${(props) => props.$top || "2.5rem"};
    right: ${(props) => props.$right || "2.5rem"};
`;
export const PosBL = styled(PosAb)`
    bottom: ${(props) => props.$bottom || "2.5rem"};
    left: ${(props) => props.$left || "2.5rem"};
`;
export const PosBR = styled(PosAb)`
    bottom: ${(props) => props.$bottom || "2.5rem"};
    right: ${(props) => props.$right || "2.5rem"};
`;

// 하단 가운데 위치
export const PosEC = styled(BasePosition)`
    bottom: ${(props) => props.$bottom || "2.5rem"};
    left: 0;
    right: 0;
`;

// 상단 가운데 위치
export const PosSC = styled.div`
    position: sticky;
    top: ${(props) => props.$top || "0"};
    left: 0;
    right: 0;
    z-index: 7;

    // 모바일 환경일 경우
    @media (max-width: 650px) {
        position: fixed;
        top: ${(props) => props.$top || "0"};
        left: 0;
        right: 0;
    }
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
    align-items: ${(props) => props.$align || ""};
`;

// space-around
export const FlexA = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0 1.5rem;
`;
// space-between
export const FlexB = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// 오른쪽으로 정렬
export const FlexE = styled.div`
    width: ${(props) => props.$width || "calc(100% - 3rem)"};
    display: flex;
    justify-content: flex-end;
    gap: ${(props) => props.$gap || "0.5rem"};
    align-items: center;
`;

// 가로세로 가운데 정렬
export const FlexCC = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Content = styled.div`
    padding: ${(props) => props.$padding || "4rem 2.5rem 6rem"};
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y: auto;
`;
