import {
    ContainerWrapper,
    Main,
    ContentWrapper,
    IfWeb,
    QRcode,
} from "./ContainerStyles"; // 스타일드 컴포넌트
import { Text16 } from "../ui/atoms/CustomText"; // 텍스트 컴포넌트
import Nav from "../ui/organisms/Nav"; // 네비게이션 바 컴포넌트
import useShowNavBar from "../../hooks/useShowNavBar"; // 네이게이션이 위치할 곳인지 판단하는 커스텀 훅

export default function Container({ children }) {
    const showNavBar = useShowNavBar();

    return (
        <ContainerWrapper>
            <Main>
                <ContentWrapper>{children}</ContentWrapper>
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
        </ContainerWrapper>
    );
}
