import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Grid from '../components/Grid';
import NavbarFilter from '../components/NavbarFilter';
import { useRouter } from 'next/router';
import { DataContext } from '../pages/_app';
import { useViewportSize } from '../hooks/useViewportSize';
import posed, { PoseGroup } from 'react-pose';

const PosedGrid = posed(Grid)({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});
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
          tags: curr.tags,
        },
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
      <Navbar showBgFrom={() => 0}>
        {w > 1200 && (
          <NavbarFilter
            list={pages.projects.filterTags}
            selectFilter={selectFilter}
            activeTag={filter}
          />
        )}
      </Navbar>

      {/* width must wait for the DOM to load and in the meatime its value is 0 */}

      {w <= 1200 && w !== 0 && (
        <NavbarFilter
          list={pages.projects.filterTags}
          selectFilter={selectFilter}
          activeTag={filter}
        />
      )}
      <PoseGroup>
        <PosedGrid
          grid={gridArray}
          key={filter}
          folder={`/project`}
          noCrop={false}
          addClassName={`square`}
          disableAnim={true}
        />
      </PoseGroup>
      <Footer />
    </div>
  );
};

export default Projects;
