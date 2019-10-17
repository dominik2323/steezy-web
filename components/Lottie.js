import React from 'react';
import lottie from 'lottie-web';

const Lottie = ({ src }) => {
  const lottieRef = React.useRef(null);

  React.useEffect(() => {
    async function initLottie() {
      lottie.loadAnimation({
        container: lottieRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: process.env.PREFIX + src,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      });
    }
    initLottie();
  }, []);
  return <div ref={lottieRef} className={`lottie`} />;
};

export default Lottie;
