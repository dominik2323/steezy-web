import React from "react";
import Img from "./Img";

const HeroBg = ({ playerRef, videoSrc, posterSrc }) => {
  const isVideoAvaible = videoSrc.split(".").length === 2;
  return (
    <div
      className={`
            hero__bg 
            ${/*isVideoPlaying*/ false ? `video-is-playing` : ``} 
            ${/*isVideoAvaible*/ false ? `solid-overlay` : `gradient-overlay`}
          `}
    >
      {isVideoAvaible ? (
        <video
          src={videoSrc}
          ref={playerRef}
          loop={`true`}
          poster={posterSrc}
          autoPlay={`true`}
          muted={`true`}
        />
      ) : (
        <Img src={posterSrc} alt="smth" />
      )}
    </div>
  );
};

export default HeroBg;
