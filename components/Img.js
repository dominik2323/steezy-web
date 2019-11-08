import React from 'react';

const Img = ({ src, ...props }, ref) => {
  return <img ref={ref} src={src} {...props} />;
};

export default React.forwardRef(Img);
