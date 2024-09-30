import Loading from "../components/ui/organisms/Loading";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { Content } from "../components/ui/molecules/CustomDisplay";
import ModeSettings from "../components/pages/setting/ModeSettings";
import UserSettings from "../components/pages/setting/UserSettings";
import AppInformations from "../components/pages/setting/AppInformations";
import LogoutBox from "../components/pages/setting/LogoutBox";

export default function SettingPage() {
    const { userInfo, loading } = useGetUserInfo();

    return (
        <>
            {loading ? (
                <Loading>정보를 불러오는 중..</Loading>
            ) : (
                <Content $padding={"1.5rem 1.5rem 6rem"}>
                    <UserSettings userInfo={userInfo} />
                    <ModeSettings />
                    <AppInformations />
                    <LogoutBox />
                </Content>
            )}
        </>
    );
}
