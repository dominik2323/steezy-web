import React from 'react';
import GAListener from '../lib/ga';
import '../scss/index.scss';

function App({ pageProps, Component }) {
  return (
    <GAListener>
      <Component {...pageProps} />
    </GAListener>
  );
}

export default App;
