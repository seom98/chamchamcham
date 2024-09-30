import { Setting07Icon, UserCircleIcon } from "hugeicons-react";
import { Box1 } from "../../ui/atoms/CustomBox";
import { BtnNor } from "../../ui/atoms/CustomButton";
import { FlexB, FlexS } from "../../ui/atoms/CustomDisplay";
import { Text12, Text16, Text25 } from "../../ui/atoms/CustomText";
import { Level, LevelBar, LevelWrapper } from "./LevelBarStyles";

const UserSettings = ({ userInfo }) => {
    return (
        <Box1>
            <BtnNor>
                <FlexB $gap={"1rem"}>
                    <UserCircleIcon size={55} color="var(--grey8)" />
                    <FlexS>
                        <Text25>{userInfo.nickname}</Text25>
                        <Text12>{userInfo.email}</Text12>
                    </FlexS>
                    <Setting07Icon size={24} color="var(--grey8)" />
                </FlexB>
                <LevelWrapper>
                    <LevelBar $width={userInfo.point}></LevelBar>
                    <Level>
                        <Text16 $light>Lv. {userInfo.level}</Text16>
                    </Level>
                </LevelWrapper>
            </BtnNor>
        </Box1>
    );
};

export default UserSettings;
