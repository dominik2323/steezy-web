import React from 'react';
import { DataContext } from '../lib/dataContext';
import Img from './Img';
import { useViewportSize } from '../hooks/useViewportSize';

const LogoGrid = ({ children, wrapper, condition }) => {
  return condition ? children : wrapper(children);
};

const ClientLogotypes = () => {
  const { components } = React.useContext(DataContext);
  const { header, logos } = components.clientLogos;
  const { w } = useViewportSize();
  const splitLogosAtBreakpoint = w <= 700 ? logos.slice(0, 10) : logos;
  return (
    <div className={`client-logos`}>
      <h5>{header.toUpperCase()}</h5>
      <div className={`client-logos__list`}>
        {splitLogosAtBreakpoint.map((img, i) => (
          <div key={i} className={`client-logos__list__item`}>
            <Img src={`/static/img/globals/${img}`} alt={img.split('.')[0]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientLogotypes;
