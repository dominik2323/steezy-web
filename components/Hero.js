import React from 'react';
import Div100vh from 'react-div-100vh';

import 'video-react/styles/scss/video-react.scss';
import HeroBg from './HeroBg';
import { useViewportSize } from '../hooks/useViewportSize';

const Hero = ({
  className,
  children,
  playerRef,
  posterSrc,
  videoSrc = ``,
  loopSrc = ``,
  heroHeight = `100rvh`,
}) => {
  const { h } = useViewportSize();
  const isVideoAvaible = !!videoSrc;

  React.useEffect(() => {
    if (isVideoAvaible) {
      const heroEl = document.getElementById(`hero_${videoSrc}`);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              playerRef.current.pause();
            } else if (entry.isIntersecting) {
              playerRef.current.play();
            }
          });
        },
        {
          rootMargin: `0px 0px -${0}px 0px`,
        }
      );

      observer.observe(heroEl);

      return () => {
        observer.unobserve(heroEl);
      };
    }
  }, [videoSrc]);

  return (
    <Div100vh style={{ height: heroHeight }}>
      <div className={`hero ${className}__hero`} id={`hero_${videoSrc}`}>
        {children.content && (
          <div
            className={`
            hero__content
            ${/*!isVideoPaused*/ false ? `video-is-playing` : ``}`}
          >
            {children.content}
          </div>
        )}

        {children.footer}
        <HeroBg
          videoSrc={videoSrc}
          posterSrc={posterSrc}
          playerRef={playerRef}
          // isVideoPlaying={!isVideoPaused}
          loopSrc={loopSrc}
        />
      </div>
    </Div100vh>
  );
};

export default Hero;
