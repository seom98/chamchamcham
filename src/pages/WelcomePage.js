import { useNavigate } from "react-router-dom";
import { useAuthRedirect } from "../hooks/useAuthRedirect"; // 로그인 유지 커스텀 훅
import { BtnAwe, BtnWhi } from "../components/ui/atoms/CustomButton"; // 버튼 컴포넌트
import { PosEC } from "../components/ui/atoms/CustomPosition"; // 포지션 컴포넌트
import Title from "../components/ui/organisms/Title"; // 타이틀 컴포넌트
import Version from "../components/pages/welcome/Version"; // 버전 컴포넌트

export default function WelcomePage() {
    const navigate = useNavigate();

    return useAuthRedirect(
        <>
            <Version />
            <PosEC>
                <Title />
                <BtnWhi onClick={() => navigate("/login")}>로그인</BtnWhi>
                <BtnAwe onClick={() => navigate("/signup")}>회원가입</BtnAwe>
            </PosEC>
        </>
    );
}
