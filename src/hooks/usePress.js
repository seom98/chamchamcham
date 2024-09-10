import { useState } from "react";

// 터치 효과를 위한 커스텀 훅
export const usePress = () => {
    const [isPressed, setIsPressed] = useState(false);

    const handleTouchStart = () => {
        setIsPressed(true);
    };

    const handleTouchEnd = () => {
        setIsPressed(false);
    };

    const handleTouchCancel = () => {
        setIsPressed(false);
    };

    return {
        isPressed,
        handleTouchStart,
        handleTouchEnd,
        handleTouchCancel,
    };
};
