import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../components/Loading";
import { PosRela } from "../components/ui/molecules/CustomPosition";
import { useInitialLoad } from "../hooks/useInitialLoad";

export default function TestPage() {
    const navigate = useNavigate(); // 페이지 이동 훅
    const [test, setTest] = useState(null); // 초기 상태를 null로 설정
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [money, setMoney] = useState(100000); // 로딩 상태 관리

    useInitialLoad();

    const getTest = useCallback(async (uid) => {
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setTest(docSnap.data());
            }
        } catch (error) {
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

    return (
        <PosRela>
            {loading ? (
                <Loading>
                    잠만요 서버 느린점 양해 부탁. <br></br>님 정보 불러오는중임
                </Loading>
            ) : (
                <div
                // style={{
                //     display: "flex",
                //     alignItems: "center",
                //     justifyContent: "center",
                //     flexDirection: "column",
                //     gap: "0.5rem",
                // }}
                >
                    <div>
                        <div>{test.nickname} </div>
                        <div>
                            Lv.{test.level} &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
                            {test.point} P
                        </div>
                    </div>
                    <div>{money.toLocaleString()}원</div>
                    {money === 0 ? (
                        <>
                            <div>
                                우선 {test.nickname}님의 과소비되는
                                목록부터적어줘{" "}
                            </div>
                            <div onClick={() => navigate("/diary")}>달력</div>
                            <button onClick={() => navigate("/plan")}>
                                소비목록 적으러가기
                            </button>
                        </>
                    ) : (
                        <>
                            <div>오 {test.nickname}~~ 현재까지</div>
                            <h2>
                                {test.success}원 / {money}원
                            </h2>
                            <div>절약함!!!!</div>
                            <br></br>
                            <div>그리고</div>
                            <h2>
                                {money}원 / {money}원
                            </h2>
                            <div>땅에 내갖다버림</div>
                        </>
                    )}
                </div>
            )}
        </PosRela>
    );
}
