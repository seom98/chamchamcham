import s from "./SettingPage.module.css";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PosRela } from "../components/ui/molecules/CustomPosition";
import { useAccount } from "../hooks/useAccount";

export default function SettingPage() {
    const { logout } = useAccount(); //로그인 커스텀 훅을 가져옴.
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
        <PosRela>
            <div className={s.box}>
                환경설정
                <div onClick={() => navigate(-1)}>뒤로 가기</div>
                <div className={s.setting}>
                    <div>다크모드</div>
                    <label className={s.switch}>
                        <input
                            type="checkbox"
                            onClick={darkOnOff}
                            checked={toggle}
                            readOnly
                        />
                        <span className={classNames(s.slider, s.round)}></span>
                    </label>
                </div>
                <button onClick={logout}>로그아웃</button>
            </div>
        </PosRela>
    );
}
