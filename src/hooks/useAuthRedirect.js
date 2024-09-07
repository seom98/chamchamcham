// hooks/useAuthRedirect.js
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../components/Loading";

// 로딩상태와 화면이동을 위한 커스텀 훅
export const useAuthRedirect = (children) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(true);
            if (user) {
                navigate("/move"); // 로그인 상태면 /move로 이동
            } else {
                setLoading(false); // 로그인 상태가 아니면 로딩 해제
            }
        });

        return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 정리
    }, [navigate]);

    // 로딩 중일 때 로딩 컴포넌트 렌더링
    if (loading) {
        return <Loading>소비습관을 길러주는 참참참!</Loading>;
    }

    // 로딩이 끝나면 children 렌더링
    return children;
};
