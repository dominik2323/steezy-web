import React, { Fragment, useRef } from 'react';
import Head from 'next/head';

import { DataContext } from './_app';
import Router from 'next/router';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Grid from '../components/Grid';
import Footer from '../components/Footer';
import HeroFooterLogotypes from '../components/HeroFooterLogotypes';
import Button from '../components/Button';
import IntroText from '../components/IntroText';
import ServicesOverview from '../components/ServicesOverview';

const Homepage = () => {
  const playerRef = useRef(null);

  const { pages, globals, components } = React.useContext(DataContext);
  const { hero, intro, about, grid: gridRef } = pages.homepage;
  const { content: servicesContent } = pages.services;

  const transformServicesContent = servicesContent.map(({ name, bullets }) => ({
    header: name,
    bullet: bullets.map(({ header }) => `${header}, `)
  }));

  const transformedGridData = transformGridReferencesIntoGrid(
    Object.values(gridRef),
    globals.projects
  );
  return (
    <React.Fragment>
      <Head>
        <title>{globals.webTitle}</title>
      </Head>

      <div className="homepage container-fluid">
        <Navbar />

        <Hero
          posterSrc={`/static/img/homepage/hero_homepage.png`}
          videoSrc={`/static/img/homepage/steezy_showreel.mp4`}
          playerRef={playerRef}
        >
          {{
            content: (
              <Fragment>
                <h1 className="homepage__hero__content__header">
                  {hero.header}
                </h1>
                <Button
                  label={components.button.playShowreel}
                  playIcon
                  handleClick={() => playerRef.current.play()}
                />
              </Fragment>
            ),
            footer: <HeroFooterLogotypes />
          }}
        </Hero>

        <IntroText
          perex={intro.perex}
          tags={transformServicesContent}
          numbered={true}
        >
          <Button
            label={components.button.howCanWeHelp}
            handleClick={async () => {
              await Router.push({ pathname: '/services' });
              window.scrollTo(0, 0);
            }}
          />
        </IntroText>

        {/* <ServicesOverview
          services={globals.services}
          className={`homepage__services-overview`}
        />*/}

        <Grid grid={transformedGridData} folder={`/project`} />
        <Button
          label={components.button.allProjects}
          handleClick={async () => {
            await Router.push({ pathname: '/projects' });
            window.scrollTo(0, 0);
          }}
          style={{ margin: 'auto' }}
        />

        <div className="homepage__about">
          <p>{about.paragraph}</p>
          <Button
            label={components.button.aboutStudio}
            handleClick={async () => {
              await Router.push({ pathname: '/about' });
              window.scrollTo(0, 0);
            }}
          />
        </div>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Homepage;

export const transformGridReferencesIntoGrid = (gridRef, projects) => {
  const findData = ({ id, type }) => {
    const fullProject = projects.find(project => project.id === id);
    if (type === `project`) {
      return {
        img: `${id}/${fullProject.hero.posterSrc}`,
        alt: fullProject.name,
        name: fullProject.name,
        client: fullProject.client,
        tags: fullProject.tags,
        id: id
      };
    } else if (type === `reference`) {
      return {
        name: fullProject.reference.name,
        position: fullProject.reference.position,
        client: fullProject.reference.client,
        quote: fullProject.reference.quote,
        img: fullProject.reference.img,
        id: id
      };
    } else if (type === `video`) {
      return {
        videoVimeoId: fullProject.intro.videoVimeoId,
        id: id
      };
    }
  };

  const handleRow = row =>
    row.map(({ id, type }) => findData({ id: id, type: type }));

  const grid = gridRef.map(row => handleRow(row));
  return grid;
};
