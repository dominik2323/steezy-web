import React from 'react';
import Player from '@vimeo/player';

const GridVideo = ({ videoVimeoId }) => {
  const [dim, setDimensions] = React.useState({
    w: 1920,
    h: 800
  });
  const { w, h, scrollbarWidth } = dim;
  const vimeoPlayerRef = React.useRef(null);

  React.useEffect(() => {
    async function fetchDimensios() {
      setDimensions({
        w: await vimeoPlayer.getVideoWidth(),
        h: await vimeoPlayer.getVideoHeight()
      });
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
        height: `calc(((100vw / 15) * 13 * (${h} / ${w})))`
      }}
    />
  );
};

export default GridVideo;
