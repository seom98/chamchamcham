import { useEffect } from "react";

//다크모드인지 확인하는 역할.
const DarkModeCheck = () => {
    useEffect(() => {
        const bgMode = window.localStorage.getItem("bgMode");
        if (bgMode === "dark") {
            document.getElementsByTagName("html")[0].classList.add("dark");
        }
    }, []);
    return null;
};
export default DarkModeCheck;
