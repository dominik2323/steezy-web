import React from 'react';
import Img from './Img';

const HeroFooter = ({ children, playerRef, isVideoAvaible }) => {
  const [{ currentTime, duration, muted }, setPlayerState] = React.useState({
    currentTime: 0,
    duration: 1,
    muted: false,
  });
  const controls = [
    {
      label: 'playPause.svg',
      fn: () =>
        playerRef.current.paused
          ? playerRef.current.play()
          : playerRef.current.pause(),
    },
    {
      label: 'stop.svg',
      fn: () => (playerRef.current.currentTime = 0),
    },
    {
      label: muted ? 'mute.svg' : 'unMute.svg',
      fn: () => (playerRef.current.muted = !playerRef.current.muted),
    },
  ];

  const handlePlayerStateChange = e => {
    setPlayerState({
      currentTime: e.target.currentTime,
      duration: e.target.duration,
      muted: e.target.muted,
    });
  };

  React.useEffect(() => {
    if (isVideoAvaible && playerRef.current !== null) {
      playerRef.current.addEventListener('timeupdate', handlePlayerStateChange);
      return () =>
        playerRef.current.removeEventListener(
          'timeupdate',
          handlePlayerStateChange
        );
    }
  }, []);

  return /*isVideoPlaying*/ false ? (
    <div className={`hero-footer video-controls`}>
      <div
        className={`video-controls__progress`}
        style={{
          right: `${100 - currentTime / (duration / 100)}%`,
        }}
      />
      {controls.map(({ fn, label }, i) => (
        <Img src={`/static/img/globals/${label}`} key={i} onClick={fn} />
      ))}
    </div>
  ) : (
    children
  );
};

export default HeroFooter;
