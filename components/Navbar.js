import React, { useState } from "react";
import posed, { PoseGroup } from "react-pose";

import useFixedNav from "../hooks/useFixedNav";

import Link from "./Link";
import Button from "./Button";
import Sidebar from "./Sidebar";
import LottieElement from "./LottieElement";
import { useRouter } from "next/router";

const Navbar = React.forwardRef(({ children, hasBg }, ref) => {
  const [showSidebar, toggleSidebar] = useState(false);
  const router = useRouter();
  const isEnglish = router.locale === "en-GB";
  return (
    <div ref={ref} className={`topbar topbar--fixed ${hasBg ? `has-bg` : ``}`}>
      <div className={`topbar__navbar`}>
        <Link path="/">
          <div className={`topbar__navbar__brand`} />
        </Link>
        <div className={`topbar__navbar__label`}>{children}</div>
        <LottieElement
          className={`topbar__navbar__burger`}
          key={`burger-menu`}
          src={`/static/img/globals/burger.json`}
          handleClick={() => toggleSidebar(true)}
        />
        <span
          className={`lang`}
          onClick={() =>
            router.push("/", "/", { locale: isEnglish ? "cs-CZ" : "en-GB" })
          }
        >
          {isEnglish ? "CS" : "EN"}
        </span>
      </div>
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
    </div>
  );
});

const PosedNavbar = posed(Navbar)({
  navPre: { opacity: 1, y: -100, transition: { duration: 300 } },
  navIn: { opacity: 1, y: 0, transition: { duration: 300 } },
  navOut: { opacity: 0, y: -100, transition: { duration: 700 } },
});

const PosedGroupNavbar = ({ children, showBgFrom }) => {
  const { showNav, hasBg } = useFixedNav(showBgFrom);
  return (
    <PoseGroup preEnterPose={`navPre`} enterPose={`navIn`} exitPose={`navOut`}>
      {showNav && (
        <PosedNavbar key={"navbar"} children={children} hasBg={hasBg} />
      )}
    </PoseGroup>
  );
};
export default PosedGroupNavbar;
