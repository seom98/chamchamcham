import {
    Cancel01Icon,
    CancelSquareIcon,
    GeometricShapes01Icon,
} from "hugeicons-react";
import { Box1, Box2 } from "../components/ui/atoms/CustomBox";
import { IptNor } from "../components/ui/atoms/CustomInput";
import {
    Text12,
    Text16,
    Text20,
    Text25,
    Text36,
} from "../components/ui/atoms/CustomText";
import {
    Content,
    Flex,
    FlexB,
    FlexE,
    PosRela,
    PosSti,
} from "../components/ui/molecules/CustomPosition";
import PlanHeader from "../components/ui/organisms/PlanHeader";
import { useState } from "react";

export default function PlanCreatePage() {
    const [itemList, setItemList] = useState([]); // 아이템 리스트
    const [moneyList, setMoneyList] = useState([]); // 금액 리스트
    const [itemName, setItemName] = useState(""); // 입력된 아이템 이름
    const [itemCost, setItemCost] = useState(""); // 입력된 금액
    const [totalCost, setTotalCost] = useState(0); // 총 금액

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
    return (
        <PosRela>
            <PlanHeader />
            <Content>
                <Flex $align={"baseline"} $gap={"0.3rem"}>
                    <Text20>총</Text20>
                    <Text36 $awesome $margin={"0 0 1rem"}>
                        {totalCost}
                    </Text36>
                    <Text20>원</Text20>
                </Flex>
                {itemList.length === 0 && (
                    <Box1>
                        <Text16 $margin={"1rem 0 0"}>
                            하루에 낭비된다고 생각하는
                        </Text16>
                        <Text16 $margin={"0 0 1rem"}>
                            항목들을 추가해보세요~!
                        </Text16>
                        <Text12 $light>{"예시)"}</Text12>
                        <Box2>
                            <FlexB>
                                <Text12 $light>간식</Text12>
                                <Text12>3,000원</Text12>
                            </FlexB>
                        </Box2>
                        <Box2>
                            <FlexB>
                                <Text12 $light>술</Text12>
                                <Text12>12,000원</Text12>
                            </FlexB>
                        </Box2>
                    </Box1>
                )}
                {itemList.map((item, index) => (
                    <Box2
                        key={index}
                        $width={"100%"}
                        $margin={"0.5rem"}
                        $Bg={index % 2 === 0 && "var(--grey1)"}
                    >
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
                    </Box2>
                ))}
            </Content>
            <PosSti>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addItem();
                    }}
                >
                    <button type="submit">추가</button>
                    <IptNor
                        type="text"
                        placeholder="항목을 입력해주세요."
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    >
                        <GeometricShapes01Icon
                            size={24}
                            color={itemName ? "var(--grey8)" : "var(--grey5)"}
                        />
                        <Cancel01Icon
                            size={24}
                            color={itemName ? "var(--grey8)" : "transparent"}
                            onClick={() => setItemName("")}
                        />
                    </IptNor>
                    <IptNor
                        type="number"
                        placeholder="얼마인가요?"
                        inputMode="numeric"
                        value={itemCost}
                        onChange={(e) => setItemCost(e.target.value)}
                        required
                    >
                        <Text25 $grey={!itemCost}>₩</Text25>
                        <Cancel01Icon
                            size={24}
                            color={itemCost ? "var(--grey8)" : "transparent"}
                            onClick={() => setItemCost("")}
                        />
                    </IptNor>
                </form>
            </PosSti>
        </PosRela>
    );
}
