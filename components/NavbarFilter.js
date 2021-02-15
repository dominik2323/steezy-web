import React from 'react';
import { DataContext } from '../lib/dataContext';

const NavbarFilter = ({
  defaultFilter,
  list,
  selectFilter,
  activeTag = ``,
}) => {
  const filters = defaultFilter ? [defaultFilter, ...list] : list;
  return (
    <ul className={`filter-projects`}>
      {filters.map(({ displayName, uid }) => (
        <li
          key={uid}
          className={activeTag === uid ? `active` : ``}
          onClick={() => selectFilter(uid)}
        >
          {displayName}
        </li>
      ))}
    </ul>
  );
};

export default NavbarFilter;
