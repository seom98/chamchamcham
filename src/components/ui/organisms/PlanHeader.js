import React from "react";
import { Text16, Text20 } from "../../ui/atoms/CustomText";
import { PositionFixed } from "../../ui/molecules/CustomPosition";
import styled from "styled-components";
import { ArrowLeft01Icon } from "hugeicons-react";
import { useNavigate } from "react-router-dom";

import { db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useGetUserInfo } from "../../../hooks/useGetUserInfo";

const HeaderDisplay = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0.5rem;
    background: var(--top2);
`;

const BtnBack = styled.div`
    display: flex;
    align-items: center;
    width: 5rem;
    gap: 0.2rem;
`;
const BtnOk = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 4rem;
    gap: 0.2rem;
    margin-right: 1rem;
`;
// Plan페이지에서 쓸 헤더 컴포넌트
const PlanHeader = ({ itemList, moneyList, setLoading }) => {
    const navigate = useNavigate();

    const { userInfo } = useGetUserInfo();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Firestore에 사용자 데이터 저장
            await updateDoc(doc(db, "users", userInfo.uid), {
                itemList: itemList,
                moneyList: moneyList,
            });

            const userData = sessionStorage.getItem("userInfo");
            let user = JSON.parse(userData);
            user.itemList = itemList;
            user.moneyList = moneyList;
            sessionStorage.setItem("userInfo", JSON.stringify(user));

            navigate("/home");
        } catch (error) {
            alert("생성 실패: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PositionFixed>
            <HeaderDisplay>
                <BtnBack
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <ArrowLeft01Icon size={24} color="var(--grey8)" />
                    <Text16 $light>뒤로</Text16>
                </BtnBack>
                <Text20 $light>목표 설정하기</Text20>
                <BtnOk onClick={handleSubmit}>
                    <Text16 $light $blue>
                        완료
                    </Text16>
                </BtnOk>
            </HeaderDisplay>
        </PositionFixed>
    );
};
export default PlanHeader;
