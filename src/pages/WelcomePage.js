import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Loading from "../components/Loading"; // 로딩 컴포넌트 import
import { Text12, Text16, Text36 } from "../components/ui/atoms/CuntomText";
import {
    ButtonAwesome,
    ButtonWhite,
} from "../components/ui/atoms/CustomButton";
import { PositionEnd } from "../components/ui/molecules/CustomPosition";

export default function WelcomePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // 초기 로딩 상태 true

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/move");
            } else {
                setLoading(false); // 로그인 확인 후 로딩 상태 false로 변경
            }
        });

        // 컴포넌트 언마운트 시 리스너 정리
        return () => unsubscribe();
    }, [navigate]);

    if (loading) {
        return <Loading>정보를 불러오는중</Loading>; // 로딩 상태일 때 로딩 컴포넌트 표시
    }

    return (
        <>
            <Text12 margin={"1rem"} grey>
                version_0.1.5
            </Text12>
            <PositionEnd>
                <Text16 grey center light>
                    아무 것도 하지 않고
                </Text16>
                <Text16 grey center light>
                    돈을 버는 아주 쉬운 방법
                </Text16>
                <Text36 awesome margin={"1rem 1rem 15rem"} center>
                    참고 참고 참기!
                </Text36>
                <ButtonWhite onClick={() => navigate("/login")} light>
                    로그인
                </ButtonWhite>
                <ButtonAwesome onClick={() => navigate("/signup")} light>
                    회원가입
                </ButtonAwesome>
            </PositionEnd>
        </>
    );
}
