import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 초기 랜더링을 미리 시켜주기 위한 함수
export const useInitialLoad = () => {
    const navigate = useNavigate();
    const [isInitialLoad, setIsInitialLoad] = useState(false);

    useEffect(() => {
        const hasVisitedBefore = sessionStorage.getItem("hasVisitedMove");

        if (!hasVisitedBefore) {
            sessionStorage.setItem("hasVisitedMove", "true");
            setIsInitialLoad(true);
        }
    }, []);

    useEffect(() => {
        if (!isInitialLoad) return;

        const preloadRoutes = async () => {
            const routes = ["/plan", "/calendar", "/setting"];

            for (const route of routes) {
                await navigateTo(route);
            }

            navigate("/home");
            setIsInitialLoad(false);
        };

        const navigateTo = (path) => {
            return new Promise((resolve) => {
                navigate(path);
                setTimeout(resolve, 5);
            });
        };

        preloadRoutes();
    }, [isInitialLoad, navigate]);
};
