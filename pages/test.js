import React from "react";
import { DataContext } from "./_app";

export default () => {
  const { globals } = React.useContext(DataContext);
  const [currentId, setCurrentId] = React.useState(`sparco`);
  const [data, setData] = React.useState([]);
  const { projects } = globals;

  const projectIds = projects.map(project => project.id);

  const projectIdsWithoutActiveId = projectIds.filter(
    projectId => projectId !== currentId
  );

  const currentIndex = projectIds.indexOf(currentId);
  const numOfItems = 6;
  const maxIndex = projectIdsWithoutActiveId.length - 1;

  const magic = number => {
    if (number > maxIndex) {
      return number - maxIndex - 1;
    }
    return number;
  };

  const startIndex =
    currentIndex - 3 < 0 ? maxIndex + currentIndex - 3 : currentIndex - 3;
  const endIndex =
    currentIndex + 3 > maxIndex
      ? currentIndex + 3 - maxIndex
      : currentIndex + 3;

  const makeInterval = numOfItems => {
    if (startIndex > endIndex) {
      // OR condition
      return projectIdsWithoutActiveId.reduce((curr, acc, i, arr) => {
        if (
          magic(i + startIndex) >= startIndex ||
          magic(i + startIndex) <= endIndex
        ) {
          return [...arr, arr[magic(i + startIndex)]];
        }
      }, []);
    } else {
      return projectIdsWithoutActiveId.reduce((curr, acc, i, arr) => {
        if (i >= startIndex && i <= endIndex) {
          return [...arr, arr[i]];
        }
      }, []);
    }
  };

  React.useEffect(() => {
    // setData(makeInterval(numOfItems));
    console.log(makeInterval(numOfItems));
  }, [currentId]);

  return (
    <div
      style={{
        width: `100vw`,
        height: `100vh`,
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`
      }}
    >
      <pre style={{ color: `white`, lineHeight: `1.6em` }}>
        {JSON.stringify(
          {
            /*numOfItems,
            startIndex,
            endIndex,
            currentIndex,
            maxIndex,
            projectIdsWithoutActiveId*/
            data
          },
          null,
          2
        )}
      </pre>
      <div style={{ color: `white`, lineHeight: `1.6em`, marginLeft: 30 }}>
        {projectIdsWithoutActiveId.map(project => (
          <div key={project} onClick={() => setCurrentId(project)}>
            {project}
          </div>
        ))}
      </div>
    </div>
  );
};
