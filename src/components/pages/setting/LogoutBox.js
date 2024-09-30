import { Logout03Icon } from "hugeicons-react";
import { Box1 } from "../../ui/atoms/CustomBox";
import { BtnNor } from "../../ui/atoms/CustomButton";
import { Text16 } from "../../ui/atoms/CustomText";
import { FlexB } from "../../ui/molecules/CustomDisplay";
import { useAccount } from "../../../hooks/useAccount";

const LogoutBox = () => {
    const { handleLogout } = useAccount(); //로그인 커스텀 훅을 가져옴.
    return (
        <Box1>
            <BtnNor onClick={handleLogout}>
                <FlexB $gap={"1rem"}>
                    <Text16 $red>로그아웃</Text16>
                    <Logout03Icon size={24} color={"var(--red)"} />
                </FlexB>
            </BtnNor>
        </Box1>
    );
};

export default LogoutBox;
