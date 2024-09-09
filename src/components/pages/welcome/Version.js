import React from "react";
import { Text12 } from "../../ui/atoms/CustomText";
import { PositionStart } from "../../ui/molecules/CustomPosition";

const Version = React.memo(() => {
    return (
        <PositionStart>
            <Text12 $margin={"0 1rem"} $grey>
                Ver.0.2.4.1
            </Text12>
        </PositionStart>
    );
});

export default Version;
