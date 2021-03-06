import React from 'react';
import Player from '@vimeo/player';
import LottieElement from './LottieElement';

const ModalPlayer = ({ handleClose }) => {
  const ref = React.useRef(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const vimeoPlayer = new Player(ref.current);
    vimeoPlayer.on('loaded', () => {
      setLoading(false);
      vimeoPlayer.play();
    });
  }, []);

  return (
    <div className={`modal-player`} onClick={() => handleClose()}>
      {isLoading && (
        <LottieElement
          className={`modal-player__loading`}
          style={{ position: `absolute`, zIndex: 9 }}
          src={`/static/img/globals/loading.json`}
          autoplay={true}
          noHover={true}
        />
      )}
      <LottieElement
        className={`modal-player__close`}
        onClick={() => handleClose()}
        autoPlay={false}
        noHover={false}
        src={`/static/img/globals/close.json`}
      />
      <div className={`modal-player__video-wrap`}>
        <div
          className={`modal-player__video-wrap__player`}
          ref={ref}
          data-vimeo-id={`366821562`}
        />
      </div>
    </div>
  );
};

export default ModalPlayer;
