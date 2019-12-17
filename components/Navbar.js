import React, { useState } from 'react';
import posed, { PoseGroup } from 'react-pose';

import useFixedNav from '../hooks/useFixedNav';

import Link from './Link';
import Button from './Button';
import Sidebar from './Sidebar';
import LottieElement from './LottieElement';

const Navbar = React.forwardRef(({ children, hasBg }, ref) => {
  const [showSidebar, toggleSidebar] = useState(false);
  // const { activeTag, invertNavbar } = useSelector(x => x);
  return (
    <div
      ref={ref}
      className={`topbar topbar--fixed justify-content-center ${
        hasBg ? `has-bg` : ``
      }`}>
      <div className={`topbar__navbar col-11`}>
        <Link path='/'>
          <div className={`topbar__navbar__brand`} />
        </Link>
        <div className={`topbar__navbar__label`}>{children}</div>
        <LottieElement
          className={`topbar__navbar__burger`}
          key={`burger-menu`}
          src={`/static/img/globals/burger.json`}
          handleClick={() => toggleSidebar(true)}
        />
      </div>
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
    </div>
  );
});

const PosedNavbar = posed(Navbar)({
  navPre: { opacity: 1, y: -100 },
  navIn: { opacity: 1, y: 0, transition: { duration: 300 } },
  navOut: { opacity: 0, y: -100, transition: { duration: 700 } },
});

export default ({ children }) => {
  const { showNav, hasBg } = useFixedNav();
  return (
    <PoseGroup preEnterPose={`navPre`} enterPose={`navIn`} exitPose={`navOut`}>
      {showNav && (
        <PosedNavbar key={'navbar'} children={children} hasBg={hasBg} />
      )}
    </PoseGroup>
  );
};
