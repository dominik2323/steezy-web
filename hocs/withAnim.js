import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { useElVisibility } from '../hooks/useElVisibility';

export function withAnim(C) {
  const WithAnim = ({ ...props }) => {
    const animRef = React.useRef();
    const isVisible = useElVisibility(animRef, `-150px 0px 50px`);
    console.log(isVisible);

    const PosedEl = posed.div({
      show: { opacity: 1 },
      hide: { opacity: 0 },
    });

    return (
      <div ref={animRef}>
        <C {...props} />
      </div>
    );
  };
  return WithAnim;
}
