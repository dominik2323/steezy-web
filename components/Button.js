import React from 'react';

const Button = ({
  handleClick = () => null,
  label,
  className = '',
  playIcon = false,
  style,
}) => {
  return (
    <button
      className={`btn btn--red ${className} ${playIcon ? `play-icon` : ``}`}
      style={style}
      onClick={() => handleClick()}>
      {label}
    </button>
  );
};

export default Button;
