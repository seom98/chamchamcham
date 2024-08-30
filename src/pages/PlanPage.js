import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; // onAuthStateChanged 추가
import s from "./PlanPage.module.css";

export default function PlanPage() {
    const navigate = useNavigate();
    const [itemList, setItemList] = useState(["ex)간식"]); // 아이템 리스트
    const [moneyList, setMoneyList] = useState([3000]); // 금액 리스트
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [uid, setUid] = useState(null); // UID를 저장할 상태 추가

    // 아이템과 금액을 리스트에 추가하는 함수
    const addItem = () => {
        setItemList([...itemList, "새로운항목"]);
        setMoneyList([...moneyList, 0]);
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
        try {
            setLoading(true);

            // Firestore에 사용자 데이터 저장
            await updateDoc(doc(db, "users", uid), {
                itemList: itemList,
                moneyList: moneyList,
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
        <div className={s.container}>
            <button onClick={handleSubmit} className={s.submit}>
                완료
            </button>
            <h1>과소비목록을 적어보자!</h1>
            <div>하루에 낭비된다고 생각하는 항목을 적어보세요</div>
            <button onClick={addItem} className={s.addItem}>
                추가
            </button>
            {itemList
                .slice()
                .reverse()
                .map((item, index) => (
                    <div key={itemList.length - 1 - index} className={s.item}>
                        <div className={s.flex}>
                            <input
                                type="text"
                                value={item}
                                onChange={(e) =>
                                    handleItemNameChange(
                                        itemList.length - 1 - index,
                                        e.target.value
                                    )
                                }
                                className={s.nameInput}
                            />
                            <button
                                onClick={() =>
                                    deleteItem(itemList.length - 1 - index)
                                }
                            >
                                삭제
                            </button>
                        </div>
                        <input
                            type="number"
                            value={moneyList[itemList.length - 1 - index]}
                            onChange={(e) =>
                                handleItemCostChange(
                                    itemList.length - 1 - index,
                                    e.target.value
                                )
                            }
                            className={s.costInput}
                        />
                        원
                    </div>
                ))}
        </div>
    );
}
