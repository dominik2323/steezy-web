import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Grid from '../../components/Grid';
import Hero from '../../components/Hero';
import IntroText from '../../components/IntroText';
import LottieElement from '../../components/LottieElement';
import ProjectSelector from '../../components/ProjectSelector';
import Navbar from '../../components/Navbar';
import { scrollTo } from '../../hooks/scrollTo';
import { DataContext } from '../../lib/dataContext';
import data from '../../data';
import { getProjects } from '../../lib/fetchData';

const Project = ({ projects }) => {
  const router = useRouter();
  const { id: uidQuery } = router.query;
  const playerRef = React.useRef(null);

  // const { projects, globals, components, pages } = React.useContext(
  //   DataContext
  // );

  const { button, projectDetail } = data.components;

  const { node: project } = projects.find(
    ({ node }) => node._meta.uid === uidQuery
  );

  return (
    <DataContext.Provider value={{ ...data, projects }}>
      <div className={`project`}>
        <Head>
          <title>{`Studio STEEZY\u2002|\u2002${project.project_name}`}</title>
        </Head>
        <Navbar />
        <Hero
          posterSrc={project?.hero_image?.url}
          videoSrc={project?.hero_loop?.url}
          className={`project`}
          playerRef={playerRef}
        >
          {{
            footer: (
              <div className={`hero-footer project__hero__footer`}>
                <div className={`project__hero__footer__content`}>
                  <h4>{project.project_name}</h4>
                  <h5>{project.company_name}</h5>
                </div>
                <LottieElement
                  className={`project__hero__footer__scroll`}
                  key={`scroll-icon`}
                  src={`/static/img/globals/scroll.json`}
                  handleClick={() => scrollTo(`introText${uidQuery}`)}
                  autoplay={true}
                  noHover={true}
                />
              </div>
            ),
            content: false && (
              <Button
                label={button.playShowreel}
                playIcon
                handleClick={() => playerRef.current.play()}
              />
            ),
          }}
        </Hero>
        <IntroText
          id={`introText${uidQuery}`}
          perex={project.perex}
          tags={project.roles_group}
        />
        <Grid
          key={uidQuery}
          grid={[
            ...(project.body || []),
            // adds reference to the project object
            {
              fields: [
                {
                  reference: project,
                },
              ],
            },
          ]}
          addClassName={`no-crop`}
        />
        <ProjectSelector key={`selector-${uidQuery}`} />
        <Footer />
      </div>
    </DataContext.Provider>
  );
};

export async function getServerSideProps({ previewData }) {
  const projects = await getProjects(null, previewData);

  return { props: { projects: projects } };
}

export default Project;
