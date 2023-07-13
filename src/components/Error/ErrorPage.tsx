import React from "react";
import styled from "styled-components";

interface ErrorPageProps {
    errorContent: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorContent }) => (
    <ErrorContainer>
        <h1>Error!</h1>
        <h3>오류가 발생하였습니다.</h3>
        <span>{errorContent}</span>
        <h5>
            <a href="/">메인으로 돌아가기</a>
        </h5>
    </ErrorContainer>
);

export default ErrorPage;

const ErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    flex-direction: column;
`;
