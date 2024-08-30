import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import s from "./PlanPage.module.css";
import Text from "../components/Text";

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
                moneyList.every((money) => money !== "" && !isNaN(money))
            )
        ) {
            alert("다 채웠는지 확인하세요~");
            return; // 모든 필드가 채워지지 않았다면 종료
        }

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
            <Text text={"과소비목록을 적어보자!"} type="big" />
            <Text
                text="하루에 낭비된다고 생각하는 항목을 적어보세요"
                type="small"
                grey
                name={"small"}
            />
            <Text
                text="그리고 지금은 수정안되니까 마지막에 신중하게 완료하세요"
                type="small"
                grey
                name={"small"}
            />
            <div onClick={addItem} className={s.addItem}>
                항목 추가
            </div>
            <div className={s.items}>
                {itemList
                    .slice()
                    .reverse()
                    .map((item, index) => (
                        <div
                            key={itemList.length - 1 - index}
                            className={s.item}
                        >
                            <div className={s.itemTop}>
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
                                    className={s.nameInput}
                                />
                                <div
                                    onClick={() =>
                                        deleteItem(itemList.length - 1 - index)
                                    }
                                    className={s.deleteButton}
                                >
                                    삭제
                                </div>
                            </div>
                            <div className={s.itemBottom}>
                                <input
                                    type="number"
                                    pattern="[0-9]*"
                                    inputmode="numeric"
                                    placeholder="ex) 3000"
                                    value={
                                        moneyList[itemList.length - 1 - index]
                                    }
                                    onChange={(e) =>
                                        handleItemCostChange(
                                            itemList.length - 1 - index,
                                            e.target.value
                                        )
                                    }
                                    className={s.costInput}
                                />
                            </div>
                        </div>
                    ))}
            </div>
            <div onClick={handleSubmit} className={s.submit}>
                완료
            </div>
        </div>
    );
}
