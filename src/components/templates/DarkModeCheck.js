//다크모드인지 확인하는 역할을 역할을 합니다.

import { useEffect } from "react";
export default function DarkModeCheck() {
    useEffect(() => {
        const bgMode = window.localStorage.getItem("bgMode");
        if (bgMode === "dark") {
            document.getElementsByTagName("html")[0].classList.add("dark");
        }
    }, []);
    return null;
}
