import React from 'react';

const IntroText = ({ perex, tags }) => {
  return (
    <div className="intro-text">
      <p>{perex}</p>
      <ul>
        {tags &&
          tags.map(({ header, bullet }) => (
            <li key={header}>
              <h5>{header}</h5>
              <small>{bullet}</small>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default IntroText;
