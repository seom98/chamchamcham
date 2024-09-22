import React from "react";
import Loading from "../components/ui/organisms/Loading";
import {
    PosEC,
    PositionRelative,
    PosTL,
    PosTR,
} from "../components/ui/molecules/CustomPosition";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import { useInitialLoad } from "../hooks/useInitialLoad";
import UserHeader from "../components/ui/organisms/UserHeader";
import { Box1 } from "../components/ui/atoms/CustomBox";
import { Text20, Text25 } from "../components/ui/atoms/CustomText";
import { ArrowRight01Icon } from "hugeicons-react";
import Title from "../components/ui/organisms/Title"; // 타이틀 컴포넌트
import { BtnNor } from "../components/ui/atoms/CustomButton";
import { Content, FlexB } from "../components/ui/molecules/CustomDisplay";

export default function HomePage() {
    const navigate = useNavigate();
    const { userInfo, loading } = useGetUserInfo();
    useInitialLoad();

    return (
        <PositionRelative>
            {loading ? (
                <Loading>정보를 불러오는 중..</Loading>
            ) : (
                <>
                    <UserHeader userInfo={userInfo} />
                    <PosEC $bottom="5rem">
                        <Title margin={"1rem"} />
                        <Content>
                            <Box1>
                                <PosTL $s="1.2s" $top="2rem" $left="3rem">
                                    <Text20>쇼핑</Text20>
                                </PosTL>
                                <PosTL $top="7rem" $left="1rem">
                                    <Text20>술</Text20>
                                </PosTL>
                                <PosTR $s="1.8s" $top="4rem" $right="3rem">
                                    <Text20>배달</Text20>
                                </PosTR>
                                <PosTR $s="1.4s" $top="8rem" $right="2rem">
                                    <Text20>간식</Text20>
                                </PosTR>
                                <PosTR $s="1.6s" $top="10rem" $right="10rem">
                                    <Text20>야식</Text20>
                                </PosTR>
                                <Text25 $margin={"3rem 0 0"}>하루에</Text25>
                                <Text25>쓸데없이 쓰는</Text25>
                                <Text25>소비 항목들을</Text25>
                                <Text25 $margin={"0 0 3rem"}>
                                    모아보세요!
                                </Text25>
                                <BtnNor
                                    onClick={() => navigate("/plan/create")}
                                >
                                    <FlexB>
                                        <Text20 $light>목표 만들기</Text20>
                                        <ArrowRight01Icon
                                            size={24}
                                            color={"var(--grey8)"}
                                        />
                                    </FlexB>
                                </BtnNor>
                            </Box1>
                        </Content>
                    </PosEC>
                </>
            )}
        </PositionRelative>
    );
}
