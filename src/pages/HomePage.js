import React from "react";
import LoadingPopup from "../components/ui/organisms/LoadingPopup";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useInitialLoad } from "../hooks/useInitialLoad";
import { Content } from "../components/ui/atoms/CustomDisplay";
import UserHeader from "../components/ui/organisms/UserHeader";
import GoalSettingBox from "../components/pages/home/GoalSettingBox";

export default function HomePage() {
    const { userInfo, loading } = useGetUserInfo();
    useInitialLoad();

    return (
        <>
            {loading ? (
                <LoadingPopup>정보를 불러오는 중..</LoadingPopup>
            ) : (
                <>
                    <UserHeader userInfo={userInfo} />
                    <Content>
                        <GoalSettingBox />
                    </Content>
                </>
            )}
        </>
    );
}
