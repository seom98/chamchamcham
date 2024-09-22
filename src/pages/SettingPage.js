import s from "./SettingPage.module.css";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useAccount } from "../hooks/useAccount";
import { Box1 } from "../components/ui/atoms/CustomBox";
import {
    ArrowRight01Icon,
    Logout03Icon,
    Setting07Icon,
    UserCircleIcon,
} from "hugeicons-react";
import Loading from "../components/ui/organisms/Loading";
import { Text12, Text16, Text25 } from "../components/ui/atoms/CustomText";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { BtnNor } from "../components/ui/atoms/CustomButton";
import styled from "styled-components";
import {
    Content,
    FlexB,
    FlexS,
} from "../components/ui/molecules/CustomDisplay";

const LevelWrapper = styled.div`
    margin-top: 1rem;
    width: 100%;
    height: 30px;
    background-color: var(--grey3);
    border-radius: 15px;
    padding: 3px;
    position: relative;
`;
const LevelBar = styled.div`
    width: ${(props) => props.$width || "24px"};
    min-width: 24px;
    max-width: 100%;
    height: 24px;
    background-color: var(--grey1);
    border-radius: 12px;
    padding: 3px;
`;
const Level = styled.div`
    position: absolute;
    right: 1rem;
    top: 7px;
`;

export default function SettingPage() {
    const { logout } = useAccount(); //로그인 커스텀 훅을 가져옴.
    const { userInfo, loading } = useGetUserInfo();
    const [toggle, setToggle] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    useEffect(() => {
        const bgMode = window.localStorage.getItem("bgMode");
        if (bgMode === "dark") {
            setToggle(true);
            document.getElementsByTagName("html")[0].classList.add("dark");
        }
    }, []);
    const darkOnOff = () => {
        setToggle((prev) => !prev);
        if (toggle) {
            document.getElementsByTagName("html")[0].classList.remove("dark");
            window.localStorage.setItem("bgMode", "light");
        } else {
            document.getElementsByTagName("html")[0].classList.add("dark");
            window.localStorage.setItem("bgMode", "dark");
        }
    };
    return (
        <>
            {loading ? (
                <Loading>정보를 불러오는 중..</Loading>
            ) : (
                <>
                    <Content $padding={"1.5rem 1.5rem 6rem"}>
                        <Box1>
                            <BtnNor>
                                <FlexB $gap={"1rem"}>
                                    <UserCircleIcon
                                        size={55}
                                        color="var(--grey8)"
                                    />
                                    <FlexS>
                                        <Text25>{userInfo.nickname}</Text25>
                                        <Text12>{userInfo.email}</Text12>
                                    </FlexS>
                                    <Setting07Icon
                                        size={24}
                                        color="var(--grey8)"
                                    />
                                </FlexB>
                                <LevelWrapper>
                                    <LevelBar
                                        $width={userInfo.point}
                                    ></LevelBar>
                                    <Level>
                                        <Text16 $light>
                                            Lv. {userInfo.level}
                                        </Text16>
                                    </Level>
                                </LevelWrapper>
                            </BtnNor>
                        </Box1>
                        <Box1>
                            <FlexB $gap={"1rem"} $margin={"0.5rem 1rem 1.5rem"}>
                                <Text16>다크모드</Text16>
                                <label className={s.switch}>
                                    <input
                                        type="checkbox"
                                        onClick={darkOnOff}
                                        checked={toggle}
                                        readOnly
                                    />
                                    <span
                                        className={classNames(
                                            s.slider,
                                            s.round
                                        )}
                                    ></span>
                                </label>
                            </FlexB>
                            <FlexB $gap={"1rem"} $margin={"0.5rem 1rem"}>
                                <Text16>알림설정</Text16>
                                <label className={s.switch}>
                                    <input
                                        type="checkbox"
                                        onClick={() => setToggle2(!toggle2)}
                                        checked={toggle2}
                                        readOnly
                                    />
                                    <span
                                        className={classNames(
                                            s.slider,
                                            s.round
                                        )}
                                    ></span>
                                </label>
                            </FlexB>
                        </Box1>
                        <Box1>
                            <BtnNor>
                                <FlexB $gap={"1rem"}>
                                    <Text16>개인정보 처리방침</Text16>
                                    <ArrowRight01Icon
                                        size={24}
                                        color={"var(--grey8)"}
                                    />
                                </FlexB>
                            </BtnNor>
                            <BtnNor>
                                <FlexB $gap={"1rem"}>
                                    <Text16>이용약관</Text16>
                                    <ArrowRight01Icon
                                        size={24}
                                        color={"var(--grey8)"}
                                    />
                                </FlexB>
                            </BtnNor>
                            <BtnNor>
                                <FlexB $gap={"1rem"}>
                                    <Text16>앱정보</Text16>
                                    <ArrowRight01Icon
                                        size={24}
                                        color={"var(--grey8)"}
                                    />
                                </FlexB>
                            </BtnNor>
                            <BtnNor>
                                <FlexB $gap={"1rem"}>
                                    <Text16>버전</Text16>
                                    <Text12 $light $grey $margin={"0 0.5rem"}>
                                        Ver.0.3.5
                                    </Text12>
                                </FlexB>
                            </BtnNor>
                        </Box1>
                        <Box1>
                            <BtnNor onClick={logout}>
                                <FlexB $gap={"1rem"}>
                                    <Text16 $red>로그아웃</Text16>
                                    <Logout03Icon
                                        size={24}
                                        color={"var(--red)"}
                                    />
                                </FlexB>
                            </BtnNor>
                        </Box1>
                    </Content>
                </>
            )}
        </>
    );
}
