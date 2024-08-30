import s from "./SettingPage.module.css";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Text from "../components/Text";

export default function SettingPage() {
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const bgMode = window.localStorage.getItem("bgMode");
        if (bgMode === "dark") {
            setToggle(true);
            document.getElementsByTagName("html")[0].classList.add("dark");
        }
    }, []);
    const darkOnOff = () => {
        setToggle((prev) => !prev);
        if (toggle) {
            document.getElementsByTagName("html")[0].classList.remove("dark");
            window.localStorage.setItem("bgMode", "light");
        } else {
            document.getElementsByTagName("html")[0].classList.add("dark");
            window.localStorage.setItem("bgMode", "dark");
        }
    };
    return (
        <div className={s.box}>
            <Text text={"환경설정"} type="big" name="center" />
            <div onClick={() => navigate(-1)}>뒤로 가기</div>
            <div className={s.setting}>
                <div>다크모드</div>
                <label className={s.switch}>
                    <input
                        type="checkbox"
                        onClick={darkOnOff}
                        checked={toggle}
                    />
                    <span className={classNames(s.slider, s.round)}></span>
                </label>
            </div>
        </div>
    );
}
