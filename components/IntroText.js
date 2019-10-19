import React from 'react';

const IntroText = ({
  perex,
  tags,
  numbered = false,
  children,
  handleClick = () => null
}) => {
  return (
    <div className="intro-text">
      <p className={`big`}>
        {perex}
        {children}
      </p>
      {tags && (
        <ul>
          {tags.map(({ header, bullet, id }, i) => (
            <li key={header} onClick={() => handleClick(id)}>
              {numbered && <span>{`0${i + 1}`}</span>}
              <div>
                <h5>{header.toUpperCase()}</h5>
                <small>{bullet}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IntroText;
