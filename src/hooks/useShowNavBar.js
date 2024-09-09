import { useLocation } from "react-router-dom";

function useShowNavBar() {
    const location = useLocation();
    const pathsToShowNavBar = ["/move", "/setting", "/plan", "/diary"];

    // 네비게이션 바를 표시할 경로인지 확인
    return pathsToShowNavBar.includes(location.pathname);
}

export default useShowNavBar;
