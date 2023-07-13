import React from "react";
import { styled } from "styled-components";

const Header = () => {
    return (
        <StyledHeader>
            <h1>
                {process.env.REACT_APP_GITHUB_ORGANIZATION_NAME} / {process.env.REACT_APP_GITHUB_REPOSITORY_NAME}
            </h1>
        </StyledHeader>
    );
};

export default Header;

const StyledHeader = styled.div`
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 1;
    text-align: center;
    padding: 5px 0;
    border-bottom: 1px solid lightgray;
`;
