import React from 'react';
import { useRouter } from 'next/router';
import { useGesture } from 'react-use-gesture';

import Grid from './Grid';
import LottieElement from './LottieElement';

import { DataContext } from '../pages/_app';
import { useViewportSize } from '../hooks/useViewportSize';

const ProjectSelector = () => {
  const { globals, components, pages } = React.useContext(DataContext);
  const { projects } = globals;
  const { query } = useRouter();
  const { w } = useViewportSize();
  const { id: activeProjectId } = query;

  const bind = useGesture({
    onDragEnd: e =>
      e.movement[0] !== 0 && shiftIndex(e.movement[0] > 0 ? `DEC` : `INC`),
  });

  const activeProjectIndex = projects.findIndex(
    project => project.id === activeProjectId
  );

  const projectsWithoutActive = projects.filter(
    project => project.id !== activeProjectId
  );

  const maxIndex = projectsWithoutActive.length - 1;

  const [currIndex, setCurrIndex] = React.useState(activeProjectIndex);
  const [data, setData] = React.useState([]);

  const getInterval = (startIndex, endIndex) => {
    if (startIndex > endIndex) {
      return index => index >= startIndex || index <= endIndex;
    }
    return index => index >= startIndex && index <= endIndex;
  };

  const shiftIndex = dir => {
    if (dir === `INC`) {
      setCurrIndex(index => fitIndex(index + 1));
    } else {
      setCurrIndex(index => fitIndex(index - 1));
    }
  };

  const fitIndex = i => {
    if (i > maxIndex) {
      return i - maxIndex - 1;
    } else if (i < 0) {
      return maxIndex + i + 1;
    } else {
      return i;
    }
  };

  React.useEffect(() => {
    let offset = [];
    if (w <= 900 || w > 1200) {
      offset = [3, 3];
    } else if (w <= 1200) {
      offset = [3, 4];
    }
    const startIndex = fitIndex(currIndex - offset[0]);
    const endIndex = fitIndex(currIndex + offset[1]);
    const isInsideInterval = getInterval(startIndex, endIndex);
    const filter = projectsWithoutActive.reduce((acc, curr, i, arr) => {
      if (isInsideInterval(fitIndex(i + startIndex))) {
        return [...acc, arr[fitIndex(i + startIndex)]];
      }
      return acc;
    }, []);
    setData(filter.map(project => transformGridItem(project)));
  }, [currIndex, w]);

  return (
    <div className={`project-selector`} {...bind()}>
      <h4>Další projekty</h4>
      <div className={`project-selector__grid-wrap`}>
        <Grid grid={[data]} folder={`/project`} addClassName={`square`} />
        <LottieElement
          className={`project-selector__arrow project-selector__arrow--right`}
          onClick={() => shiftIndex(`INC`)}
          src={`/static/img/globals/scroll.json`}
          preserveAspectRatio={`xMidYMid meet`}
          autoplay={true}
          noHover={true}
        />
        <LottieElement
          className={`project-selector__arrow project-selector__arrow--left`}
          onClick={() => shiftIndex(`DEC`)}
          src={`/static/img/globals/scroll.json`}
          preserveAspectRatio={`xMidYMid meet`}
          autoplay={true}
          noHover={true}
        />
      </div>
    </div>
  );
};

export default ProjectSelector;

const transformGridItem = ({ id, intro, name, client, tags }) => {
  return {
    img: `${id}/${intro.img}`,
    alt: name,
    name: name,
    client: client,
    tags: tags,
    id: id,
  };
};
