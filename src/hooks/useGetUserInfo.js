import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// 사용자 정보를 가져오는 커스텀 훅
export function useGetUserInfo() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(() => {
        // 초기 상태로 세션 스토리지에 저장된 사용자 정보를 설정
        const savedUserInfo = sessionStorage.getItem("userInfo");
        return savedUserInfo ? JSON.parse(savedUserInfo) : null;
    });
    const [loading, setLoading] = useState(!userInfo); // 세션스토리지에 정보가 없다면 로딩을 true로 설정

    const getUserInfo = useCallback(async (uid) => {
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setUserInfo(data);
                sessionStorage.setItem("userInfo", JSON.stringify(data)); // 세션 스토리지에 사용자 정보 저장
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!userInfo) {
            // 세션 스토리지에 정보가 없는 경우에만 Firebase에서 가져옴
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    getUserInfo(user.uid);
                } else {
                    navigate("/login");
                }
            });

            return () => unsubscribe();
        } else {
            setLoading(false); // 세션스토리지에 정보가 있는 경우 로딩을 false로 설정
        }
    }, [getUserInfo, navigate, userInfo]);

    return { userInfo, loading };
}
