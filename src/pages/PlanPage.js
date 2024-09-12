import React from "react";
// import { useNavigate } from "react-router-dom";
import { PosRela } from "../components/ui/molecules/CustomPosition";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import UserHeader from "../components/ui/organisms/UserHeader";

export default function PlanPage() {
    // const navigate = useNavigate();
    const { userInfo } = useGetUserInfo();

    return (
        <PosRela>
            <UserHeader userInfo={userInfo} />
        </PosRela>
    );
}
