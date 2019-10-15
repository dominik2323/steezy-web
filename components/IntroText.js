import React from 'react';

const IntroText = ({ perex, tags, numbered = false, children }) => {
  return (
    <div className="intro-text">
      <p>
        {perex}
        {children}
      </p>
      {tags && (
        <ul>
          {tags.map(({ header, bullet }, i) => (
            <li key={header}>
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
