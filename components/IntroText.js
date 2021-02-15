import React from 'react';
import WithAnim from './WithAnim';
import { RichText } from 'prismic-dom';

const IntroText = ({
  perex,
  tags,
  numbered = false,
  children,
  handleClick = () => null,
  ...props
}) => (
  <WithAnim className='intro-text' {...props}>
    {perex && (
      <p className={`big`}>
        {typeof perex === 'string' ? perex : RichText.asText(perex, '\n\n')}
        {children}
      </p>
    )}
    {tags && (
      <ul>
        {tags.map(({ header, content, id }, i) => (
          <li key={header} onClick={() => handleClick(id)}>
            {numbered && <span>{`0${i + 1}`}</span>}
            <div>
              <h5>{header?.toUpperCase()}</h5>
              <small>{content}</small>
            </div>
          </li>
        ))}
      </ul>
    )}
  </WithAnim>
);

export default IntroText;
