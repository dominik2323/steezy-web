import React from 'react';
import Img from './Img';

const HeroBg = ({ playerRef, videoSrc, posterSrc }) => {
  return (
    <div
      className={`
            hero__bg 
            ${/*isVideoPlaying*/ false ? `video-is-playing` : ``} 
            ${/*isVideoAvaible*/ false ? `solid-overlay` : `gradient-overlay`}
          `}
    >
      {!!videoSrc ? (
        <video
          src={videoSrc}
          ref={playerRef}
          loop={true}
          poster={posterSrc}
          playsInline={true}
          autoPlay={true}
          muted={true}
        />
      ) : (
        <Img src={posterSrc} alt='smth' />
      )}
    </div>
  );
};

export default HeroBg;
