import React from 'react';
import Player from '@vimeo/player';

const GridVideo = ({ videoVimeoId }) => {
  const [dim, setDimensions] = React.useState(`100%`);
  const vimeoPlayerRef = React.useRef(null);

  React.useEffect(() => {
    async function fetchDimensios() {
      const dimensions = Promise.all([
        vimeoPlayer.getVideoWidth(),
        vimeoPlayer.getVideoHeight(),
      ]);
      const [width, height] = await dimensions;
      setDimensions(vimeoPlayerRef.current.clientWidth / (width / height));
    }
    const vimeoPlayer = new Player(vimeoPlayerRef.current);
    fetchDimensios();
  }, []);

  return (
    <div
      className={`grid__row__item grid__row__item--video`}
      ref={vimeoPlayerRef}
      data-vimeo-id={videoVimeoId}
      style={{
        width: `100%`,
        height: dim,
      }}
    />
  );
};

export default GridVideo;
