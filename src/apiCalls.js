import { Octokit } from '@octokit/core';
import { findLastPageNumber } from './utils/helpers';

const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_TOKEN });

export const detailsOfRepo = async (owner, repo) => {
  try {
    const detailsApi = await octokit.request('GET /repos/{owner}/{repo}', {
      owner: owner,
      repo: repo,
    });
    const { data = {} } = detailsApi || {};
    return data || {};
  } catch (error) {
    return error;
  }
};

export const languageJSON = async (owner, repo) => {
  try {
    const languagesApi = await octokit.request(
      'GET /repos/{owner}/{repo}/languages',
      {
        owner: owner,
        repo: repo,
      },
    );
    const { data = {} } = languagesApi || {};
    return data || {};
  } catch (error) {
    return error;
  }
};

export const listOfTopics = async (owner, repo) => {
  try {
    const topicsApi = await octokit.request(
      'GET /repos/{owner}/{repo}/topics',
      {
        owner: owner,
        repo: repo,
      },
    );
    const { data: { names = {} } = {} } = topicsApi || {};
    return names || {};
  } catch (error) {
    return error;
  }
};

export const findNameByLogin = async (login) => {
  try {
    const userApi = await octokit.request('GET /users/{username}', {
      username: login,
    });
    const { data = {} } = userApi || {};
    let ownerName = data.name ?? login;
    return ownerName;
  } catch (error) {
    return error;
  }
};

export const listOfContributors = async (owner, repo) => {
  try {
    const contributorsApi = await octokit.request(
      'GET /repos/{owner}/{repo}/contributors',
      {
        owner: owner,
        repo: repo,
      },
    );
    const { data = {} } = contributorsApi || {};
    return data || {};
  } catch (error) {
    return error;
  }
};

export const listOfContributorsNames = async (owner, repo) => {
  try {
    const contributors = await listOfContributors(owner, repo);
    const names = await Promise.all(
      contributors.map(async (contributor) => {
        let name = await findNameByLogin(contributor.login);
        return name;
      }),
    );
    return names || {};
  } catch (error) {
    return error;
  }
};

export const getRepositoriesData = async (q, currentPage, sort) => {
  try {
    const repositoriesApi = await octokit.request('GET /search/repositories', {
      q: q,
      per_page: 7,
      page: currentPage,
      sort: sort.params,
      order: sort.order,
    });
    const {
      data: { items = {} },
      headers: { link = {} } = {},
    } = repositoriesApi || {};
    const lastPageNumber = findLastPageNumber(link);
    let listOfRepositories = {};
    if (items.length > 0) {
      listOfRepositories = items.map(
        ({
          id,
          name,
          forks,
          stargazers_count: stars,
          owner: { login, avatar_url },
        }) => ({ id, name, forks, stars, owner: { login, avatar_url } }),
      );
    }
    return { listOfRepositories, lastPageNumber } || {};
  } catch (error) {
    return error;
  }
};

export const getRepositoriesFromApi = async (q, currentPage, sort) => {
  try {
    const repoData = await getRepositoriesData(q, currentPage, sort);
    const repositories = await Promise.all(
      repoData.listOfRepositories.map(async (repository) => {
        let ownerName = await findNameByLogin(repository.owner.login);
        ownerName = ownerName ?? repository.owner.login;
        return {
          ...repository,
          ownerName,
        };
      }),
    );
    return { repositories, lastPage: repoData.lastPageNumber } || {};
  } catch (error) {
    return error;
  }
};
