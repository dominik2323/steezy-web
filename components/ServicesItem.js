import React from 'react';
import Grid from './Grid';
import { transformGridReferencesIntoGrid } from '../pages';
import Button from './Button';
import Router from 'next/router';
import Lottie from './Lottie';
import WithAnim from './WithAnim';

const ServicesItem = ({
  name,
  perex,
  bullets,
  img,
  grid,
  projects,
  id,
  btn,
}) => {
  const transformGrid = transformGridReferencesIntoGrid(
    Object.values(grid),
    projects
  );
  return (
    <div id={id} className={`services__content__services-item`}>
      <div className={`services__content__services-item__about`}>
        <WithAnim className={`services__content__services-item__about__intro`}>
          <div
            className={`services__content__services-item__about__intro__perex`}>
            <h1>{name}</h1>
            <p className={`big`}>{perex}</p>
          </div>
          <div
            className={`services__content__services-item__about__intro__icon`}>
            <Lottie src={`/static/img/services/${img}`} renderer={`svg`} />
            {/*<Img src={`/static/img/services/${img}`} alt="" />*/}
          </div>
        </WithAnim>
        <WithAnim>
          <ul className={`services__content__services-item__about__bullets`}>
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
        </WithAnim>
      </div>
      <Grid grid={transformGrid} folder={`/project`} />
      <Button
        handleClick={async () => {
          await Router.push({
            pathname: '/projects',
            query: { filterQuery: id },
          });
          window.scrollTo(0, 0);
        }}
        label={btn}
      />
    </div>
  );
};

export default ServicesItem;
