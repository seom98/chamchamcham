import React from "react";
import Loading from "../components/Loading";
import { Content, PosRela } from "../components/ui/molecules/CustomPosition";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import { useInitialLoad } from "../hooks/useInitialLoad";
import UserHeader from "../components/ui/organisms/UserHeader";

export default function HomePage() {
    const navigate = useNavigate();
    const { userInfo, loading } = useGetUserInfo();
    useInitialLoad();

    return (
        <PosRela>
            {loading ? (
                <Loading>정보를 불러오는 중..</Loading>
            ) : (
                <>
                    <UserHeader userInfo={userInfo} />
                    <Content>
                        <button onClick={() => navigate("/plan")}>
                            소비목록 적으러가기
                        </button>
                    </Content>
                </>
            )}
        </PosRela>
    );
}
