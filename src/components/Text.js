import s from "./Text.module.css";

export default function Text({
    text,
    type = "normal",
    blue = false,
    red = false,
    white = false,
    grey = false,
    onClick,
    name,
}) {
    const getColor = () => {
        if (blue) return 3;
        if (red) return 4;
        if (white) return 2;
        if (grey) return 1;
        return 0; // 기본 색상
    };
    const types = {
        normal: { size: 1, bold: 1, color: getColor() }, //기본
        h1: { size: 5, bold: 3, color: getColor() }, //가장 큰 글씨
        h2: { size: 4, bold: 2, color: getColor() }, //적당히 큰 글씨
        h3: { size: 3, bold: 2, color: getColor() }, //조금 큰 글씨
        big: { size: 2, bold: 1, color: getColor() }, //큰 글씨
        small: { size: 0, bold: 1, color: getColor() }, //작은 글씨
    };
    const sizes = ["12px", "16px", "20px", "25px", "36px", "50px"];
    const bolds = ["100", "400", "600", "900"];
    const colors = [
        "var(--grey8)",
        "var(--grey5)",
        "var(--grey1)",
        "var(--blue)",
        "var(--red)",
    ];
    return (
        <div
            style={{
                fontSize: sizes[types[type].size],
                fontWeight: bolds[types[type].bold],
                color: colors[types[type].color],
                letterSpacing: "-0.05em",
                transition: "0.3s",
            }}
            onClick={onClick}
            className={s[name]}
        >
            {text}
        </div>
    );
}
