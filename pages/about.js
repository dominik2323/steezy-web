import Button from '../components/Button';
import Footer from '../components/Footer';
import Grid from '../components/Grid';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Img from '../components/Img';
import IntroText from '../components/IntroText';
import Navbar from '../components/Navbar';
import { scrollTo } from '../hooks/scrollTo';
import { useViewportSize } from '../hooks/useViewportSize';
import { DataContext } from '../lib/dataContext';
import { getAbout } from '../lib/fetchData';
import data from '../data';

export default function About({ about }) {
  const { globals, components } = data;
  const { button } = components;
  const { w } = useViewportSize();

  return (
    <DataContext.Provider value={{ ...data, about }}>
      <Header>
        <title>{`${globals.webTitle}\u2002/\u2002${about.page_name}`}</title>
      </Header>
      <div className='about container-fluid'>
        <Navbar />
        <Hero
          posterSrc={about.hero_image.url}
          className={`about`}
          key={`${w}about`}
          heroHeight={`100rvh`}
        >
          {{
            content: (
              <div className={`about__hero-content`}>
                <h1>{about.hero_claim}</h1>
                <Button
                  label={button.moreAboutUs}
                  className={`btn--filled`}
                  handleClick={() => scrollTo('about-intro-text')}
                />
              </div>
            ),
            footer: (
              <div className={`hero-footer`}>
                <h5>{'SLEDUJTE NÁS'}</h5>
                <div>
                  {globals.socials.map(({ id, url, img }) => (
                    <a key={id} href={url}>
                      <Img src={`/static/img/globals/${img}`} />
                    </a>
                  ))}
                </div>
              </div>
            ),
          }}
        </Hero>
        <IntroText
          perex={about.perex}
          tags={about.humans}
          id={`about-intro-text`}
        />
        <Grid grid={about.body} addClassName={`no-crop`} />
        <Footer />
      </div>
    </DataContext.Provider>
  );
}

export async function getServerSideProps({ previewData }) {
  const about = await getAbout(`cs-cz`, previewData);

  return { props: { about: about } };
}
