import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import Loading from "../Loading/Loading";
import ErrorPage from "../Error/ErrorPage";
import { createContext } from "react";
const ErrorContext = createContext("");

interface Issue {
    id: number;
    number: number;
    title: string;
    user: {
        login: string;
        avatar_url: string;
    };
    created_at: string;
    comments: number;
    body: string;
}

interface SystemError {
    code: string;
    message: string;
}

const IssueDetail: React.FC = () => {
    const { issueNumber } = useParams<{ issueNumber: string }>();
    const [issue, setIssue] = useState<Issue | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIssue = async () => {
            try {
                const accessToken: string | undefined = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
                const owner: string | undefined = process.env.REACT_APP_GITHUB_ORGANIZATION_NAME;
                const repo: string | undefined = process.env.REACT_APP_GITHUB_REPOSITORY_NAME;

                if (!accessToken || !owner || !repo || !issueNumber) {
                    throw new Error("GitHub access token, organization/repository name, or issue number is not provided.");
                }

                const url: string = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;
                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                };

                const response = await axios.get<Issue>(url, { headers });
                setIssue(response.data);
                setLoading(false);
            } catch (error) {
                const err = error as SystemError;
                setError(err.message);
                setLoading(false);
            }
        };

        fetchIssue();
    }, [issueNumber]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage errorContent={error} />;
    }

    if (!issue) {
        return <div>Issue not found</div>;
    }

    return (
        <div>
            <IssueDetailContainer>
                <UserAvatar src={issue.user.avatar_url} alt={issue.user.login} />
                <StyledIssueInfo>
                    <IssueInfo>
                        <div>
                            <b>#{issue.number} </b>
                            <b>{issue.title}</b>
                        </div>
                        <div>
                            <span>작성자: {issue.user.login} </span>
                            <span>작성일: {issue.created_at}</span>
                        </div>
                    </IssueInfo>
                    <CommentCount>코멘트: {issue.comments}</CommentCount>
                </StyledIssueInfo>
            </IssueDetailContainer>
            <BodyContainer>
                <ReactMarkdown>{issue.body}</ReactMarkdown>
            </BodyContainer>
        </div>
    );
};

export default IssueDetail;

const IssueDetailContainer = styled.div`
    display: flex;
    align-items: center;
`;

const UserAvatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
`;

const IssueInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    gap: 5px;
`;

const IssueNumber = styled.span`
    font-weight: bold;
`;

const IssueTitle = styled.span`
    margin-top: 5px;
`;

const AuthorInfo = styled.div`
    display: flex;
    margin-top: 5px;
`;

const CommentCount = styled.span`
    flex-shrink: 0;
`;

const BodyContainer = styled.div`
    margin-top: 10px;
`;

const StyledIssueInfo = styled.div`
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    gap: 10px;
    padding: 15px;
    border-bottom: 1px solid lightgray;
    width: 100%;
`;
