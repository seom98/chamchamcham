import { useNavigate } from "react-router-dom";

export default function TestPage() {
    const navigate = useNavigate();

    return (
        <>
            <div onClick={() => navigate(-1)}>이거 누르면 뒤로 감요!</div>
        </>
    );
}
