import React from "react";

import { DataContext } from "../pages/_app";

const ProjectSelector = () => {
  const { globals, components, pages } = React.useContext(DataContext);

  return <div className={`project-selector`}>ProjectSelector</div>;
};

export default ProjectSelector;
