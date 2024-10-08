import React from "react";
import { Text16, Text20 } from "../atoms/CustomText";
import { PositionFixed } from "../atoms/CustomPosition";
import styled from "styled-components";

const HeaderDisplay = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: var(--top);
`;
const LevelWrapper = styled.div`
    width: 200px;
    height: 30px;
    background-color: var(--grey3);
    border-radius: 15px;
    padding: 3px;
    position: relative;
`;
const LevelBar = styled.div`
    width: ${(props) => props.$width || "24px"};
    min-width: 24px;
    max-width: 194px;
    height: 24px;
    background-color: var(--grey1);
    border-radius: 12px;
    padding: 3px;
`;
const Level = styled.div`
    position: absolute;
    right: 1rem;
    top: 7px;
`;
// 유저정보를 담는 헤더 컴포넌트
const HeaderOfUser = React.memo(({ userInfo }) => {
    return (
        <PositionFixed>
            <HeaderDisplay>
                <Text20>{userInfo.nickname}</Text20>
                <LevelWrapper>
                    <LevelBar $width={userInfo.point}></LevelBar>
                    <Level>
                        <Text16 $light>Lv. {userInfo.level}</Text16>
                    </Level>
                </LevelWrapper>
            </HeaderDisplay>
        </PositionFixed>
    );
});

export default HeaderOfUser;
