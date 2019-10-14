import React from 'react';
import Link from 'next/link';
import { DataContext } from '../pages/_app';

const ProjectSwitch = ({ neighbourProjects }) => {
  const { nextProjectId, prevProjectId } = neighbourProjects;
  const { globals } = React.useContext(DataContext);
  const selectProject = projectId =>
    globals.projects.find(project => project.id === projectId);

  const nextProject = selectProject(nextProjectId);
  const prevProject = selectProject(prevProjectId);
  return (
    <div className={`project-switch`}>
      <Link href={`/project/[id]`} as={`/project/${prevProjectId}`}>
        <div className={`project-switch__side project-switch__side--left`}>
          <div className={`project-switch__side__nav`}>
            <h3>{prevProject.name}</h3>
          </div>
          <img
            src={`/static/img/project/${prevProjectId}/${prevProject.hero.bg.posterSrc}`}
            alt={``}
          />
        </div>
      </Link>
      <Link href={`/project/[id]`} as={`/project/${prevProjectId}`}>
        <div className={`project-switch__side project-switch__side--right`}>
          <div className={`project-switch__side__nav`}>
            <h3>{nextProject.name}</h3>
          </div>
          <img
            src={`/static/img/project/${nextProjectId}/${nextProject.hero.bg.posterSrc}`}
            alt={``}
          />
        </div>
      </Link>
    </div>
  );
};

export default ProjectSwitch;
