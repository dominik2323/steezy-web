import React, { Fragment, useRef, useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';

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
  loopSrc = ``,
}) => {
  const { h } = useViewportSize();
  const isVideoAvaible = videoSrc.split('.').length === 2;

  useEffect(() => {
    if (isVideoAvaible && playerRef.current !== null) {
      const heroEl = document.getElementById(`hero_${videoSrc}`);

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) {
              playerRef.current.pause();
            } else if (entry.isIntersecting) {
              playerRef.current.play();
            }
          });
        },
        {
          rootMargin: `0px 0px -${h}px 0px`,
        }
      );

      observer.observe(heroEl);

      return () => {
        observer.unobserve(heroEl);
      };
    }
  }, [videoSrc]);

  return (
    <Div100vh style={{ height: `100rvh` }}>
      <div className={`hero ${className}__hero`} id={`hero_${videoSrc}`}>
        {children.content && (
          <div
            className={`
            hero__content
            ${/*!isVideoPaused*/ false ? `video-is-playing` : ``}`}>
            {children.content}
          </div>
        )}

        <HeroFooter
          // isVideoPlaying={!isVideoPaused}
          playerRef={playerRef}
          isVideoAvaible={isVideoAvaible}>
          {children.footer}
        </HeroFooter>
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
