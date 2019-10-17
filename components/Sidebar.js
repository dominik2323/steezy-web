import React from 'react';
import posed from 'react-pose';
import Link from './Link';
import { DataContext } from '../pages/_app';
import { scrollTo } from '../hooks/scrollTo';
import Img from './Img';
import Router, { useRouter } from 'next/router';

const PosedSidebar = posed.div({
  show: {
    x: '0%',
    applyAtStart: { display: 'flex' },
    staggerChildren: 100,
    transition: { duration: 300 }
  },
  hide: {
    x: '100%',
    applyAtEnd: { display: 'none' },
    transition: { duration: 300 }
  }
});

const PosedLink = posed.div({
  show: { opacity: 1, y: 0, delay: 100 },
  hide: { opacity: 0, y: 50 }
});

const Sidebar = ({ showSidebar, toggleSidebar }) => {
  const [showServicesSelector, toggleServicesSelector] = React.useState(false);
  const { components, globals } = React.useContext(DataContext);
  const router = useRouter();
  const { pathname } = router;
  const { navbar } = components;
  return (
    <PosedSidebar
      pose={showSidebar ? `show` : `hide`}
      className={`col-5 sidebar`}
      style={{ display: 'none' }}
    >
      <Img
        onClick={() => toggleSidebar(false)}
        className={`close-icon`}
        src={`/static/img/globals/close.svg`}
        alt="close icon"
      />
      <nav>
        {navbar.pages.map(page => {
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
      <div className="sidebar__social">
        {globals.socials.map(icon => {
          return (
            <Link key={icon.id} path={icon.url}>
              <Img src={`/static/img/globals/${icon.img}`} alt={icon.id} />
            </Link>
          );
        })}
      </div>
    </PosedSidebar>
  );
};

export default Sidebar;
