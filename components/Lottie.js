import React from 'react';
import lottie from 'lottie-web';

const Lottie = ({ src, setDimensions }) => {
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
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: src,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      });

      anim.addEventListener('data_ready', handleDataReady);
    }

    initLottie();
  }, []);
  return <div ref={lottieRef} className={`lottie`} />;
};

export default Lottie;
