import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, updateDoc, collection, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Relative } from "../components/ui/molecules/CustomPosition";

export default function PlanPage() {
    const navigate = useNavigate();
    const [itemList, setItemList] = useState([""]); // 아이템 리스트
    const [moneyList, setMoneyList] = useState([""]); // 금액 리스트
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [uid, setUid] = useState(null); // UID를 저장할 상태 추가

    // 아이템과 금액을 리스트에 추가하는 함수
    const addItem = () => {
        setItemList([...itemList, ""]);
        setMoneyList([...moneyList, ""]);
    };

    // 리스트에서 아이템을 삭제하는 함수
    const deleteItem = (index) => {
        const newItemList = [...itemList];
        const newMoneyList = [...moneyList];
        newItemList.splice(index, 1);
        newMoneyList.splice(index, 1);
        setItemList(newItemList);
        setMoneyList(newMoneyList);
    };

    // 아이템 이름 변경 핸들러
    const handleItemNameChange = (index, newName) => {
        const newItemList = [...itemList];
        newItemList[index] = newName;
        setItemList(newItemList);
    };

    // 금액 변경 핸들러
    const handleItemCostChange = (index, newCost) => {
        const newMoneyList = [...moneyList];
        newMoneyList[index] = parseInt(newCost, 10);
        setMoneyList(newMoneyList);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid); // 사용자 uid를 상태로 저장
            }
        });

        // 컴포넌트 언마운트 시 리스너 정리
        return () => unsubscribe();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !(
                itemList.every((item) => item !== "") &&
                moneyList.every((money) => money > 0 && !isNaN(money))
            )
        ) {
            alert("다 채웠는지 확인하세요~");
            return; // 모든 필드가 채워지지 않았다면 종료
        }

        try {
            setLoading(true);

            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
            const day = String(today.getDate()).padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;

            // Firestore에 사용자 데이터 저장
            await updateDoc(doc(db, "users", uid), {
                itemList: itemList,
                moneyList: moneyList,
            });

            // Firestore에 서브컬렉션 생성 및 데이터 추가
            const dateDocRef = doc(
                collection(doc(db, "users", uid), "date"),
                formattedDate
            );
            await setDoc(dateDocRef, {
                itemList: itemList,
                moneyList: moneyList,
                success: 0,
                failure: 0,
            });

            navigate("/move");
        } catch (error) {
            alert("생성 실패: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div>
                <div>당신의 목표가 생성되는중! 좀만기달~~</div>
            </div>
        );
    }

    return (
        <Relative>
            <div>
                <div onClick={addItem}>항목 추가</div>
                <div>
                    {itemList
                        .slice()
                        .reverse()
                        .map((item, index) => (
                            <div key={itemList.length - 1 - index}>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="과소비되는 항목 ex) 간식"
                                        value={item}
                                        onChange={(e) =>
                                            handleItemNameChange(
                                                itemList.length - 1 - index,
                                                e.target.value
                                            )
                                        }
                                    />
                                    <div
                                        onClick={() =>
                                            deleteItem(
                                                itemList.length - 1 - index
                                            )
                                        }
                                    >
                                        삭제
                                    </div>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        pattern="[0-9]*"
                                        inputmode="numeric"
                                        placeholder="ex) 3000"
                                        value={
                                            moneyList[
                                                itemList.length - 1 - index
                                            ]
                                        }
                                        onChange={(e) =>
                                            handleItemCostChange(
                                                itemList.length - 1 - index,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                </div>
                <div onClick={handleSubmit}>완료</div>
            </div>
        </Relative>
    );
}
