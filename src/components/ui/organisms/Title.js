import { Text16, Text36 } from "../atoms/CuntomText";

export default function Title() {
    return (
        <div>
            <Text16 $grey $light>
                아무 것도 하지 않고
            </Text16>
            <Text16 $grey $light>
                돈을 버는 아주 쉬운 방법
            </Text16>
            <Text36 $awesome $margin={"1rem 1rem 15rem"}>
                참고 참고 참기!
            </Text36>
        </div>
    );
}
