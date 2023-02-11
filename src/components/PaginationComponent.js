import React from 'react';
import { numberHTML } from '../utils/helpers';
import '../styles/PaginationComponent.css';

const PaginationComponent = ({ lastPage, currPage, setCurrPage, q }) => {
  let items = [];
  let leftSide = currPage - 3 <= 0 ? 1 : currPage - 3;
  let rightSide = currPage + 3 >= lastPage ? lastPage : currPage + 3;

  for (let i = leftSide; i <= rightSide; i++) {
    let number = numberHTML(i, currPage, setCurrPage);
    items.push(number);
  }

  const nextPage = () => {
    if (currPage < lastPage) {
      setCurrPage(currPage + 1);
    }
  };

  const prevPage = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };

  return (
    <div className='div-pagination'>
      <div className='flex-container'>
        <div className='paginate-ctn'>
          {currPage > 4 ? (
            <>
              <div className='round-effect' onClick={prevPage}>
                &lsaquo;
              </div>
              <div onClick={() => setCurrPage(1)}>
                {numberHTML(1, currPage, setCurrPage)}
              </div>
            </>
          ) : (
            <></>
          )}
          {currPage < 6 ? <></> : <div className='round-effect'>...</div>}
          {items}
          {currPage > lastPage - 5 ? (
            <></>
          ) : (
            <>
              <div className='round-effect'>...</div>
              <div onClick={() => setCurrPage(lastPage)}>
                {numberHTML(lastPage, currPage, setCurrPage)}
              </div>
              <div className='round-effect' onClick={nextPage}>
                &rsaquo;
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
