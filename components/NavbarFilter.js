import React from 'react';
import { DataContext } from '../pages/_app';

const NavbarFilter = ({ list, selectFilter, activeTag = `` }) => {
  // const { globals } = React.useContext(DataContext);
  // const tagsWithDefaultOpt = globals.tags.concat('všechno').reverse();
  // console.log(list);
  return (
    <ul className={`filter-projects`}>
      {list.map(({ displayName, id }) => (
        <li
          key={id}
          className={activeTag === id ? `active` : ``}
          onClick={() => selectFilter(id)}
        >
          {displayName}
        </li>
      ))}
    </ul>
  );
};

export default NavbarFilter;
