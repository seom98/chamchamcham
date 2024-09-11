import React from "react";
import { Text16, Text20 } from "../../ui/atoms/CustomText";
import { PosSC } from "../../ui/molecules/CustomPosition";
import styled from "styled-components";
import { ArrowLeft01Icon } from "hugeicons-react";
import { useNavigate } from "react-router-dom";

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
export default function PlanHeader() {
    const navigate = useNavigate();
    return (
        <PosSC>
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
                <BtnOk>
                    <Text16 $light $blue>
                        완료
                    </Text16>
                </BtnOk>
            </HeaderDisplay>
        </PosSC>
    );
}
