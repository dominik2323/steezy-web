import React from 'react';
import A from 'next/link';

const Link = ({ path = '', children, className = '' }) => {
  return (
    <A href={path}>
      <a className={className}>{children}</a>
    </A>
  );
};

export default Link;
