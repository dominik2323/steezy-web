import React from 'react';
import GridImageHover from './GridImageHover';
import Img from './Img';

const ProjectGridImage = (
  { img, name, client, alt, uid, width, height },
  ref
) => {
  const hasHover = name && client && uid;

  return (
    <div
      className={`
          grid__row__item 
          grid__row__item--image
          ${hasHover ? `grid__row__item--has-hover` : ``} 
          `}
      style={{ flexBasis: `${(width / height) * 100}%` }}
      ref={ref}
    >
      {hasHover && <GridImageHover name={name} client={client} uid={uid} />}
      <Img id={img} src={img} alt={alt} />
    </div>
  );
};

export default React.forwardRef(ProjectGridImage);
