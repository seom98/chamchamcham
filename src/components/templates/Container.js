// Container.js
import styled from "styled-components";
import { Text16 } from "../ui/atoms/CuntomText";

// 스타일드 컴포넌트 정의
const ContainerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative; // position을 relative로 설정

    @media (max-width: 650px) {
        // 최대 폭 600px일 때
        width: 100%;
        min-width: 320px;

        .Web {
            display: none !important;
        }
    }
`;

const Main = styled.div`
    width: 500px;
    height: 100vh;
`;

const Web = styled.div`
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

    /* 기본 상태에서는 보이도록 설정
    display: block; */
`;

const Img = styled.div`
    background: var(--qr) no-repeat center;
    background-size: cover; /* 또는 contain */
    width: 20vw;
    height: 20vw;
`;

// 컨테이너 컴포넌트
export default function Container({ children }) {
    return (
        <ContainerWrapper>
            <Main>{children}</Main>
            <Web className="Web">
                <Text16>서비스는</Text16>
                <Text16 margin={"0 0 1rem"}>
                    모바일에 최적화되어있습니다.
                </Text16>
                <Img />
                <Text16 margin={"1rem 0 0"}>QR코드를 찍어서</Text16>
                <Text16>바로 서비스를 이용해보세요~!</Text16>
            </Web>
        </ContainerWrapper>
    );
}
