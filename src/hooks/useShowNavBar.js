import { useLocation } from "react-router-dom";

// 네비게이션 바를 표시할 수 있는 경로인지 체크하는 커스텀 훅
export default function useShowNavBar() {
    const location = useLocation();
    const pathsToShowNavBar = ["/home", "/setting", "/plan", "/calendar"];

    // 네비게이션 바를 표시할 경로인지 확인
    return pathsToShowNavBar.includes(location.pathname);
}
