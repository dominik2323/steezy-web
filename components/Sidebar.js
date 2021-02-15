import React from 'react';
import posed from 'react-pose';
import Link from './Link';
import { DataContext } from '../lib/dataContext';
import { scrollTo } from '../hooks/scrollTo';
import Img from './Img';
import LottieElement from './LottieElement';
import Router, { useRouter } from 'next/router';
import Div100vh from 'react-div-100vh';

const PosedSidebar = posed.div({
  show: {
    x: '0%',
    applyAtStart: { display: 'flex' },
    staggerChildren: 100,
    transition: { duration: 300 },
  },
  hide: {
    x: '100%',
    applyAtEnd: { display: 'none' },
    transition: { duration: 300 },
  },
});

const PosedLink = posed.div({
  show: { opacity: 1, y: 0, delay: 100 },
  hide: { opacity: 0, y: 50 },
});

const Sidebar = ({ showSidebar, toggleSidebar }) => {
  const [showServicesSelector, toggleServicesSelector] = React.useState(false);
  const { components, globals } = React.useContext(DataContext);
  const router = useRouter();
  const { pathname } = router;
  const { navbar } = components;
  return (
    <Div100vh style={{ height: `100rvh` }}>
      <PosedSidebar
        pose={showSidebar ? `show` : `hide`}
        className={`col-5 sidebar`}
        style={{ display: 'none' }}
      >
        <LottieElement
          onClick={() => toggleSidebar(false)}
          className={`close-icon`}
          src={`/static/img/globals/close.json`}
        />
        <nav>
          {navbar.pages.map((page) => {
            if (page.url === 'footer') {
              return (
                <PosedLink key={page.displayName}>
                  <h1
                    onClick={() => {
                      toggleSidebar(false);
                      scrollTo(page.url);
                    }}
                  >
                    {page.displayName}
                  </h1>
                </PosedLink>
              );
            }
            return (
              <PosedLink key={page.displayName}>
                <Link path={`${page.url}`}>
                  <h1
                    className={pathname === page.url ? `active` : ``}
                    onClick={() => {
                      toggleSidebar(false);
                      Router.push({ pathname: page.url });
                    }}
                  >
                    {page.displayName}
                  </h1>
                </Link>
              </PosedLink>
            );
          })}
        </nav>
        <div className='sidebar__social'>
          {globals.socials.map((icon) => {
            return (
              <a key={icon.id} target={`_blank`} href={icon.url}>
                <Img src={`/static/img/globals/${icon.img}`} alt={icon.id} />
              </a>
            );
          })}
        </div>
      </PosedSidebar>
    </Div100vh>
  );
};

export default Sidebar;
