import { Text16, Text20 } from "../../ui/atoms/CustomText";
import { PositionFixed } from "../../ui/atoms/CustomPosition";
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
// Date페이지에서 쓸 헤더 컴포넌트
const DateHeader = ({ month, day }) => {
    const navigate = useNavigate();
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
                <Text20 $light>
                    {month}월 {day}일
                </Text20>
                <BtnOk onClick={() => {}}>
                    <Text16 $light $blue>
                        완료
                    </Text16>
                </BtnOk>
            </HeaderDisplay>
        </PositionFixed>
    );
};

export default DateHeader;
