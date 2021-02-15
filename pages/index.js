import React, { Fragment, useRef } from 'react';
import Header from '../components/Header';

import { DataContext } from '../lib/dataContext';
import Router from 'next/router';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Grid from '../components/Grid';
import Footer from '../components/Footer';
import HeroFooterLogotypes from '../components/HeroFooterLogotypes';
import Button from '../components/Button';
import IntroText from '../components/IntroText';
import ClientLogotypes from '../components/ClientLogotypes';
import ModalPlayer from '../components/ModalPlayer';
import { useViewportSize } from '../hooks/useViewportSize';
import { logEvent } from '../lib/ga';
import { getHomapage } from '../lib/fetchData';
import data from '../data';
import { RichText } from 'prismic-dom';

const Homepage = ({ homepage }) => {
  const playerRef = useRef(null);
  const [showModal, toggleModal] = React.useState(false);
  const { globals, components } = data;

  return (
    <DataContext.Provider value={{ ...data, homepage }}>
      <Header>
        <title>{globals.webTitle}</title>
      </Header>

      {showModal && (
        <ModalPlayer
          handleClose={() => {
            toggleModal(false);
            playerRef.current.play();
          }}
        />
      )}

      <div className='homepage container-fluid'>
        <Navbar />

        <Hero
          posterSrc={homepage.hero_poster.url}
          videoSrc={homepage.hero_loop.url}
          playerRef={playerRef}
          heroHeight={`100rvh`}
        >
          {{
            content: (
              <Fragment>
                <div className={`homepage__hero__content__tags`}>
                  {homepage.hero_tags.map(({ tag }) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <h1 className='homepage__hero__content__header'>
                  {homepage.hero_header}
                </h1>
                <Button
                  label={components.button.playShowreel}
                  playIcon
                  className={`btn--filled`}
                  handleClick={() => {
                    toggleModal((showModal) => !showModal);
                    playerRef.current.pause();
                    logEvent({
                      category: `navigation`,
                      action: `play showreel`,
                    });
                  }}
                />
              </Fragment>
            ),
            footer: <HeroFooterLogotypes />,
          }}
        </Hero>

        <IntroText
          perex={homepage.perex}
          tags={homepage.services.map(({ service }) => ({
            id: service._meta.id,
            header: service.service_name,
            content: service.bullets.map(({ header }) => `${header}\n`),
          }))}
          numbered={true}
          handleClick={(id) => {
            Router.push({ pathname: '/services', query: { section: id } });
          }}
        >
          <Button
            label={components.button.howCanWeHelp}
            handleClick={async () => {
              await Router.push({ pathname: '/services' });
              window.scrollTo(0, 0);
            }}
          />
        </IntroText>

        <Grid grid={homepage.body} />
        <Button
          label={components.button.allProjects}
          handleClick={async () => {
            await Router.push({ pathname: '/projects' });
            window.scrollTo(0, 0);
          }}
          style={{ margin: 'auto' }}
        />

        <ClientLogotypes />
        <div
          className='homepage__about'
          style={{ backgroundImage: `url(${homepage.about_studio_img.url})` }}
        >
          <p>{RichText.asText(homepage.about_studio)}</p>
          <Button
            label={components.button.aboutStudio}
            className={`btn--filled`}
            handleClick={async () => {
              await Router.push({ pathname: '/about' });
              window.scrollTo(0, 0);
            }}
          />
        </div>

        <Footer />
      </div>
    </DataContext.Provider>
  );
};

export async function getServerSideProps({ previewData }) {
  const homepage = await getHomapage('cs-cz', previewData);

  return { props: { homepage: homepage } };
}

export default Homepage;

export const transformGridReferencesIntoGrid = (gridRef, projects) => {
  const findData = ({ id, type }) => {
    const fullProject = projects.find((project) => project.id === id);
    if (type === `project`) {
      return {
        img: `${id}/${fullProject.intro.img}`,
        alt: fullProject.name,
        name: fullProject.name,
        client: fullProject.client,
        tags: fullProject.tags,
        id: id,
      };
    } else if (type === `reference`) {
      return {
        name: fullProject.reference.name,
        active: fullProject.reference.active,
        position: fullProject.reference.position,
        client: fullProject.reference.client,
        quote: fullProject.reference.quote,
        img: fullProject.reference.img,
        id: id,
      };
    } else if (type === `video`) {
      return {
        videoVimeoId: fullProject.intro.videoVimeoId,
        id: id,
      };
    }
  };

  const handleRow = (row) =>
    row.map(({ id, type }) => findData({ id: id, type: type }));

  const grid = gridRef.map((row) => handleRow(row));
  return grid;
};
