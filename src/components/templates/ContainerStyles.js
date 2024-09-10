import styled from "styled-components";

// 컨테이너를 덮는곳
export const ContainerWrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    // 모바일 환경일 경우
    @media (max-width: 650px) {
        width: 100%;
        min-width: 320px;
    }
`;

// 메인공간
export const Main = styled.main`
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

// 메인공간을 가득차도록 공간설정
export const ContentWrapper = styled.div`
    flex-grow: 1;
    overflow-y: auto;
`;

// 웹이었을 경우
export const IfWeb = styled.div`
    background-color: var(--grey1);
    border-radius: 1rem;
    box-shadow: 0 2px 40px 0 var(--shadow1);
    margin: 1rem;
    padding: 1rem;
    width: 30vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // 모바일 환경일 경우 나타내지 않음
    @media (max-width: 650px) {
        display: none !important;
    }
`;

// QR코드가 위치하는 곳
export const QRcode = styled.div`
    background: var(--qr) no-repeat center;
    background-size: cover;
    width: 20vw;
    height: 20vw;
`;
