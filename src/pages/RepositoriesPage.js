import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Octokit } from '@octokit/core';
import '../styles/RepositoriesPage.css';

const RepositoriesPage = () => {
  const navigate = useNavigate();

  const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_TOKEN });
  const [q, setQ] = useState('');
  const [repositories, setRepositories] = useState({});
  const [activeRow, setActiveRow] = useState(false);

  const handleClick = (e, repository) => {
    navigate('/repository-details', {
      state: { owner: repository.ownerName, repo: repository.name },
    });
  };

  const getRepositoriesData = async () => {
    try {
      const response = await octokit.request('GET /search/repositories', {
        q: q,
      });
      let listOfRepositories = response.data.items.map(
        ({
          id,
          name,
          forks,
          stargazers_count: stars,
          owner: { login, avatar_url },
        }) => ({ id, name, forks, stars, owner: { login, avatar_url } }),
      );
      let repositoriesData = await Promise.all(
        listOfRepositories.map(async (repository) => {
          let ownerName = repository.owner.login;
          try {
            const response = await octokit.request('GET /users/{username}', {
              username: repository.owner.login,
            });
            ownerName = response.data.name ?? repository.owner.login;
          } catch (error) {
            console.log(error);
          }
          return {
            ...repository,
            ownerName,
          };
        }),
      );
      setRepositories(repositoriesData);
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };

  useEffect(() => {
    if (q.length > 0) {
      getRepositoriesData();
    }
  }, [q]);

  return (
    <>
      <div className='tab'>
        <div className='btn-box'>
          <button onClick={() => setQ('react in:topics is:public')}>
            React
          </button>
          <button onClick={() => setQ('vue in:topics is:public')}> Vue</button>
          <button onClick={() => setQ('angular in:topics is:public')}>
            Angular
          </button>
        </div>
      </div>
      <div className='div-table'>
        {repositories.length > 0 ? (
          <table className='styled-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Stars</th>
                <th>Forks</th>
                <th>Owner</th>
                <th>Avatar</th>
              </tr>
            </thead>
            <tbody>
              {repositories.map((repository) => (
                <tr
                  key={repository.id}
                  onClick={(e) => handleClick(e, repository)}
                  className={activeRow ? 'active-row' : ''}
                >
                  <td>{repository.name}</td>
                  <td>{repository.stars}</td>
                  <td>{repository.forks}</td>
                  <td>{repository.ownerName}</td>
                  <td>
                    <img src={repository.owner.avatar_url} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default RepositoriesPage;
