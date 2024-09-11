import React from "react";
import { Text12 } from "../../ui/atoms/CustomText";
import { PosSL } from "../../ui/molecules/CustomPosition";

// 버전을 표시하는 컴포넌트
const Version = React.memo(() => {
    return (
        <PosSL>
            <Text12 $margin={"0 1rem"} $grey>
                Ver.0.2.8
            </Text12>
        </PosSL>
    );
});

export default Version;
