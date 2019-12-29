import React from 'react';
import lottie from 'lottie-web';

const Lottie = ({ src, setDimensions, renderer = `svg` }) => {
  // const [aspect, setDimensions] = React.useState(1);
  const lottieRef = React.useRef(null);

  const handleDataReady = () => {
    typeof setDimensions === `function` &&
      setDimensions(
        lottieRef.current.firstChild.attributes.width.value /
          lottieRef.current.firstChild.attributes.height.value
      );
  };

  React.useEffect(() => {
    function initLottie() {
      const anim = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: renderer,
        loop: true,
        autoplay: true,
        path: src,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
        },
      });

      anim.addEventListener('data_ready', handleDataReady);
    }

    initLottie();
  }, []);
  return <div ref={lottieRef} className={`lottie`} />;
};

export default Lottie;
