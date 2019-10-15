import React from 'react';
import Grid from './Grid';
import { transformGridReferencesIntoGrid } from '../pages';
import Button from './Button';
import { DataContext } from '../pages/_app';
import Router from 'next/router';
import Img from './Img';

const ServicesItem = ({ name, perex, bullets, img, grid, projects, id }) => {
  const transformGrid = transformGridReferencesIntoGrid(
    Object.values(grid),
    projects
  );
  const { components } = React.useContext(DataContext);
  return (
    <div id={id} className={`services-item`}>
      <div className={`services-item__about`}>
        <div className={`services-item__about__intro`}>
          <div className={`services-item__about__intro__perex`}>
            <h1>{name}</h1>
            <p className={`big`}>{perex}</p>
          </div>
          <div className={`services-item__about__intro__icon`}>
            <Img src={`/static/img/services/${img}`} alt="" />
          </div>
        </div>
        <ul className={`services-item__about__bullets`}>
          {bullets.map(({ header, perex }, i) => (
            <li key={i}>
              <h2>
                <span>{`0${i + 1}`}</span>
                {header}
              </h2>
              <p>{perex}</p>
            </li>
          ))}
        </ul>
      </div>
      <Grid grid={transformGrid} folder={`/project`} />
      <Button
        handleClick={async () => {
          await Router.push({
            pathname: '/projects',
            query: { filterQuery: id }
          });
          window.scrollTo(0, 0);
        }}
        label={name.toUpperCase()}
      />
    </div>
  );
};

export default ServicesItem;
