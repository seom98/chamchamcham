import styled from "styled-components";

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
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 1rem 0rem;
`;
// space-between
export const FlexB = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${(props) => props.$gap || "0"};
    margin: ${(props) => props.$margin || "0"};
`;

// 오른쪽으로 정렬
export const FlexE = styled.div`
    width: ${(props) => props.$width || "calc(100% - 3rem)"};
    gap: 0.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
// 왼쪽 정렬
export const FlexS = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
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

export const CalendarFrame = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
    margin: 1rem 0;
`;
