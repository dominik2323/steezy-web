import React from 'react';

export const useViewportSize = () => {
  const [viewportSize, setViewportSize] = React.useState({ w: 0, h: 0 });

  const handleResize = () => {
    setViewportSize({
      w: window.innerWidth,
      h: window.innerHeight
    });
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewportSize;
};
