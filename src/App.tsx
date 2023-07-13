import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import IssueList from "./components/IssueList/IssueList";
import IssueDetail from "./components/IssueDetail/IssueDetail";
import Layout from "./components/Layout/Layout";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Header />
                <Routes>
                    <Route path="/" element={<IssueList />} />
                    <Route path="/issues" element={<IssueList />} />
                    <Route path="/issues/:issueNumber" element={<IssueDetail />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
