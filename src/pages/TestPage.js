import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import s from "./TestPage.module.css";
import Loading from "../components/Loading";
import { Relative } from "../components/ui/molecules/CustomPosition";

export default function TestPage() {
    const navigate = useNavigate(); // 페이지 이동 훅
    const [test, setTest] = useState(null); // 초기 상태를 null로 설정
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [money, setMoney] = useState(100000); // 로딩 상태 관리
    const [isInitialLoad, setIsInitialLoad] = useState(false); // 초기 로딩 상태를 관리

    useEffect(() => {
        // 사용자가 처음 방문한 경우에만 로직 실행
        const hasVisitedBefore = sessionStorage.getItem("hasVisitedMove");

        if (!hasVisitedBefore) {
            // 방문 여부를 저장
            sessionStorage.setItem("hasVisitedMove", "true");
            setIsInitialLoad(true); // 처음 도착했음을 설정
        }
    }, []);

    useEffect(() => {
        if (!isInitialLoad) return; // 처음 방문이 아닐 경우, 아무것도 하지 않음

        const preloadRoutes = async () => {
            const routes = ["/plan", "/diary", "/setting"];

            for (const route of routes) {
                await navigateTo(route);
            }

            // 마지막으로 다시 /move로 돌아오기
            navigate("/move");
            setIsInitialLoad(false); // 로딩 후 false로 설정
        };

        const navigateTo = (path) => {
            return new Promise((resolve) => {
                navigate(path);
                setTimeout(resolve, 5); // 5ms 동안 기다리기
            });
        };

        preloadRoutes();
    }, [isInitialLoad, navigate]); // isInitialLoad 상태에 의존

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

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/"); // 로그아웃 후 로그인 페이지로 리디렉션
        } catch (error) {}
    };

    return (
        <Relative>
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
                    <div className={s.flex}>
                        <div>{test.nickname} </div>
                        <div>
                            Lv.{test.level} &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
                            {test.point} P
                        </div>
                    </div>
                    <div className={s.text}>{money.toLocaleString()}원</div>
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
                    <button onClick={handleLogout}>로그아웃</button>
                </div>
            )}
        </Relative>
    );
}
