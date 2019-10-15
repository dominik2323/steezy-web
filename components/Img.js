import React from 'react';

const Img = ({ src, ...props }) => {
  return <img src={`${process.env.PREFIX}${src}`} {...props} />;
};

export default Img;
