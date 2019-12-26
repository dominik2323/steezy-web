import React from 'react';
import Link from 'next/link';
import Button from './Button';

import { DataContext } from '../pages/_app';

const GridImageHover = ({ projectId, name, client, tags }) => {
  const { components } = React.useContext(DataContext);
  const { projectDetail } = components.button;
  return (
    <Link href={`/project/[id]`} as={`/project/${projectId}`}>
      <div className='grid__row__item--image__hover'>
        <h2>{name}</h2>
        <h3>{client}</h3>
        <Button className={`btn--small`} label={projectDetail} />
        {/*<ul>
          {tags.map(tag => (
            <li key={tag}>{`#${tag}`}</li>
          ))}
        </ul>*/}
      </div>
    </Link>
  );
};

export default GridImageHover;
