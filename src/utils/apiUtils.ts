import React from "react";
import axios from "axios";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const repoOwner = "facebook";
const repo = "react";

export const getIssueList = async () => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repo}/issues`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(String(error));
    }
};

export const getIssue = async (issueNumber: number) => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repo}/issues/${issueNumber}`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(String(error));
    }
};
