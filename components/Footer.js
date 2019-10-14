import React, { Fragment, useState } from 'react';
import posed from 'react-pose';

import { DataContext } from '../pages/_app';
import Link from './Link';

const Copied = posed.div({
  in: {
    opacity: 1,
    applyAtStart: { display: 'block' }
  },
  out: {
    opacity: 0,
    applyAtEnd: { display: 'none' }
  }
});

const Footer = () => {
  const { globals, components } = React.useContext(DataContext);
  const defaultAnimState = { id: -1, x: 30, y: 50 };
  const [{ id, x, y }, setAnimId] = useState(defaultAnimState);
  const { address, phone, ico, dic } = globals.contact;
  const { footer, navbar } = components;
  const { socials } = globals;

  const copyToClipboard = (e, i) => {
    let el = document.createElement('textarea');
    el.value = e.target.innerText;
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    handleAnim({ id: i, x: e.clientX + 30, y: e.clientY - 24 });
  };

  const handleAnim = ({ id, x, y }) => {
    setAnimId({ id: id, x: x, y: y });
    setTimeout(() => setAnimId({ id: -1, x: x, y: y }), 750);
  };

  return (
    <div className="footer" id={`footer`}>
      <div className="footer__content">
        <div className="footer__content__cta">
          {footer.claims.map((item, i) => (
            <Fragment key={i}>
              <h5>{item.header}</h5>
              <div className={`footer__content__cta__email`}>
                <Copied
                  className={`footer__content__cta__email__copied`}
                  pose={i === id ? `in` : `out`}
                  initialPose={`out`}
                  style={{ top: y, left: x, display: 'none' }}
                >
                  <small>{footer.copied}</small>
                </Copied>
                <h1 onClick={e => copyToClipboard(e, i)}>{item.paragraph}</h1>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="footer__content__address">
          <h3>{`${address}`}</h3>
          <h3>{`${phone}`}</h3>
          <h3>{`${ico}\n${dic}`}</h3>
        </div>
      </div>
      <div className="footer__navbar">
        <div className="footer__navbar__menu">
          {navbar.map(page =>
            page.url === `footer` ? null : (
              <Link key={page.displayName} path={`${page.url}`}>
                <h5>{page.displayName}</h5>
              </Link>
            )
          )}
        </div>
        <div className="footer__navbar__socials">
          {socials.map(social => (
            <Link key={social.id} href={social.url}>
              <img src={`/static/img/globals/${social.img}`} alt={social.id} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
