import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { changeCurrPage, sortBy, toggleSwitch } from '../pages/repositorySlice';
import '../styles/TableComponent.css';

const TableComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sort, repositories } = useSelector(
    (state) => ({
      sort: state.repository.sort,
      repositories: state.repository.repositories,
    }),
    shallowEqual,
  );

  const setSortColumn = (column) => {
    dispatch(toggleSwitch());
    dispatch(sortBy(column));
    dispatch(changeCurrPage(1));
  };

  const handleClick = (e, repository) => {
    navigate('/repository-details', {
      state: {
        owner: repository.owner.login,
        ownerName: repository.ownerName,
        repo: repository.name,
      },
    });
  };

  return (
    <>
      <div className='div-table'>
        <table className='styled-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th onClick={() => setSortColumn('stars')}>
                Stars
                {sort?.params === 'stars' && sort.order === 'desc' ? '↓' : ''}
                {sort?.params === 'stars' && sort.order === 'asc' ? '↑' : ''}
              </th>
              <th onClick={() => setSortColumn('forks')}>
                Forks
                {sort?.params === 'forks' && sort.order === 'desc' ? '↓' : ''}
                {sort?.params === 'forks' && sort.order === 'asc' ? '↑' : ''}
              </th>
              <th>Owner</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {repositories.map((repository) => (
              <tr
                key={repository.id}
                onClick={(e) => handleClick(e, repository)}
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
      </div>
    </>
  );
};

export default TableComponent;
