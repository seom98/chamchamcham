import Lottie from "lottie-react";
import loadingLottie from "../assets/lottie/loading2.json";
import s from "./Loading.module.css";

function Loading({ children }) {
    return (
        <div className={s.loadingContainer}>
            <Lottie animationData={loadingLottie} className={s.loadingGif} />
            <div className={s.loadingText}>{children}</div>
        </div>
    );
}

export default Loading;
