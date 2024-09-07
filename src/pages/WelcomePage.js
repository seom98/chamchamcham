import { useNavigate } from "react-router-dom";
// 훅
import { useAuthRedirect } from "../hooks/useAuthRedirect";
// 스타일드 컴포넌트
import {
    ButtonAwesome,
    ButtonWhite,
} from "../components/ui/atoms/CustomButton";
import {
    PositionEnd,
    Relative,
} from "../components/ui/molecules/CustomPosition";
// 타이틀
import Title from "../components/ui/organisms/Title";
// 컴포넌트
import Version from "../components/pages/welcome/Version";

export default function WelcomePage() {
    const navigate = useNavigate();

    return useAuthRedirect(
        <Relative>
            <Version />
            <PositionEnd>
                <Title />
                <ButtonWhite
                    onClick={() => setTimeout(() => navigate("/login"), 200)}
                >
                    로그인
                </ButtonWhite>
                <ButtonAwesome
                    onClick={() => setTimeout(() => navigate("/signup"), 200)}
                >
                    회원가입
                </ButtonAwesome>
            </PositionEnd>
        </Relative>
    );
}
