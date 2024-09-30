import Lottie from "lottie-react";
import loadingLottie from "../../../assets/lottie/loading2.json";
import styled from "styled-components";
import { Text16 } from "../atoms/CustomText";

const LoadingContainer = styled.div`
    position: fixed;
    top: 35%;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;
const StyledLottie = styled(Lottie)`
    width: 5rem;
`;

const LoadingPopup = ({ children }) => {
    return (
        <LoadingContainer>
            <StyledLottie animationData={loadingLottie} />
            <Text16>{children}</Text16>
        </LoadingContainer>
    );
};

export default LoadingPopup;
