import React from 'react';
import WithAnim from './WithAnim';

const IntroText = ({
  perex,
  tags,
  numbered = false,
  children,
  handleClick = () => null,
  ...props
}) => (
  <WithAnim className='intro-text' {...props}>
    <p className={`big`}>
      {perex}
      {children}
    </p>
    {tags && (
      <ul>
        {tags.map(({ header, content, id }, i) => (
          <li key={header} onClick={() => handleClick(id)}>
            {numbered && <span>{`0${i + 1}`}</span>}
            <div>
              <h5>{header.toUpperCase()}</h5>
              <small>{content}</small>
            </div>
          </li>
        ))}
      </ul>
    )}
  </WithAnim>
);

export default IntroText;
