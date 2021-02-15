import React from 'react';

export const useElVisibility = ({
  rootMargin = `-10px 0px`,
  treshold = 0.5,
  runOnce = false,
  disable,
}) => {
  const [visible, setVisibility] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    if (!disable) {
      const observer = new IntersectionObserver(
        ([entry], observer) => {
          setVisibility(entry.isIntersecting);
          if (entry.isIntersecting && runOnce) {
            observer.unobserve(ref.current);
          }
        },
        {
          rootMargin,
          treshold,
        }
      );

      observer.observe(ref.current);

      return () => {
        observer.unobserve(ref.current);
      };
    }
  }, []);

  return { visible, ref };
};
