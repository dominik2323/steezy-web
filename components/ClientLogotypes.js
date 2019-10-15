import React from 'react';
import { DataContext } from '../pages/_app';
import Img from './Img';

const LogoGrid = ({ children, wrapper, condition }) => {
  return condition ? children : wrapper(children);
};

const ClientLogotypes = () => {
  const { components } = React.useContext(DataContext);
  const { header, logos } = components.clientLogos;
  return (
    <div className={`client-logos`}>
      <h5>{header.toUpperCase()}</h5>
      <div className={`client-logos__list`}>
        {logos.map((img, i) => (
          <div key={i} className={`client-logos__list__item`}>
            <Img src={`/static/img/globals/${img}`} alt={img.split('.')[0]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientLogotypes;
