import React, { useState, useEffect } from 'react';
import { getRepositoriesFromApi } from '../apiCalls';
import PaginationComponent from '../components/PaginationComponent';
import TableComponent from '../components/TableComponent';
import '../styles/RepositoriesPage.css';

const RepositoriesPage = () => {
  const [q, setQ] = useState('');
  const [repositories, setRepositories] = useState({});
  const [lastPage, setLastPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const getRepositories = async (q, currentPage) => {
    try {
      let repositoriesFromApi = await getRepositoriesFromApi(q, currentPage);
      setRepositories(repositoriesFromApi.repositories);
      setLastPage(repositoriesFromApi.lastPage);
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };

  useEffect(() => {
    if (q.length > 0) getRepositories(q, currentPage);
  }, [q, currentPage]);

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
      {repositories?.length > 0 ? (
        <div>
          <TableComponent repositories={repositories} />
          <PaginationComponent
            lastPage={Number(lastPage)}
            currPage={currentPage}
            setCurrPage={setCurrentPage}
            q={q}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default RepositoriesPage;
