import React from 'react';
import { useRouter } from 'next/router';
import posed, { PoseGroup } from 'react-pose';
import Link from 'next/link';
import Head from 'next/head';

import { DataContext } from '../../pages/_app';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Grid from '../../components/Grid';
import ProjectSwitch from '../../components/ProjectSwitch';
import useFixedNav from '../../hooks/useFixedNav';
import { scrollTo } from '../../hooks/scrollTo';
import Hero from '../../components/Hero';
import ProjectSelector from '../../components/ProjectSelector';
import Button from '../../components/Button';
import IntroText from '../../components/IntroText';
import NavbarFilter from '../../components/NavbarFilter';
import LottieElement from '../../components/LottieElement';
import { transformGridReferencesIntoGrid } from '../';

const transformIntroTags = (header, bullet) => [
  {
    header: header.cooperation,
    bullet: bullet.cooperation,
  },
  {
    header: header.role,
    bullet: bullet.tags.map(tag => `${tag}, `),
  },
  {
    header: header.realisation,
    bullet: bullet.year,
  },
  {
    header: header.location,
    bullet: bullet.location,
  },
];

const Project = () => {
  const router = useRouter();
  const { id: projectId } = router.query;
  const playerRef = React.useRef(null);

  const { globals, components, pages } = React.useContext(DataContext);
  const { projects } = globals;
  const { button, projectDetail } = components;

  const project = projects.find(x => x.id === projectId);
  const isVideoAvaible = project.hero.videoSrc.length !== 0;
  const introTags = transformIntroTags(pages.projectDetail, project);

  const transformGridIntoArr = Object.values(project.presentation);
  const projectWithReference = transformGridIntoArr.concat([
    [Object.assign({}, project.reference, { landscape: true, id: projectId })],
  ]);

  if (project === undefined) {
    return <h1>project not found</h1>;
  }

  return (
    <React.Fragment>
      <Head>
        <title>{`Studio STEEZY\u2002|\u2002${project.name}`}</title>
      </Head>
      <Navbar />
      <Hero
        posterSrc={`/static/img/project/${projectId}/${project.hero.posterSrc}`}
        videoSrc={`/static/img/project/${projectId}/${project.hero.videoSrc}`}
        className={`project`}
        playerRef={playerRef}>
        {{
          footer: (
            <div className={`hero-footer project__hero__footer`}>
              <div className={`project__hero__footer__content`}>
                <h4>{project.name}</h4>
                <h5>{project.client}</h5>
              </div>
              <LottieElement
                className={`project__hero__footer__scroll`}
                key={`scroll-icon`}
                src={`/static/img/globals/scroll.json`}
                handleClick={() => scrollTo(`introText${projectId}`)}
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
        id={`introText${projectId}`}
        perex={project.introText.about}
        tags={project.introText.tags}
      />
      <Grid
        key={projectId}
        grid={projectWithReference}
        folder={`/project/${projectId}`}
        addClassName={`no-crop`}
      />
      <ProjectSelector key={`selector-${projectId}`} />
      <Footer />
    </React.Fragment>
  );
};

Project.getInitialProps = async () => {
  return {};
};

export default Project;

/*

NAV ARROWS

<div className="project__arrows">
  <Link
    href={`/project/[id]`}
    as={`/project/${neighbourProjects.prevProjectId}`}
  >
    <div
      className="project__arrows__arrow project__arrows__arrow--left"
      onClick={() => setDirection(-1)}
    />
  </Link>
  <Link
    href={`/project/[id]`}
    as={`/project/${neighbourProjects.nextProjectId}`}
  >
    <div
      className="project__arrows__arrow project__arrows__arrow--right"
      onClick={() => setDirection(1)}
    />
  </Link>
</div>

*/

// const currentIndex = projects.indexOf(project);

// const nextProjects = () => {
//   function next() {
//     const overflow = currentIndex + 1 + 3 - projects.length;

//     if (overflow === 1) {
//       return [
//         projects[currentIndex + 1],
//         projects[currentIndex + 2],
//         projects[0]
//       ];
//     } else if (overflow === 2) {
//       return [projects[currentIndex + 1], projects[0], projects[1]];
//     } else if (overflow === 3) {
//       return [projects[0], projects[1], projects[2]];
//     } else {
//       return projects.slice(currentIndex + 1, currentIndex + 1 + 3);
//     }
//   }

//   return [
//     next().map(item => ({
//       img: `${item.id}/${item.intro.img}`,
//       alt: item.name,
//       name: item.name,
//       client: item.client,
//       tags: item.tags,
//       id: item.id
//     }))
//   ];
// };

// const findNeighbourProjects = () => {
//   const projectsLength = projects.length;
//   let prevProjectIndex, nextProjectIndex;

//   if (currentIndex === 0) {
//     prevProjectIndex = projectsLength - 1;
//     nextProjectIndex = 1;
//   } else if (currentIndex === projectsLength - 1) {
//     prevProjectIndex = projectsLength - 1 - 1;
//     nextProjectIndex = 0;
//   } else {
//     nextProjectIndex = currentIndex + 1;
//     prevProjectIndex = currentIndex - 1;
//   }

//   return {
//     prevProjectId: projects[prevProjectIndex].id,
//     nextProjectId: projects[nextProjectIndex].id
//   };
// };

// const neighbourProjects = findNeighbourProjects();

// const PosedProject = posed.div({
//   preEnter: {
//     x: ({ direction }) => `${direction * -100}vw`,
//     transition: { duration: 400 }
//   },
//   enter: {
//     x: "0vw",
//     transition: { duration: 400 }
//   },
//   exit: {
//     x: ({ direction }) => `${direction * 100}vw`,
//     transition: { duration: 400 }
//   }
// });
