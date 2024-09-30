// hooks/useAuthRedirect.js
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import LoadingPopup from "../components/ui/organisms/LoadingPopup";

// 로딩상태와 화면이동을 위한 커스텀 훅
export const useAuthRedirect = (children, redirectPath = "/home") => {
    const navigate = useNavigate();
    const [authState, setAuthState] = useState({
        loading: true,
        user: null,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                if (user) {
                    navigate(redirectPath); // 로그인 상태면 /home로 이동
                } else {
                    setAuthState({ loading: false, user: null }); // 로그인 상태가 아니면 로딩 해제
                }
            },
            (error) => {
                console.error("Auth state change error:", error);
                setAuthState({ loading: false, user: null });
            }
        );

        return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 정리
    }, [navigate, redirectPath]);

    // 로딩 중일 때 로딩 컴포넌트 렌더링
    if (authState.loading) {
        return <LoadingPopup>소비습관을 길러주는 참참참!</LoadingPopup>;
    }

    // 로딩이 끝나면 children 렌더링
    return children;
};
