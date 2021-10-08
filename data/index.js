import button from "./components/buttonData";
import footer from "./components/footerData";
import heroFooterLogotypes from "./components/heroFooterLogotypesData";
import navbar from "./components/navbarData";
import clientLogos from "./components/clientLogosData";
import buttonEn from "./components/buttonDataEn";
import footerEn from "./components/footerDataEn";
import heroFooterLogotypesEn from "./components/heroFooterLogotypesDataEn";
import navbarEn from "./components/navbarDataEn";
import clientLogosEn from "./components/clientLogosDataEn";

import globals from "./globals/globalsData";
import globalsEn from "./globals/globalsDataEn";
import projects from "./globals/projectsData";

import homepage from "./pages/homepageData";
import about from "./pages/aboutData";
import projectDetail from "./pages/projectDetailData";
import services from "./pages/servicesData";
import projectsOverview from "./pages/projectsData";
import homepageEn from "./pages/homepageDataEn";
import aboutEn from "./pages/aboutDataEn";
import projectDetailEn from "./pages/projectDetailDataEn";
import servicesEn from "./pages/servicesDataEn";
import projectsOverviewEn from "./pages/projectsDataEn";

export default {
  "cs-CZ": {
    components: {
      button: button,
      footer: footer,
      heroFooterLogotypes: heroFooterLogotypes,
      navbar: navbar,
      clientLogos: clientLogos,
    },
    globals: {
      ...globals,
      projects: projects,
      services: services,
    },
    pages: {
      homepage: homepage,
      about: about,
      projectDetail: projectDetail,
      services: services,
      projects: projectsOverview,
    },
  },
  "en-GB": {
    components: {
      button: buttonEn,
      footer: footerEn,
      heroFooterLogotypes: heroFooterLogotypesEn,
      navbar: navbarEn,
      clientLogos: clientLogosEn,
    },
    globals: {
      ...globalsEn,
      projects: projects,
      services: servicesEn,
    },
    pages: {
      homepage: homepageEn,
      about: aboutEn,
      projectDetail: projectDetailEn,
      services: servicesEn,
      projects: projectsOverviewEn,
    },
  },
};
