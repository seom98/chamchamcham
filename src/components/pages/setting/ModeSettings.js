import { useEffect, useState } from "react";
import { Box1 } from "../../ui/atoms/CustomBox";
import { FlexB } from "../../ui/atoms/CustomDisplay";
import { Text16 } from "../../ui/atoms/CustomText";
import { SwitchLabel, Slider } from "./SwitchTogleStyles";

const ModeSettings = () => {
    const [toggle, setToggle] = useState(false);
    const [toggle2, setToggle2] = useState(false);
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
        <Box1>
            <FlexB $gap={"1rem"} $margin={"0.5rem 1rem 1.5rem"}>
                <Text16>다크모드</Text16>
                <SwitchLabel>
                    <input
                        type="checkbox"
                        onClick={darkOnOff}
                        checked={toggle}
                        readOnly
                    />
                    <Slider />
                </SwitchLabel>
            </FlexB>
            <FlexB $gap={"1rem"} $margin={"0.5rem 1rem"}>
                <Text16>알림설정</Text16>
                <SwitchLabel>
                    <input
                        type="checkbox"
                        onClick={() => setToggle2(!toggle2)}
                        checked={toggle2}
                        readOnly
                    />
                    <Slider />
                </SwitchLabel>
            </FlexB>
        </Box1>
    );
};

export default ModeSettings;
