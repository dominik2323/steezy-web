import React from 'react';
import lottie from 'lottie-web';

const LottieElement = ({
  src,
  className,
  handleClick,
  loop = true,
  autoplay = false,
  noHover = false,
  ...props
}) => {
  const ref = React.useRef(null);
  let anim = React.useRef(null);

  const handleMouseEnter = () => {
    anim.current.play();
  };

  const handleMouseLeave = () => {
    anim.current.goToAndStop(0);
  };

  React.useEffect(() => {
    anim.current = lottie.loadAnimation({
      container: ref.current,
      renderer: 'svg',
      loop: loop,
      autoplay: autoplay,
      path: src,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    });
  }, []);

  return (
    <div
      className={className}
      ref={ref}
      onMouseEnter={() => !noHover && handleMouseEnter()}
      onMouseLeave={() => !noHover && handleMouseLeave()}
      onClick={() => handleClick()}
      {...props}
    />
  );
};

export default LottieElement;
