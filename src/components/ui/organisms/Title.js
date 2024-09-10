import React from "react";
import { Text16, Text36 } from "../atoms/CustomText";

// 타이틀 컴포넌트
const Title = React.memo(({ margin = "15rem" }) => {
    return (
        <div>
            <Text16 $grey $light>
                아무 것도 하지 않고
            </Text16>
            <Text16 $grey $light>
                돈을 버는 아주 쉬운 방법
            </Text16>
            <Text36 $awesome $margin={`1rem 1rem ${margin}`}>
                참고 참고 참기!
            </Text36>
        </div>
    );
});

export default Title;
