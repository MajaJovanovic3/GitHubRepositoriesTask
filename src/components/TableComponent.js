import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TableComponent.css';

const TableComponent = ({ repositories, sort, setSort,isDescendingOrder, setIsDescendingOrder, setCurrentPage  }) => {
  const navigate = useNavigate();

  const setSortColumn = (column) => {
    setIsDescendingOrder(!isDescendingOrder)
    setCurrentPage(1)
    setSort({params:column, order: !isDescendingOrder ? 'desc' : 'asc'})
    } 
 
  const handleClick = (e, repository) => {
    navigate('/repository-details', {
      state: {
        owner: repository.owner.login,
        ownerName: repository.ownerName,
        repo: repository.name,
        sort:sort
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
                {sort.params=='stars' && sort.order=='desc' ?  '↓' : ''}
                {sort.params=='stars' && sort.order=='asc' ?  '↑' : ''}
              </th>
              <th onClick={() => setSortColumn('forks')}>
                Forks
                {sort.params=='forks' && sort.order=='desc' ?  '↓' : ''}
                {sort.params=='forks' && sort.order=='asc' ?  '↑' : ''}
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
