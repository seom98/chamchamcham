import { db, auth } from "../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Loading from "../components/Loading";
import React from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import { signOut } from "firebase/auth";

export default function TestPage() {
    const navigate = useNavigate(); // 페이지 이동 훅
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

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("로그아웃 성공");
            navigate("/login"); // 로그아웃 후 로그인 페이지로 리디렉션
        } catch (error) {
            console.error("로그아웃 실패:", error.message);
        }
    };

    return (
        <>
            {loading ? <Loading /> : test && <div>{test.name}</div>}
            <button onClick={handleLogout}>로그아웃</button>
        </>
    );
}
