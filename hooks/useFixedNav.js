import { useEffect, useState } from 'react';

export default function useFixedNav() {
  const [showNav, toggleNav] = useState(true);
  const [hasBg, setBg] = useState(false);

  let prevScrollPos = 0;
  const handleScroll = e => {
    if (window.scrollY < prevScrollPos) {
      setBg(window.scrollY > window.innerHeight ? true : false);
      toggleNav(true);
    } else {
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
