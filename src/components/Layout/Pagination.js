import React from 'react';
import './Pagination.css';
export default (props) => {
  const { loading,
    showPrevLink,
    showNextLink,
    handlePrevClick,
    handleNextClick } = props;
  return (<div>
    <a href="#"
      className={`${showPrevLink}?'show':'hide'`}
      onClick={handlePrevClick}>
      Prev
        </a>
    <a href="#"
      className={`${showNextLink}?'show':'hide'`}
      onClick={handleNextClick}
    >Next
    </a>
  </div>)
}