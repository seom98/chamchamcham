import { useNavigate } from "react-router-dom";
import { PositionFixed } from "../components/ui/atoms/CustomPosition";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import HeaderOfUser from "../components/ui/organisms/HeaderOfUser";
import LoadingPopup from "../components/ui/organisms/LoadingPopup";
import { Text12, Text20, Text36 } from "../components/ui/atoms/CustomText";
import { ArrowRight01Icon } from "hugeicons-react";
import { Box1, Box2 } from "../components/ui/atoms/CustomBox";
import { BtnAdd, BtnNor } from "../components/ui/atoms/CustomButton";
import {
    Content,
    Flex,
    FlexB,
    FlexE,
} from "../components/ui/atoms/CustomDisplay";

export default function PlanPage() {
    const navigate = useNavigate();
    const { userInfo, loading } = useGetUserInfo();

    const CostItem = ({ item, index }) => {
        return (
            <FlexB $align={"center"} onClick={() => {}}>
                <Text12 $light>{item}</Text12>
                <FlexE $width={"50%"}>
                    <Text12>
                        {(+userInfo.moneyList[index]).toLocaleString()}원
                    </Text12>
                    <ArrowRight01Icon size={24} color="var(--grey8)" />
                </FlexE>
            </FlexB>
        );
    };

    const TotalCost = (number) => {
        let totalCost = 0;
        for (let i of userInfo.moneyList) {
            totalCost += +i;
        }
        return (totalCost * number).toLocaleString();
    };

    return (
        <>
            {loading ? (
                <LoadingPopup>정보를 불러오는 중..</LoadingPopup>
            ) : (
                <>
                    <HeaderOfUser userInfo={userInfo} />
                    {TotalCost(1) !== "0" && (
                        <PositionFixed $top={"4rem"}>
                            <Text12 $grey $light $margin={"1rem 0 0"}>
                                아낄 수 있는 돈
                            </Text12>
                            <Flex $align={"baseline"} $gap={"0.3rem"}>
                                <Text20>총</Text20>
                                <Text36 $awesome>{TotalCost(1)}</Text36>
                                <Text20>원</Text20>
                            </Flex>
                            <Text12 $grey $light $margin={"0 0 1rem"}>
                                이 돈 한달 아끼면 {TotalCost(30)} 원
                            </Text12>
                        </PositionFixed>
                    )}
                    <Content
                        $padding={
                            TotalCost(1) !== "0"
                                ? "10rem 1.5rem 11rem"
                                : "4rem 1.5rem 11rem"
                        }
                    >
                        {TotalCost(1) === "0" ? (
                            <>
                                <Text12 $grey $light $margin={"1rem 0 1rem"}>
                                    쓰지 않으면 아낄 수 있는 돈을 목표로
                                    만들어보세요.
                                </Text12>
                                <Box1>
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
                            </>
                        ) : (
                            <>
                                {userInfo.itemList
                                    .slice()
                                    .reverse()
                                    .map((item, index) => (
                                        <Box2
                                            key={
                                                userInfo.itemList.length -
                                                1 -
                                                index
                                            }
                                            $width={"100%"}
                                            $margin={"0.5rem 0"}
                                            $Bg={
                                                ((index % 2 === 0 &&
                                                    userInfo.itemList.length %
                                                        2 ===
                                                        0) ||
                                                    (index % 2 === 1 &&
                                                        userInfo.itemList
                                                            .length %
                                                            2 ===
                                                            1)) &&
                                                "var(--grey1)"
                                            }
                                        >
                                            <CostItem
                                                item={item}
                                                index={
                                                    userInfo.itemList.length -
                                                    1 -
                                                    index
                                                }
                                            />
                                        </Box2>
                                    ))}
                            </>
                        )}
                    </Content>
                    {TotalCost(1) !== "0" && (
                        <PositionFixed $bottom={"7rem"}>
                            <Flex>
                                <BtnAdd
                                    onClick={() => navigate("/plan/create")}
                                >
                                    수정
                                </BtnAdd>
                            </Flex>
                        </PositionFixed>
                    )}
                </>
            )}
        </>
    );
}
