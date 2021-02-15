import React from 'react';
import Img from './Img';

const GridReference = ({ quote, name, position, img }) => {
  return (
    <div
      className={`
          grid__row__item 
          grid__row__item--reference 
        `}
    >
      <div className={`grid__row__item--reference__person`}>
        <Img src={img} alt={name} />
        <div>
          <p className={`red`}>{name}</p>
          <p>{position}</p>
        </div>
      </div>
      <div className={`grid__row__item--reference__quote`}>
        <p className={``}>{quote}</p>
      </div>
    </div>
  );
};

export default GridReference;
