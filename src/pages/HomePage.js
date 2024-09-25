import React from "react";
import Loading from "../components/ui/organisms/Loading";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useInitialLoad } from "../hooks/useInitialLoad";
import { Content } from "../components/ui/molecules/CustomDisplay";
import UserHeader from "../components/ui/organisms/UserHeader";
import GoalSettingBox from "../components/pages/home/GoalSettingBox";

export default function HomePage() {
    const { userInfo, loading } = useGetUserInfo();
    useInitialLoad();

    return (
        <>
            {loading ? (
                <Loading>정보를 불러오는 중..</Loading>
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
