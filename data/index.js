import button from './components/buttonData';
import footer from './components/footerData';
import heroFooterLogotypes from './components/heroFooterLogotypesData';
import navbar from './components/navbarData';
import clientLogos from './components/clientLogosData';

import globals from './globals/globalsData';
import projects from './globals/projectsData';

import homepage from './pages/homepageData';
import about from './pages/aboutData';
import projectDetail from './pages/projectDetailData';
import services from './pages/servicesData';
import projectsOverview from './pages/projectsData';

export default {
  components: {
    button: button,
    footer: footer,
    heroFooterLogotypes: heroFooterLogotypes,
    navbar: navbar,
    clientLogos: clientLogos
  },
  globals: {
    ...globals,
    projects: projects,
    services: services
  },
  pages: {
    homepage: homepage,
    about: about,
    projectDetail: projectDetail,
    services: services,
    projects: projectsOverview
  }
};
