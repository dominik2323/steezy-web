import React from 'react';

const ProjectGridBlockquote = ({ blockquote }) => {
  return (
    <div className={`grid__row__item grid__row__item--blockquote col7`}>
      <h1>{blockquote}</h1>
    </div>
  );
};

export default ProjectGridBlockquote;
