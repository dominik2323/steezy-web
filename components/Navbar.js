import React, { useState } from 'react';
import posed, { PoseGroup } from 'react-pose';

import useFixedNav from '../hooks/useFixedNav';

import Link from './Link';
import Button from './Button';
import Sidebar from './Sidebar';

const Navbar = React.forwardRef(({ children }, ref) => {
  const [showSidebar, toggleSidebar] = useState(false);
  // const { activeTag, invertNavbar } = useSelector(x => x);
  return (
    <div ref={ref} className={`topbar topbar--fixed justify-content-center`}>
      <div className={`topbar__navbar col-11`}>
        <Link path="/">
          <div className={`topbar__navbar__brand`} />
        </Link>
        <div className={`topbar__navbar__label`}>{children}</div>
        <div
          className={`topbar__navbar__burger ${
            showSidebar ? `navbar--sidebar-active` : ``
          }`}
          onClick={() => toggleSidebar(true)}
        />
      </div>
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
    </div>
  );
});

const PosedNavbar = posed(Navbar)({
  navPre: { opacity: 1, y: -100 },
  navIn: { opacity: 1, y: 0 },
  navOut: { opacity: 0, y: -100, transition: { duration: 700 } }
});

export default ({ children }) => {
  const isFixed = useFixedNav();
  return (
    <PoseGroup preEnterPose={`navPre`} enterPose={`navIn`} exitPose={`navOut`}>
      {isFixed && <PosedNavbar key={'navbar'} children={children} />}
    </PoseGroup>
  );
};
