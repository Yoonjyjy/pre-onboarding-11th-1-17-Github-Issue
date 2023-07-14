import React from "react";
import styled from "styled-components";

const Layout = ({ children }: any) => {
    return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
    width: 600px;
    height: 80vh;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    overflow: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 20px;
`;
