import React from 'react';
import Img from './Img';

const HeroBg = ({ playerRef, isVideoPlaying, videoSrc, posterSrc }) => {
  const isVideoAvaible = videoSrc.split('.').length === 2;
  return (
    <div
      className={`
            hero__bg 
            ${isVideoPlaying ? `video-is-playing` : ``} 
            ${isVideoAvaible ? `solid-overlay` : `gradient-overlay`}
          `}
      onClick={() => null}
    >
      {isVideoAvaible ? (
        <video
          src={process.env.PREFIX + videoSrc}
          ref={playerRef}
          poster={process.env.PREFIX + posterSrc}
        />
      ) : (
        <Img src={posterSrc} alt="smth" />
      )}
    </div>
  );
};

export default HeroBg;
