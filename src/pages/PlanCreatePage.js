import {
    Cancel01Icon,
    CancelSquareIcon,
    GeometricShapes01Icon,
} from "hugeicons-react";
import { BackBox, Box2 } from "../components/ui/atoms/CustomBox";
import { IptNor } from "../components/ui/atoms/CustomInput";
import {
    Text12,
    Text20,
    Text25,
    Text36,
} from "../components/ui/atoms/CustomText";
import {
    PositionRelative,
    PositionFixed,
} from "../components/ui/atoms/CustomPosition";
import PlanHeader from "../components/ui/organisms/PlanHeader";
import { useEffect, useState } from "react";
import Explanation from "../components/pages/planCreate/Explanation";
import { BtnAdd } from "../components/ui/atoms/CustomButton";
import LoadingPopup from "../components/ui/organisms/LoadingPopup";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import {
    Content,
    Flex,
    FlexB,
    FlexCC,
    FlexE,
} from "../components/ui/atoms/CustomDisplay";

export default function PlanCreatePage() {
    const { userInfo, loading } = useGetUserInfo();
    const [itemList, setItemList] = useState(userInfo.itemList); // 아이템 리스트
    const [moneyList, setMoneyList] = useState(userInfo.moneyList); // 금액 리스트
    const [itemName, setItemName] = useState(""); // 입력된 아이템 이름
    const [itemCost, setItemCost] = useState(""); // 입력된 금액
    const [totalCost, setTotalCost] = useState(0); // 총 금액
    const [submitLoading, setSubmitLoading] = useState(false); // 로딩

    // 아이템과 금액을 리스트에 추가하는 함수
    const addItem = () => {
        if (itemName && itemCost) {
            // 입력값이 있을 때만 추가
            setItemList([...itemList, itemName]);
            setMoneyList([...moneyList, itemCost]);
            setTotalCost(+totalCost + +itemCost);
            setItemName(""); // 입력 폼 초기화
            setItemCost(""); // 입력 폼 초기화
        }
    };

    // 리스트에서 아이템을 삭제하는 함수
    const deleteItem = (index) => {
        const newItemList = [...itemList];
        const newMoneyList = [...moneyList];
        setTotalCost(+totalCost - +moneyList[index]);
        newItemList.splice(index, 1);
        newMoneyList.splice(index, 1);
        setItemList(newItemList);
        setMoneyList(newMoneyList);
    };

    const CostItem = ({ item, index }) => {
        return (
            <FlexB $align={"center"}>
                <Text12 $light>{item}</Text12>
                <FlexE $width={"50%"}>
                    <Text12>{(+moneyList[index]).toLocaleString()}원</Text12>
                    <CancelSquareIcon
                        size={24}
                        color="var(--red)"
                        onClick={() => deleteItem(index)}
                    />
                </FlexE>
            </FlexB>
        );
    };

    useEffect(() => {
        let tcost = 0;
        for (let i of userInfo.moneyList) {
            tcost += +i;
        }
        setTotalCost(tcost);
    }, [userInfo.moneyList]);

    return (
        <>
            {loading ? (
                <LoadingPopup>정보를 불러오는 중..</LoadingPopup>
            ) : (
                <>
                    <PlanHeader
                        itemList={itemList}
                        moneyList={moneyList}
                        setLoading={setSubmitLoading}
                    />
                    <PositionRelative>
                        <Content $padding={"4rem 2.5rem 16rem"}>
                            <Flex $align={"baseline"} $gap={"0.3rem"}>
                                <Text20>총</Text20>
                                <Text36 $awesome $margin={"0 0 1rem"}>
                                    {totalCost.toLocaleString()}
                                </Text36>
                                <Text20>원</Text20>
                            </Flex>
                            {itemList.length === 0 && <Explanation />}
                            {itemList
                                .slice()
                                .reverse()
                                .map((item, index) => (
                                    <Box2
                                        key={itemList.length - 1 - index}
                                        $width={"100%"}
                                        $margin={"0.5rem 0"}
                                        $Bg={
                                            ((index % 2 === 0 &&
                                                itemList.length % 2 === 0) ||
                                                (index % 2 === 1 &&
                                                    itemList.length % 2 ===
                                                        1)) &&
                                            "var(--grey1)"
                                        }
                                    >
                                        <CostItem
                                            item={item}
                                            index={itemList.length - 1 - index}
                                        />
                                    </Box2>
                                ))}
                        </Content>
                    </PositionRelative>
                    <PositionFixed $bottom={"1.5rem"}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                addItem();
                            }}
                        >
                            <PositionRelative $height="0.5rem">
                                <BackBox $height={"14.5rem"}></BackBox>
                            </PositionRelative>
                            <PositionRelative $height="3.5rem">
                                <Flex>
                                    <BtnAdd
                                        type="submit"
                                        $bgColor={
                                            (!itemName || !itemCost) &&
                                            "var(--grey3)"
                                        }
                                        $fontcolor={
                                            (!itemName || !itemCost) &&
                                            "var(--grey5)"
                                        }
                                    >
                                        추가
                                    </BtnAdd>
                                </Flex>
                            </PositionRelative>
                            <PositionRelative $height="9rem">
                                <IptNor
                                    type="text"
                                    placeholder="항목을 입력해주세요."
                                    value={itemName}
                                    onChange={(e) =>
                                        setItemName(e.target.value)
                                    }
                                    required
                                >
                                    <GeometricShapes01Icon
                                        size={24}
                                        color={
                                            itemName
                                                ? "var(--grey8)"
                                                : "var(--grey5)"
                                        }
                                    />
                                    <Cancel01Icon
                                        size={24}
                                        color={
                                            itemName
                                                ? "var(--grey8)"
                                                : "transparent"
                                        }
                                        onClick={() => setItemName("")}
                                    />
                                </IptNor>
                                <IptNor
                                    type="number"
                                    placeholder={
                                        itemName
                                            ? `${itemName}에 얼마나 쓰나요?`
                                            : "금액을 적어주세요."
                                    }
                                    inputMode="numeric"
                                    value={itemCost}
                                    onChange={(e) =>
                                        setItemCost(e.target.value)
                                    }
                                    required
                                >
                                    <Text25 $grey={!itemCost}>₩</Text25>
                                    <Cancel01Icon
                                        size={24}
                                        color={
                                            itemCost
                                                ? "var(--grey8)"
                                                : "transparent"
                                        }
                                        onClick={() => setItemCost("")}
                                    />
                                </IptNor>
                            </PositionRelative>
                        </form>
                    </PositionFixed>
                    {submitLoading && (
                        <FlexCC>
                            <LoadingPopup>목표를 생성하는중..</LoadingPopup>
                        </FlexCC>
                    )}
                </>
            )}
        </>
    );
}
