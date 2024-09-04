import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Loading from "../components/Loading"; // 로딩 컴포넌트 import
import s from "./WelcomePage.module.css";
import Text from "../components/ui/atoms/Text";

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
        <div className={s.flexCenter}>
            <Text text={"version_0.1.4"} type="small" grey />
            <h1>참참참</h1>
            <div>참고 참고 참자!!</div>
            <button onClick={() => navigate("/signup")}>회원가입</button>
            <button onClick={() => navigate("/login")}>로그인</button>
        </div>
    );
}
