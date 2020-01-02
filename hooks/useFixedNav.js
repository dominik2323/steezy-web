import { useEffect, useState } from 'react';

export default function useFixedNav(showBgFrom = () => window.innerHeight) {
  const [showNav, toggleNav] = useState(true);
  const [hasBg, setBg] = useState(false);

  let prevScrollPos = 0;
  const handleScroll = e => {
    if (window.scrollY < prevScrollPos || prevScrollPos < 0) {
      // * U P  –  S H O W
      toggleNav(true);
      setBg(window.scrollY > showBgFrom() ? true : false);
    } else {
      // * D O W N  –  H I D E

      // * if URL has changed and page landed on the top then show navbar
      if (window.pageYOffset === 0) {
        toggleNav(true);
        return;
      }
      toggleNav(false);
    }
    prevScrollPos = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { showNav, hasBg };
}
