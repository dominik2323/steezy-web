import React from 'react';
import Link from 'next/link';

const GridImageHover = ({ id, name, client, tags }) => {
  return (
    <Link href={`/project/[id]`} as={`/project/${id}`}>
      <div className="grid__row__item--image__hover">
        <h2>{name}</h2>
        <h3>{client}</h3>
        <ul>
          {tags.map(tag => (
            <li key={tag}>{`#${tag}`}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default GridImageHover;
