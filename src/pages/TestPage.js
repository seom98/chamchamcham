import { db, auth } from "../firebase";
import { useCallback, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import { signOut, onAuthStateChanged } from "firebase/auth"; // onAuthStateChanged 추가

export default function TestPage() {
    const navigate = useNavigate(); // 페이지 이동 훅
    const [test, setTest] = useState(null); // 초기 상태를 null로 설정
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [money, setMoney] = useState(0); // 로딩 상태 관리

    const getTest = useCallback(async (uid) => {
        try {
            const docRef = doc(db, "users", uid);
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
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // 사용자가 인증된 경우
                getTest(user.uid);
            } else {
                // 사용자가 인증되지 않은 경우
                console.log("사용자가 인증되지 않았습니다.");
                navigate("/login"); // 로그인 페이지로 리디렉션
            }
        });

        // 컴포넌트 언마운트 시 리스너 정리
        return () => unsubscribe();
    }, [getTest, navigate]);

    // test 상태가 업데이트될 때 money를 계산하는 useEffect
    useEffect(() => {
        if (test && test.moneyList) {
            let m = test.moneyList.reduce((acc, curr) => acc + curr, 0);
            setMoney(m);
        }
    }, [test]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("로그아웃 성공");
            navigate("/"); // 로그아웃 후 로그인 페이지로 리디렉션
        } catch (error) {
            console.error("로그아웃 실패:", error.message);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "0.5rem",
                margin: "1rem",
            }}
        >
            <h1>환영쓰~</h1>
            {loading ? (
                <div>
                    잠만요 서버 느린점 양해 부탁. <br></br>님 정보 불러오는중임
                </div>
            ) : money === 0 ? (
                <>
                    <div>
                        우선 {test.nickname}님의 과소비되는 목록부터적어줘{" "}
                    </div>
                    <button onClick={() => navigate("/plan")}>
                        소비목록 적으러가기
                    </button>
                </>
            ) : (
                <>
                    <div>오 {test.nickname}~~ 현재까지</div>
                    <h2>
                        {test.success ? test.success : 0}원 / {money}원
                    </h2>
                    <div>절약함!!!!</div>
                </>
            )}
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
}
