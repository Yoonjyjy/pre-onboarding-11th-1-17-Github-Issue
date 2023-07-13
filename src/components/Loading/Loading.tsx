import React from "react";
import styled from "styled-components";
import LoadingImage from "./Loading.svg";

const Loading = () => (
    <LoadingContainer>
        <Image src={LoadingImage} alt="Loading" />
    </LoadingContainer>
);

export default Loading;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const Image = styled.img`
    width: 20%;
    height: 20%;
`;
