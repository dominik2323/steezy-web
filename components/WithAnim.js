import React from 'react';
import posed from 'react-pose';
import { useElVisibility } from '../hooks/useElVisibility';
import { useViewportSize } from '../hooks/useViewportSize';

const AnimatedComponent = posed.div({
  enter: { opacity: 1, y: 0, transition: { duration: 500 } },
  exit: { opacity: 0, y: 100, transition: { duration: 500 } },
});

function WithAnim({ disable = false, ...rest }) {
  const { w } = useViewportSize();

  const { ref, visible } = useElVisibility({
    runOnce: true,
    disable: disable,
  });

  return (
    <AnimatedComponent
      pose={visible || disable ? `enter` : `exit`}
      ref={ref}
      {...rest}
    />
  );
}

export default WithAnim;
