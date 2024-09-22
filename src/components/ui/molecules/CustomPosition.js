import styled, { keyframes } from "styled-components";

const BasePosition = styled.div`
    position: absolute;
`;

// 포지션 - relative
export const PositionRelative = styled.div`
    position: relative;
    height: ${(props) => props.$height || "100vh"};
`;

// 포지션 - Fixed
export const PositionFixed = styled.div`
    position: fixed;
    max-width: 500px;
    min-width: 320px;
    top: ${(props) => props.$top || ""};
    bottom: ${(props) => props.$bottom || ""};
    left: 0;
    right: 0;
    z-index: 7;
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
