import { useNavigate } from "react-router-dom";
import { useAuthRedirect } from "../hooks/useAuthRedirect"; // 로그인 유지 커스텀 훅
import { BtnAwe, BtnWhi } from "../components/ui/atoms/CustomButton"; // 버튼 컴포넌트
import {
    PosEC,
    PosSR,
    PosRela,
} from "../components/ui/molecules/CustomPosition"; // 포지션 컴포넌트
import { Text12 } from "../components/ui/atoms/CustomText"; // 텍스트 컴포넌트
import Title from "../components/ui/organisms/Title"; // 타이틀 컴포넌트
import Version from "../components/pages/welcome/Version"; // 버전 컴포넌트

export default function WelcomePage() {
    const navigate = useNavigate();

    return useAuthRedirect(
        <PosRela>
            <Version />
            <PosSR>
                <Text12 $margin={"0 1rem"}>참참참 소개</Text12>
            </PosSR>
            <PosEC>
                <Title />
                <BtnWhi
                    onClick={() => setTimeout(() => navigate("/login"), 200)}
                >
                    로그인
                </BtnWhi>
                <BtnAwe
                    onClick={() => setTimeout(() => navigate("/signup"), 200)}
                >
                    회원가입
                </BtnAwe>
            </PosEC>
        </PosRela>
    );
}
