import styled, { css } from "styled-components";
import { Flex } from "../../ui/atoms/CustomDisplay";
import { Text12 } from "../../ui/atoms/CustomText";

const Cycle = styled.div`
    height: 1rem;
    width: 1rem;
    border-radius: 0.5rem;
    ${(props) =>
        props.$blue &&
        css`
            background-color: var(--skyblue);
            box-shadow: 0 2px 25px 0 var(--shadow1);
        `};
    ${(props) =>
        props.$yellow &&
        css`
            background-color: var(--yellow);
            box-shadow: 0 2px 25px 0 var(--shadow1);
        `};
    ${(props) =>
        props.$red &&
        css`
            background-color: var(--pink);
            box-shadow: 0 2px 25px 0 var(--shadow1);
        `};
`;

// 각각의 색이 무엇을 의미하는지 적어둔 설명 부분
const ElementDescription = () => {
    return (
        <Flex $gap={"2.5rem"}>
            <Flex $gap={"1rem"}>
                <Cycle $blue />
                <Text12 $light>성공</Text12>
            </Flex>
            <Flex $gap={"1rem"}>
                <Cycle $yellow />
                <Text12 $light>부분성공</Text12>
            </Flex>
            <Flex $gap={"1rem"}>
                <Cycle $red />
                <Text12 $light>실패</Text12>
            </Flex>
        </Flex>
    );
};
export default ElementDescription;
