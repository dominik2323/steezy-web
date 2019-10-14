import React from 'react';

const GridReference = ({
  quote,
  name,
  position,
  client,
  id,
  img,
  landscape = true
}) => {
  if (landscape)
    return (
      <div
        className={`
          grid__row__item 
          grid__row__item--reference 
          grid__row__item--reference${true ? `--landscape` : `--portrait`}
        `}
      >
        <div className={`grid__row__item--reference__person`}>
          <img src={`/static/img/project/${id}/${img}`} alt={name} />
          <p className={`red`}>{name}</p>
          <p>{client}</p>
        </div>
        <div className={`grid__row__item--reference__quote`}>
          <p className={``}>{quote}</p>
        </div>
      </div>
    );
};

export default GridReference;
