import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Grid from '../components/Grid';
import HeroFooterLogotypes from '../components/HeroFooterLogotypes';
import IntroText from '../components/IntroText';

import { DataContext } from '../pages/_app';

export default function About() {
  const { pages, globals } = React.useContext(DataContext);
  const { about } = pages;
  return (
    <React.Fragment>
      <Head>
        <title>{`${globals.webTitle}\u2002/\u2002${about.pageName}`}</title>
      </Head>
      <div className="about container-fluid">
        <Navbar />
        <Hero
          posterSrc={`${process.env.PREFIX}/static/img/about/about_hero.png`}
          className={`about`}
        >
          {{
            content: (
              <div className={`about__hero-content`}>
                <h1>{about.hero.header}</h1>
                <h2>{about.hero.subHeader}</h2>
                <Button
                  label={about.hero.btn}
                  handleClick={() => console.log('about cta')}
                />
              </div>
            ),
            footer: <HeroFooterLogotypes />
          }}
        </Hero>
        <IntroText perex={about.intro.perex} tags={about.intro.tags} />
        <Grid grid={Object.values(about.grid)} folder={`/about`} />
        <Footer />
      </div>
    </React.Fragment>
  );
}
