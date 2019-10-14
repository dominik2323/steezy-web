import React from 'react';

const Button = ({
  handleClick,
  label,
  className = '',
  playIcon = false,
  style
}) => {
  return (
    <button
      className={`btn-ghost btn-ghost--red ${className} ${
        playIcon ? `play-icon` : ``
      }`}
      style={style}
      onClick={() => handleClick()}
    >
      {label}
    </button>
  );
};

export default Button;
