import React from "react";
import Loading from "../components/Loading";
import { PosRela } from "../components/ui/molecules/CustomPosition";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    const { userInfo, loading } = useGetUserInfo();

    return (
        <PosRela>
            {loading ? (
                <Loading>
                    잠만요 서버 느린점 양해 부탁. <br />님 정보 불러오는중임
                </Loading>
            ) : (
                <div>
                    <div>
                        <div>{userInfo.nickname} </div>
                        <div>
                            Lv.{userInfo.level} &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
                            {userInfo.point} P
                        </div>
                    </div>
                    <>
                        <div>
                            우선 {userInfo.nickname}님의 과소비되는 목록부터
                            적어줘
                        </div>
                        <div onClick={() => navigate("/diary")}>달력</div>
                        <button onClick={() => navigate("/plan")}>
                            소비목록 적으러가기
                        </button>
                    </>
                </div>
            )}
        </PosRela>
    );
}
