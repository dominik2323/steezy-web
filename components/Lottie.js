import lottie from 'lottie-web';
import React from 'react';

const Lottie = ({ src = ``, data = null, setDimensions, renderer = `svg` }) => {
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
    // lottie.setLocationHref(window.location.href);
    function initLottie() {
      const anim = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: renderer,
        loop: true,
        autoplay: true,
        animationData: data,
        path: src,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      });

      anim.addEventListener('data_ready', handleDataReady);
    }

    initLottie();
  }, []);
  return <div ref={lottieRef} className={`lottie`} />;
};

export default Lottie;
