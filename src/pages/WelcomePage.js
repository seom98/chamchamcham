import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Loading from "../components/Loading"; // 로딩 컴포넌트 import

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
        return <Loading />; // 로딩 상태일 때 로딩 컴포넌트 표시
    }

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
