// WelcomePage.js
import { useNavigate } from "react-router-dom";
import { useAuthRedirect } from "../components/hooks/useAuthRedirect"; // 커스텀 훅 불러오기
import {
    ButtonAwesome,
    ButtonWhite,
} from "../components/ui/atoms/CustomButton";
import {
    PositionEnd,
    Relative,
} from "../components/ui/molecules/CustomPosition";
import Version from "../components/pages/welcome/Version";
import Title from "../components/ui/organisms/Title";

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
