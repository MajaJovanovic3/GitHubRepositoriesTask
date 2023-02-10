import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Octokit } from '@octokit/core';

const RepositoryDetailsPage = () => {
  const { state } = useLocation();

  const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_TOKEN });

  useEffect(() => {
    const getDatas = async () => {
      const response = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: state.owner,
        repo: state.repo,
      });
    };
    getDatas();
  }, []);
  return <h2>Repository details page</h2>;
};

export default RepositoryDetailsPage;
