import React from 'react';
import ReactGA from 'react-ga';

function initGA() {
  ReactGA.initialize('UA-155086355-1');
  // console.log('GA initialized');
}

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  // console.log(`logged page ${window.location.pathname}`);
}

export function logEvent({ category, action }) {
  ReactGA.event({
    category,
    action,
  });
  // console.log(`logged event: category: ${category}, action: ${action}`);
}

export default function GAListener({ children }) {
  React.useEffect(() => {
    if (!window.GA_INIT) {
      initGA();
      window.GA_INIT = true;
    }
    logPageView();
  });
  return <React.Fragment>{children}</React.Fragment>;
}
