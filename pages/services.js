import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HeroFooterLogotypes from '../components/HeroFooterLogotypes';
import Navbar from '../components/Navbar';
import NavbarFilter from '../components/NavbarFilter';
import ServicesItem from '../components/ServicesItem';
import { scrollTo } from '../hooks/scrollTo';
import { useViewportSize } from '../hooks/useViewportSize';
import { DataContext } from '../lib/dataContext';
import data from '../data';
import { getServices } from '../lib/fetchData';

const Services = ({ services }) => {
  const { globals, pages, components } = data;
  const [activeSection, setActiveSection] = React.useState([]);
  const router = useRouter();
  const { w, h } = useViewportSize();

  const { ourServices } = components.button;
  const { section } = router.query;

  React.useEffect(() => {
    section && scrollTo(section);

    const handleIntersection = (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          setActiveSection(target.id);
        }
      });
    };

    const isEven = h % 2 === 0;
    const margin = isEven ? h / 2 - 1 : Math.floor(h / 2);
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: `${-1 * margin}px 0px`,
    });

    services.services.forEach(({ service }) =>
      observer.observe(document.getElementById(service._meta.id))
    );
    return () => observer.disconnect();
  }, []);

  return (
    <DataContext.Provider value={{ ...data, services }}>
      <Header>
        <title>{`${globals.webTitle}\u2002/\u2002${services.page_name}`}</title>
      </Header>
      <div className='services'>
        <Navbar>
          <NavbarFilter
            list={services.services.map(({ service }) => ({
              id: service._meta.id,
              displayName: service.service_name,
            }))}
            selectFilter={(id) => scrollTo(id)}
            activeTag={activeSection}
          />
        </Navbar>
        <Hero
          posterSrc={services.hero_image.url}
          key={`${w}services`}
          heroHeight={`100rvh`}
        >
          {{
            content: (
              <React.Fragment>
                <h1>{services.hero_header}</h1>
                <Button
                  label={ourServices}
                  handleClick={() => scrollTo(`services__content`)}
                  className={`btn--filled`}
                />
              </React.Fragment>
            ),
            footer: <HeroFooterLogotypes />,
          }}
        </Hero>
        <div className={`services__content`} id={`services__content`}>
          {services.services.map(({ service }) => (
            <ServicesItem
              key={service._meta.id}
              btn={'btn'}
              name={service.service_name}
              id={service._meta.id}
              grid={service.projects}
              perex={RichText.asText(service.perex)}
              // Prismic doesn't allow to have arrays in a slice items
              // So we have to transform rich text into array
              bullets={service.bullets}
              img={service.lottie_icon}
            />
          ))}
        </div>
        <Footer />
      </div>
    </DataContext.Provider>
  );
};

export async function getServerSideProps({ previewData }) {
  const services = await getServices('cs-cz', previewData);

  return { props: { services: services } };
}
export default Services;
