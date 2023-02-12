import React, { useState, useEffect } from 'react';
import { getRepositoriesFromApi } from '../apiCalls';
import PaginationComponent from '../components/PaginationComponent';
import TableComponent from '../components/TableComponent';
import '../styles/RepositoriesPage.css';

const RepositoriesPage = () => {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState({});
  const [repositories, setRepositories] = useState({});
  const [lastPage, setLastPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [spinnerActive, setSpinnerActive] = useState(false);
  const [isDescendingOrder, setIsDescendingOrder] = useState(true);

  const REACT_Q = 'react in:topics is:public';
  const VUE_Q = 'vue in:topics is:public';
  const ANGULAR_Q = 'angular in:topics is:public';

  const getRepositories = async (q, currentPage, sort) => {
    try {
      let repositoriesFromApi = await getRepositoriesFromApi(
        q,
        currentPage,
        sort,
      );
      setRepositories(repositoriesFromApi.repositories);
      setLastPage(repositoriesFromApi.lastPage);
      setSpinnerActive(false);
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };

  useEffect(() => {
    if (q.length > 0) {
      setSpinnerActive(true);
      getRepositories(q, currentPage, sort);
    }
  }, [q, currentPage, sort]);

  return (
    <>
      <div className='tab'>
        <div className='btn-box'>
          <button
            className={q === REACT_Q ? 'active' : ''}
            onClick={() => setQ(REACT_Q)}
          >
            React
          </button>
          <button
            className={q === VUE_Q ? 'active' : ''}
            onClick={() => setQ(VUE_Q)}
          >
            {' '}
            Vue
          </button>
          <button
            className={q === ANGULAR_Q ? 'active' : ''}
            onClick={() => setQ(ANGULAR_Q)}
          >
            Angular
          </button>
        </div>
      </div>
      {spinnerActive ? (
        <div className='loader' />
      ) : repositories?.length > 0 ? (
        <div>
          <TableComponent
            repositories={repositories}
            sort={sort}
            setSort={setSort}
            isDescendingOrder={isDescendingOrder}
            setIsDescendingOrder={setIsDescendingOrder}
            setCurrentPage={setCurrentPage}
          />
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
