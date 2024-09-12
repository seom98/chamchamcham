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
    Content,
    Flex,
    FlexB,
    FlexCC,
    FlexE,
    PosEC,
    PosRela,
} from "../components/ui/molecules/CustomPosition";
import PlanHeader from "../components/ui/organisms/PlanHeader";
import { useState } from "react";
import Explanation from "../components/pages/PlanCreate/Explanation";
import { BtnAdd } from "../components/ui/atoms/CustomButton";
import Loading from "../components/Loading";

export default function PlanCreatePage() {
    const [itemList, setItemList] = useState([]); // 아이템 리스트
    const [moneyList, setMoneyList] = useState([]); // 금액 리스트
    const [itemName, setItemName] = useState(""); // 입력된 아이템 이름
    const [itemCost, setItemCost] = useState(""); // 입력된 금액
    const [totalCost, setTotalCost] = useState(0); // 총 금액
    const [loading, setLoading] = useState(false); // 로딩

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

    function CostItem({ item, index }) {
        return (
            <FlexB $align={"center"}>
                <Text12 $light>{item}</Text12>
                <FlexE>
                    <Text12>{moneyList[index]}원</Text12>
                    <CancelSquareIcon
                        size={24}
                        color="var(--red)"
                        onClick={() => deleteItem(index)}
                    />
                </FlexE>
            </FlexB>
        );
    }

    return (
        <>
            <PlanHeader
                itemList={itemList}
                moneyList={moneyList}
                setLoading={setLoading}
            />
            <PosRela>
                <Content $padding={"4rem 2.5rem 16rem"}>
                    <Flex $align={"baseline"} $gap={"0.3rem"}>
                        <Text20>총</Text20>
                        <Text36 $awesome $margin={"0 0 1rem"}>
                            {totalCost}
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
                                $Bg={index % 2 === 1 && "var(--grey1)"}
                            >
                                <CostItem
                                    item={item}
                                    index={itemList.length - 1 - index}
                                />
                            </Box2>
                        ))}
                </Content>
            </PosRela>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addItem();
                }}
            >
                <PosEC>
                    <PosRela $height="0.5rem" $zIndex="5">
                        <BackBox $height={"16.5rem"}></BackBox>
                    </PosRela>
                    <PosRela $height="4.5rem" $zIndex="6">
                        <FlexE>
                            <BtnAdd
                                type="submit"
                                $bgColor={
                                    (!itemName || !itemCost) && "var(--grey3)"
                                }
                            >
                                추가
                            </BtnAdd>
                        </FlexE>
                    </PosRela>
                    <PosRela $height="9rem" $zIndex="6">
                        <IptNor
                            type="text"
                            placeholder="항목을 입력해주세요."
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            required
                        >
                            <GeometricShapes01Icon
                                size={24}
                                color={
                                    itemName ? "var(--grey8)" : "var(--grey5)"
                                }
                            />
                            <Cancel01Icon
                                size={24}
                                color={
                                    itemName ? "var(--grey8)" : "transparent"
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
                            onChange={(e) => setItemCost(e.target.value)}
                            required
                        >
                            <Text25 $grey={!itemCost}>₩</Text25>
                            <Cancel01Icon
                                size={24}
                                color={
                                    itemCost ? "var(--grey8)" : "transparent"
                                }
                                onClick={() => setItemCost("")}
                            />
                        </IptNor>
                    </PosRela>
                </PosEC>
            </form>
            {loading && (
                <FlexCC>
                    <Loading>목표를 생성하는중..</Loading>
                </FlexCC>
            )}
        </>
    );
}
