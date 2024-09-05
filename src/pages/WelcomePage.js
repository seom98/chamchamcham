import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Loading from "../components/Loading"; // 로딩 컴포넌트 import
import { Text12 } from "../components/ui/atoms/CuntomText";
import {
    ButtonAwesome,
    ButtonWhite,
} from "../components/ui/atoms/CustomButton";
import {
    PositionEnd,
    PositionStart,
    Relative,
} from "../components/ui/molecules/CustomPosition";
import Title from "../components/ui/organisms/Title";

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
        return (
            <Loading>
                <Title />
            </Loading>
        ); // 로딩 상태일 때 로딩 컴포넌트 표시
    }

    return (
        <Relative>
            <PositionStart>
                <Text12 $margin={"0 1rem"} $grey>
                    version_0.2.2
                </Text12>
            </PositionStart>
            <PositionEnd>
                <Title />
                <ButtonWhite
                    onClick={() => setTimeout(() => navigate("/login"), 200)}
                >
                    로그인
                </ButtonWhite>
                <ButtonAwesome onClick={() => navigate("/signup")}>
                    회원가입
                </ButtonAwesome>
            </PositionEnd>
        </Relative>
    );
}
