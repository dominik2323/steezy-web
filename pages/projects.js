import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Grid from '../components/Grid';
import NavbarFilter from '../components/NavbarFilter';
import { useRouter } from 'next/router';
import { DataContext } from '../pages/_app';

const Projects = () => {
  const { globals, pages } = React.useContext(DataContext);
  const { projects } = globals;
  const router = useRouter();
  const { filterQuery } = router.query;
  const [filter, setFilter] = React.useState(
    filterQuery ? filterQuery : pages.projects.filterTags[0].id
  );
  const selectFilter = tag => setFilter(tag);

  const gridData = projects.reduce((acc, curr) => {
    const filterProject =
      filter === pages.projects.filterTags[0].id
        ? true
        : curr.filterTags.includes(filter);
    if (filterProject) {
      return [
        ...acc,
        {
          id: curr.id,
          name: curr.name,
          img: `${curr.id}/${curr.hero.posterSrc}`,
          alt: curr.name,
          client: curr.client,
          tags: curr.tags
        }
      ];
    }
    return acc;
  }, []);

  const gridArray = gridData.reduce((acc, curr, i, arr) => {
    if (i === 0 || i % 3 === 0) {
      let period = [curr];
      period = i + 1 + 1 <= arr.length ? [...period, arr[i + 1]] : [period];
      period = i + 1 + 2 <= arr.length ? [period, [arr[i + 2]]] : [period];
      return period;
    }
    return acc;
  }, []);

  return (
    <div className={`projects`}>
      <Header>
        <title>{`${globals.webTitle}\u2002/\u2002${pages.projects.pageName}`}</title>
      </Header>
      <Navbar>
        <NavbarFilter
          list={pages.projects.filterTags}
          selectFilter={selectFilter}
          activeTag={filter}
        />
      </Navbar>
      <Grid grid={gridArray} folder={`/project`} />
      <Footer />
    </div>
  );
};

export default Projects;
