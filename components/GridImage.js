import React from 'react';
import GridImageHover from './GridImageHover';
import { useViewportSize } from '../hooks/useViewportSize';
import Img from './Img';

const ProjectGridImage = ({
  img,
  name,
  client,
  tags,
  alt,
  folder = ``,
  id
}) => {
  const [aspect, setAspect] = React.useState(`unset`);

  const handleResize = () => {
    let el = document.getElementById(img);
    setAspect(`${(el.naturalWidth / el.naturalHeight) * 100}%`);
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const hasHover = name && client && tags && id;

  return (
    <div
      className={`
          grid__row__item 
          grid__row__item--image
          ${hasHover ? `grid__row__item--has-hover` : ``} 
          `}
      style={{ flexBasis: aspect }}
    >
      {hasHover && (
        <GridImageHover
          name={name}
          client={client}
          tags={tags}
          projectId={id}
        />
      )}
      <Img id={img} src={`/static/img${folder}/${img}`} alt={alt} />
    </div>
  );
};

export default ProjectGridImage;
