import React, { useState, useEffect } from 'react';
import { getRepositoriesFromApi } from '../apiCalls';
import TableComponent from '../components/TableComponent';
import '../styles/RepositoriesPage.css';

const RepositoriesPage = () => {
  const [q, setQ] = useState('');
  const [repositories, setRepositories] = useState({});

  const getRepositories = async () => {
    try {
      let repositories = await getRepositoriesFromApi(q);
      setRepositories(repositories);
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };

  useEffect(() => {
    if (q.length > 0) {
      getRepositories();
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
      {repositories.length > 0 ? (
        <TableComponent repositories={repositories} />
      ) : (
        <></>
      )}
    </>
  );
};
export default RepositoriesPage;
