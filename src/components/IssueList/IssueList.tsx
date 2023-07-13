import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Advertisement from "../Advertisement/Advertisement";
import Loading from "../Loading/Loading";
import ErrorPage from "../Error/ErrorPage";

interface IssueList {
    id: number;
    number: number;
    title: string;
    user: {
        login: string;
    };
    created_at: string;
    comments: number;
}

interface SystemError {
    code: string;
    message: string;
}

const IssueList: React.FC = () => {
    const [issues, setIssues] = useState<IssueList[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastIssueRef = useRef<HTMLLIElement | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const accessToken: string | undefined = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
                const owner: string | undefined = process.env.REACT_APP_GITHUB_ORGANIZATION_NAME;
                const repo: string | undefined = process.env.REACT_APP_GITHUB_REPOSITORY_NAME;

                if (!accessToken || !owner || !repo) {
                    throw new Error("GitHub access token or organization/repository name is not provided.");
                }

                const perPage = 5; // 한 페이지당 가져올 이슈 개수
                const url: string = `https://api.github.com/repos/${owner}/${repo}/issues`;
                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                };

                const params = {
                    state: "open",
                    sort: "comments",
                    direction: "desc",
                    per_page: perPage,
                    page,
                };

                const response = await axios.get<IssueList[]>(url, { headers, params });

                const newIssues = response.data;

                if (newIssues.length === 0) {
                    setHasMore(false);
                    return;
                }

                setIssues((prevIssues) => [...prevIssues, ...newIssues]);
                setLoading(false);
            } catch (error) {
                const err = error as SystemError;
                setError(err.message);
                setLoading(false);
            }
        };

        fetchIssues();
    }, [page]);

    useEffect(() => {
        if (!loading && hasMore && lastIssueRef.current) {
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            });

            observer.current.observe(lastIssueRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [loading, hasMore]);

    const handleIssueClick = (issueNumber: number) => {
        // 이슈 상세 페이지로 이동
        console.log(`Navigating to issue ${issueNumber}`);
        navigate(`/issues/${issueNumber}`);
    };

    if (loading && issues.length === 0) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage errorContent={error} />;
    }

    return (
        <div>
            <StyledList>
                {issues.map((issue: IssueList, index: number) => (
                    <React.Fragment key={issue.id}>
                        <StyledListItem onClick={() => handleIssueClick(issue.number)}>
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
                            <CommentCount>코멘트 : {issue.comments}</CommentCount>
                        </StyledListItem>
                        {index % 5 === 4 && (
                            <StyledListAd>
                                <a href="https://www.wanted.co.kr/">
                                    <Advertisement />
                                </a>
                            </StyledListAd>
                        )}
                    </React.Fragment>
                ))}
                {loading && <div>Loading more issues...</div>}
                <li ref={lastIssueRef}></li>
            </StyledList>
        </div>
    );
};

const StyledList = styled.ul`
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const StyledListItem = styled.li`
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    gap: 10px;
    padding-bottom: 15px;
    border-bottom: 1px solid lightgray;
`;

const StyledListAd = styled.li`
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: nowrap;
    gap: 10px;
    padding-bottom: 15px;
    border-bottom: 1px solid lightgray;
`;

const IssueInfo = styled.span`
    display: flex;
    gap: 5px;
    flex-direction: column;
`;

const CommentCount = styled.span`
    flex-shrink: 0;
`;

export default IssueList;
