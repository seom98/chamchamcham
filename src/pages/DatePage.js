import { useParams } from "react-router";
// import { useNavigate } from "react-router-dom";
import {
    Content,
    Flex,
    PosRela,
} from "../components/ui/molecules/CustomPosition";
import { Text12, Text16, Text30 } from "../components/ui/atoms/CustomText";
import DateHeader from "../components/ui/organisms/DateHeader";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import Loading from "../components/Loading";

export default function DatePage() {
    //   const navigate = useNavigate();
    const { date } = useParams();
    const { userInfo, loading } = useGetUserInfo();

    const [, month, day] = date.split("-").map((e) => +e);

    const settings = {
        lazyLoad: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
    };
    return (
        <PosRela>
            {loading ? (
                <Loading>정보를 불러오는 중..</Loading>
            ) : (
                <>
                    <DateHeader day={day} month={month} />
                    <Content>
                        <Text12 $light>
                            {month}월 {day}일 에 아낀돈{" "}
                        </Text12>
                        <Flex $align={"baseline"} $gap={"0.3rem"}>
                            <Text30 $awesome $margin={"0 0 1rem"}>
                                23
                            </Text30>
                            <Text16> 원</Text16>
                        </Flex>
                    </Content>
                </>
            )}
        </PosRela>
    );
}
