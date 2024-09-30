import LoadingPopup from "../components/ui/organisms/LoadingPopup";
import HeaderOfUser from "../components/ui/organisms/HeaderOfUser";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { Content } from "../components/ui/atoms/CustomDisplay";
import MonthlySavingTitle from "../components/pages/calendar/MonthlySavingTitle";
import MonthlyMovement from "../components/pages/calendar/MonthlyMovement";
import WeekFrame from "../components/pages/calendar/WeekFrame";
import DateFrame from "../components/pages/calendar/DateFrame";
import ElementDescription from "../components/pages/calendar/ElementDescription";

export default function CalendarPage() {
    // 현재 날짜 가져오기 및 상태 설정
    const { userInfo, loading } = useGetUserInfo();

    return (
        <>
            {loading ? (
                <LoadingPopup>정보를 불러오는 중..</LoadingPopup>
            ) : (
                <>
                    <HeaderOfUser userInfo={userInfo} />
                    <Content $padding={"4rem 1.5rem 10rem"}>
                        <MonthlySavingTitle />
                        <MonthlyMovement />
                        <WeekFrame />
                        <DateFrame />
                        <ElementDescription />
                    </Content>
                </>
            )}
        </>
    );
}
