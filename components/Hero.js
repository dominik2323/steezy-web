import React, { Fragment, useRef, useEffect, useState } from 'react';

import 'video-react/styles/scss/video-react.scss';
import HeroFooter from './HeroFooter';
import Button from './Button';
import HeroBg from './HeroBg';
import { useViewportSize } from '../hooks/useViewportSize';

const Hero = ({
  className,
  children,
  playerRef,
  posterSrc,
  videoSrc = ``,
  loopSrc = ``
}) => {
  const [isVideoPaused, setIsVideoPaused] = useState(true);
  const { h } = useViewportSize();
  const toggleVideo = e => setIsVideoPaused(e.target.paused);
  const isVideoAvaible = videoSrc.split('.').length === 2;

  useEffect(() => {
    if (isVideoAvaible) {
      const heroEl = document.getElementById(`hero_${videoSrc}`);

      playerRef.current.addEventListener('play', toggleVideo);
      playerRef.current.addEventListener('pause', toggleVideo);

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting && !playerRef.current.paused) {
              playerRef.current.pause();
            }
          });
        },
        {
          rootMargin: `0px 0px -${h}px 0px`
        }
      );

      observer.observe(heroEl);

      return () => {
        playerRef.current.removeEventListener('play', toggleVideo);
        playerRef.current.removeEventListener('pause', toggleVideo);
        observer.unobserve(heroEl);
      };
    }
  }, []);

  return (
    <Fragment>
      <div className={`hero ${className}__hero`} id={`hero_${videoSrc}`}>
        {children.content && (
          <div
            className={`
            hero__content
            ${!isVideoPaused ? `video-is-playing` : ``}`}
          >
            {children.content}
          </div>
        )}

        <HeroFooter
          isVideoPlaying={!isVideoPaused}
          playerRef={playerRef}
          isVideoAvaible={isVideoAvaible}
        >
          {children.footer}
          {children.arrows}
        </HeroFooter>
        <HeroBg
          videoSrc={videoSrc}
          posterSrc={posterSrc}
          playerRef={playerRef}
          isVideoPlaying={!isVideoPaused}
          loopSrc={loopSrc}
          // isVideoAvaible={isVideoAvaible}
        />
      </div>
    </Fragment>
  );
};

export default Hero;
