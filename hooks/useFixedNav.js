import { useEffect, useState } from 'react';

export default function useFixedNav() {
  const [showNav, toggleNav] = useState(true);
  const [hasBg, setBg] = useState(false);

  let prevScrollPos = 0;
  const handleScroll = e => {
    if (window.scrollY < prevScrollPos || prevScrollPos < 0) {
      // * U P  –  S H O W
      setBg(window.scrollY > window.innerHeight ? true : false);
      toggleNav(true);
    } else {
      // * D O W N  –  H I D E
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
