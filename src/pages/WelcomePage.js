import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate("/signup")}>
                대충 회원가입 화면가는 버튼
            </button>
            <button onClick={() => navigate("/login")}>
                대충 로그인 화면가는 버튼
            </button>
        </div>
    );
}
