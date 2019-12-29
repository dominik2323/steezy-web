import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Grid from '../components/Grid';
import HeroFooterLogotypes from '../components/HeroFooterLogotypes';
import IntroText from '../components/IntroText';
import Img from '../components/Img';
import { scrollTo } from '../hooks/scrollTo';

import { DataContext } from '../pages/_app';

export default function About() {
  const { pages, globals, components } = React.useContext(DataContext);
  const { about } = pages;
  const { button } = components;
  return (
    <React.Fragment>
      <Head>
        <title>{`${globals.webTitle}\u2002/\u2002${about.pageName}`}</title>
      </Head>
      <div className='about container-fluid'>
        <Navbar />
        <Hero
          posterSrc={`/static/img/about/${about.hero.img}`}
          className={`about`}>
          {{
            content: (
              <div className={`about__hero-content`}>
                <h1>{about.hero.header}</h1>
                <Button
                  label={button.moreAboutUs}
                  className={`btn--filled`}
                  handleClick={() => scrollTo('about-intro-text')}
                />
              </div>
            ),
            footer: (
              <div className={`hero-footer`}>
                <h5>{about.hero.footer.header.toUpperCase()}</h5>
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
          perex={about.introText.about}
          tags={about.introText.tags}
          id={`about-intro-text`}
        />
        <Grid
          grid={Object.values(about.grid)}
          folder={`/about`}
          addClassName={`no-crop`}
        />
        <Footer />
      </div>
    </React.Fragment>
  );
}
