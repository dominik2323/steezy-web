import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Grid from '../components/Grid';
import NavbarFilter from '../components/NavbarFilter';
import { useRouter } from 'next/router';
import { DataContext } from '../pages/_app';
import { useViewportSize } from '../hooks/useViewportSize';

const Projects = () => {
  const { globals, pages } = React.useContext(DataContext);
  const { projects } = globals;
  const router = useRouter();
  const { w } = useViewportSize();
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
          img: `${curr.id}/${curr.intro.img}`,
          alt: curr.name,
          client: curr.client,
          tags: curr.tags
        }
      ];
    }
    return acc;
  }, []);

  const gridArray = [gridData];

  return (
    <div className={`projects`}>
      <Header>
        <title>{`${globals.webTitle}\u2002/\u2002${pages.projects.pageName}`}</title>
      </Header>
      <Navbar>
        {w > 1200 && (
          <NavbarFilter
            list={pages.projects.filterTags}
            selectFilter={selectFilter}
            activeTag={filter}
          />
        )}
      </Navbar>
      {w <= 1200 && (
        <NavbarFilter
          list={pages.projects.filterTags}
          selectFilter={selectFilter}
          activeTag={filter}
        />
      )}
      {
        <Grid
          grid={gridArray}
          folder={`/project`}
          noCrop={false}
          square={true}
        />
      }
      <Footer />
    </div>
  );
};

export default Projects;
