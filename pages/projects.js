import { useRouter } from 'next/router';
import posed, { PoseGroup } from 'react-pose';
import Footer from '../components/Footer';
import Grid from '../components/Grid';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import NavbarFilter from '../components/NavbarFilter';
import { useViewportSize } from '../hooks/useViewportSize';
import { DataContext } from '../lib/dataContext';
import { getProjects, getServices } from '../lib/fetchData';
import data from '../data';

const PosedGrid = posed(Grid)({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

const DEFALUT_FILTER_UID = 'all';
const DEFAULT_FILTER_NAME = 'Všechno';

const transformProject = ({ node }) => ({
  fields: [
    {
      project: {
        project_name: node.project_name,
        company_name: node.company_name,
        _meta: node._meta,
        intro_image: node.intro_image,
        filter_tags: node.filter_tags,
      },
    },
  ],
});

const Projects = ({ services, projects }) => {
  const { globals, pages } = data;

  const router = useRouter();
  const { w } = useViewportSize();
  const { filterQuery } = router.query;
  const [filter, setFilter] = React.useState(filterQuery || DEFALUT_FILTER_UID);
  const filterTagsFormated = services.services.map(({ service }) => ({
    uid: service._meta.uid,
    displayName: service.service_name,
  }));

  return (
    <DataContext.Provider value={{ ...data, services, projects }}>
      <div className={`projects`}>
        <Header>
          <title>{`${globals.webTitle}\u2002/\u2002${pages.projects.pageName}`}</title>
        </Header>
        <Navbar showBgFrom={() => 0}>
          {w > 1200 && (
            <NavbarFilter
              list={filterTagsFormated}
              defaultFilter={{
                displayName: DEFAULT_FILTER_NAME,
                uid: DEFALUT_FILTER_UID,
              }}
              selectFilter={(filter) => setFilter(filter)}
              activeTag={filter}
            />
          )}
        </Navbar>
        {
          // TODO: you could also check the responsivity and grid bug
          w <= 1200 && w !== 0 && (
            <NavbarFilter
              list={filterTagsFormated}
              defaultFilter={{
                displayName: DEFAULT_FILTER_NAME,
                uid: DEFALUT_FILTER_UID,
              }}
              selectFilter={(filter) => setFilter(filter)}
              activeTag={filter}
            />
          )
        }

        <PoseGroup>
          <PosedGrid
            // every project has multiple filter tags, so thats why there is reduce func
            grid={projects.reduce((acc, curr) => {
              if (filter === DEFALUT_FILTER_UID) {
                return [...acc, transformProject(curr)];
              }

              if (
                curr.node.filter_tags.find(
                  ({ filter_tag }) => filter_tag._meta.uid === filter
                )
              ) {
                return [...acc, transformProject(curr)];
              }

              return acc;
            }, [])}
            key={filter}
            folder={`/project`}
            noCrop={false}
            addClassName={`square`}
            disableAnim={true}
          />
        </PoseGroup>
        <Footer />
      </div>
    </DataContext.Provider>
  );
};

export async function getServerSideProps({ previewData }) {
  const projects = getProjects('cs-cz', previewData);
  const services = getServices('cs-cz', previewData);

  const [projectData, servicesData] = await Promise.all([projects, services]);

  return { props: { projects: projectData, services: servicesData } };
}

export default Projects;
