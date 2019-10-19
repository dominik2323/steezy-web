import React from 'react';

const Img = ({ src, ...props }, ref) => {
  return <img ref={ref} src={`${process.env.PREFIX}${src}`} {...props} />;
};

export default React.forwardRef(Img);
