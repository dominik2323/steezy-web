import { useEffect, useState } from 'react';

export default function useFixedNav() {
  const [showNav, toggleNav] = useState(true);

  let prevScrollPos = 0;
  const handleScroll = e => {
    if (window.scrollY < prevScrollPos) {
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

  return showNav;
}
