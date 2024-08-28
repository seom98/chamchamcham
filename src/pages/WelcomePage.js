import { db } from "../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function WelcomePage() {
    const navigate = useNavigate();
    const [test, setTest] = useState(null); // 초기 상태를 null로 설정
    const [loading, setLoading] = useState(true); // 로딩 상태 관리

    async function getTest() {
        try {
            const docRef = doc(db, "test", "t2");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setTest(docSnap.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        } finally {
            setLoading(false); // 데이터가 로드되었으므로 로딩 상태를 false로 설정
        }
    }

    useEffect(() => {
        getTest();
    }, []);

    return (
        <div>
            {loading ? <Loading /> : test && <div>{test.name}</div>}
            <button onClick={() => navigate("move")}>
                이거 누르면 화면 바뀜
            </button>
        </div>
    );
}
