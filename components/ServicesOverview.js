import React from 'react';
import Router from 'next/router';
// import Link from 'next/link';
import { DataContext } from '../lib/dataContext';
import Button from './Button';
import Img from './Img';

export const ServiceItem = ({ name, img, perex, btn, id }) => (
  <div className='services-overview__service' key={name}>
    <Img src={`/static/img/services/${img}`} alt={name} />
    <h2>{name}</h2>
    <p>{perex}</p>
    {
      <Button
        label={btn}
        handleClick={() =>
          Router.push({ pathname: '/services', query: { section: id } })
        }
      />
    }
  </div>
);

const ServicesOverview = React.forwardRef(({ className = `` }, ref) => {
  const { pages } = React.useContext(DataContext);
  const { services } = pages;
  return (
    <div className={`services-overview ${className}`} ref={ref}>
      {services.content.map(({ name, img, perex, btn, id }) => (
        <ServiceItem name={name} img={img} perex={perex} btn={btn} id={id} />
      ))}
    </div>
  );
});

export default ServicesOverview;
