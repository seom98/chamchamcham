import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
    const navigate = useNavigate();

    return (
        <div>
            <div>참참참에 오신걸 환영ㅋ</div>
            <div>어떤 사이트인지는 나중에 알려줌ㅋㅋ</div>
            <button onClick={() => navigate("/signup")}>
                대충 회원가입 화면가는 버튼
            </button>
            <button onClick={() => navigate("/login")}>
                대충 로그인 화면가는 버튼
            </button>
        </div>
    );
}
