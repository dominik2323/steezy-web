import { DataContext } from '../pages/_app';
import { scrollTo } from '../hooks/scrollTo';
import { useViewportSize } from '../hooks/useViewportSize';
import { useRouter } from 'next/router';

import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Hero from '../components/Hero';
import IntroText from '../components/IntroText';
import HeroFooterLogotypes from '../components/HeroFooterLogotypes';
import ServicesItem from '../components/ServicesItem';
import Footer from '../components/Footer';
import NavbarFilter from '../components/NavbarFilter';
import ClientLogotypes from '../components/ClientLogotypes';

const Services = () => {
  const { globals, pages } = React.useContext(DataContext);
  const [activeSection, setActiveSection] = React.useState([]);
  const router = useRouter();
  const { h } = useViewportSize();

  const { hero, content, pageName } = pages.services;
  const { section } = router.query;

  React.useEffect(() => {
    section && scrollTo(section);

    const handleIntersection = entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          setActiveSection(target.id);
        }
      });
    };

    const isEven = h % 2 === 0;
    const margin = isEven ? h / 2 - 1 : Math.floor(h / 2);

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: `${-1 * margin}px 0px`
    });
    content.forEach(({ id }) => observer.observe(document.getElementById(id)));

    return () => observer.disconnect();
  }, [h]);

  return (
    <React.Fragment>
      <Header>
        <title>{`${globals.webTitle}\u2002/\u2002${pageName}`}</title>
      </Header>
      <div className="services">
        <Navbar>
          <NavbarFilter
            list={content.map(x => ({ id: x.id, displayName: x.name }))}
            selectFilter={id => scrollTo(id)}
            activeTag={activeSection}
          />
        </Navbar>
        <Hero posterSrc={`/static/img/services/${hero.posterSrc}`}>
          {{
            content: <h1>{hero.header}</h1>,
            footer: <HeroFooterLogotypes />
          }}
        </Hero>
        {content.map(({ name, perex, id, bullets, img, grid }) => (
          <ServicesItem
            key={name}
            name={name}
            id={id}
            grid={grid}
            perex={perex}
            bullets={bullets}
            img={img}
            projects={globals.projects}
          />
        ))}
        <ClientLogotypes />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Services;
