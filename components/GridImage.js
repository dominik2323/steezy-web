import React from 'react';
import GridImageHover from './GridImageHover';
import Img from './Img';

const ProjectGridImage = ({
  img,
  name,
  client,
  tags,
  alt,
  folder = ``,
  id,
  noCrop
}) => {
  const [width, setWidth] = React.useState(1);

  React.useEffect(() => {
    if (noCrop) {
      const el = document.getElementById(img);
      setWidth(el.naturalWidth);
    }
  }, []);

  return (
    <div
      className={`
          grid__row__item 
          grid__row__item--image 
          `}
      style={{ flexGrow: width }}
    >
      {name && client && tags && id && (
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
