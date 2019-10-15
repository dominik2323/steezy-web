import React from 'react';
import { DataContext } from '../pages/_app';
import Img from './Img';

const HeroFooterLogotypes = () => {
  const { components } = React.useContext(DataContext);
  const { heroFooterLogotypes } = components;
  return (
    <div className={`hero-footer hero-footer-logotypes`}>
      <h5>{heroFooterLogotypes.header}</h5>
      <div className="hero-footer-logotypes__list">
        {heroFooterLogotypes.list.map((logo, i) => (
          <Img key={i} src={`/static/img/globals/${logo}`} alt="" />
        ))}
      </div>
    </div>
  );
};

export default HeroFooterLogotypes;
