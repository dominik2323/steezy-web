import React from 'react';
import GridImageHover from './GridImageHover';

const ProjectGridImage = ({
  img,
  name,
  client,
  tags,
  alt,
  folder = ``,
  id
}) => {
  return (
    <div
      className={`
          grid__row__item 
          grid__row__item--image 
          `}
    >
      {name && client && tags && id && (
        <GridImageHover name={name} client={client} tags={tags} id={id} />
      )}
      <img src={`/static/img${folder}/${img}`} alt={alt} />
    </div>
  );
};

export default ProjectGridImage;
