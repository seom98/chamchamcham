import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//URL이 변경되었을 때 스크롤을 상단으로옮기는 역할.
export default function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}
