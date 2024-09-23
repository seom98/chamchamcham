import { Text16 } from "../ui/atoms/CustomText"; // 텍스트 컴포넌트
import Nav from "../ui/organisms/Nav"; // 네비게이션 바 컴포넌트
import { useShowNavBar } from "../../hooks/useShowNavBar"; // 네이게이션이 위치할 곳인지 판단하는 커스텀 훅
import styled from "styled-components";
import { PositionRelative } from "../ui/molecules/CustomPosition";

// 메인공간
const Main = styled.main`
    max-width: 500px;
    width: 100%;
    min-width: 320px;
`;

// 웹이었을 경우
const IfWeb = styled.div`
    position: fixed;
    top: 20px;
    bottom: 20px;
    left: 520px;
    background-color: var(--grey1);
    border-radius: 1rem;
    box-shadow: 0 2px 40px 0 var(--shadow1);
    margin: 1rem;
    padding: 1rem;
    width: 20vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // 모바일 환경일 경우 나타내지 않음
    @media (max-width: 500px) {
        display: none;
    }
`;

// QR코드가 위치하는 곳
const QRcode = styled.div`
    background: var(--qr) no-repeat center;
    background-size: cover;
    width: 15vw;
    height: 15vw;
`;

const Container = ({ children }) => {
    const showNavBar = useShowNavBar();

    return (
        <>
            <Main>
                <PositionRelative>{children}</PositionRelative>
                {showNavBar && <Nav />}
            </Main>
            <IfWeb>
                <Text16>서비스는</Text16>
                <Text16 $margin={"0 0 1rem"}>
                    모바일에 최적화되어있습니다.
                </Text16>
                <QRcode />
                <Text16 $margin={"1rem 0 0"}>QR코드를 찍어서</Text16>
                <Text16>바로 서비스를 이용해보세요~!</Text16>
            </IfWeb>
        </>
    );
};

export default Container;
