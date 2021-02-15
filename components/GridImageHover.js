import React from 'react';
import Link from 'next/link';
import Button from './Button';

import { DataContext } from '../lib/dataContext';

const GridImageHover = ({ uid, name, client }) => {
  const { components } = React.useContext(DataContext);
  const { projectDetail } = components.button;
  return (
    <Link href={`/project/[id]`} as={`/project/${uid}`}>
      <div className='grid__row__item--image__hover'>
        <h2>{name}</h2>
        <h3>{client}</h3>
        <Button className={`btn--small`} label={projectDetail} />
      </div>
    </Link>
  );
};

export default GridImageHover;
