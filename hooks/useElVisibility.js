import React from 'react';

export const useElVisibility = (ref, rootMargin = `0px`) => {
  const [visible, setVisibility] = React.useState(false);

  React.useEffect(() => {
    console.log(ref);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibility(entry.isIntersecting);
      },
      {
        rootMargin: rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.unobserve(ref.current);
    };
  }, []);

  return visible;
};
