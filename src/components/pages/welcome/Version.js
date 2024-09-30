import React from "react";
import { Text12 } from "../../ui/atoms/CustomText";
import { PosSL, PosSR } from "../../ui/molecules/CustomPosition";

// 버전을 표시하는 컴포넌트
const Version = React.memo(() => {
    return (
        <>
            <PosSL>
                <Text12 $margin={"0 1rem"} $grey>
                    Ver.0.3.12
                </Text12>
            </PosSL>
            <PosSR>
                <Text12 $margin={"0 1rem"}>참참참 소개</Text12>
            </PosSR>
        </>
    );
});

export default Version;
