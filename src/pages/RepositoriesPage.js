import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { changeQ, fetchRepositories } from './repositorySlice';
import PaginationComponent from '../components/PaginationComponent';
import TableComponent from '../components/TableComponent';
import '../styles/RepositoriesPage.css';

const RepositoriesPage = () => {
  const dispatch = useDispatch();

  const { q, sort, repositories, currPage, status } = useSelector(
    (state) => state.repository,
    shallowEqual,
  );

  const REACT_Q = 'react in:topics is:public';
  const VUE_Q = 'vue in:topics is:public';
  const ANGULAR_Q = 'angular in:topics is:public';

  useEffect(() => {
    if (q.length > 0) {
      dispatch(fetchRepositories({ q, currPage, sort }));
    }
  }, [q, currPage, sort]);

  return (
    <>
      <div className='tab'>
        <div className='btn-box'>
          <button
            className={q === REACT_Q ? 'active' : ''}
            onClick={() => dispatch(changeQ(REACT_Q))}
          >
            React
          </button>
          <button
            className={q === VUE_Q ? 'active' : ''}
            onClick={() => dispatch(changeQ(VUE_Q))}
          >
            {' '}
            Vue
          </button>
          <button
            className={q === ANGULAR_Q ? 'active' : ''}
            onClick={() => dispatch(changeQ(ANGULAR_Q))}
          >
            Angular
          </button>
        </div>
      </div>
      {status === 'loading' ? (
        <div className='loader' />
      ) : repositories?.length > 0 ? (
        <div>
          <TableComponent />
          <PaginationComponent />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default RepositoriesPage;
