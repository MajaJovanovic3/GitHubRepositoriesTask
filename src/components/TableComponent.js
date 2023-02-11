import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TableComponent.css';

const TableComponent = ({ repositories }) => {
  const navigate = useNavigate();
  const [activeRow, setActiveRow] = useState(false);
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
      </div>
    </>
  );
};

export default TableComponent;
