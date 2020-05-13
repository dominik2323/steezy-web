import React from 'react';
import App from 'next/app';
import dynamic from 'next/dynamic';
import data from '../data';

// const gaInit = dynamic(() => import('../lib/ga'), { ssr: false });
import GAListener from '../lib/ga';
import '../scss/index.scss';

export const DataContext = React.createContext();

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <GAListener>
        <DataContext.Provider value={data}>
          <Component {...pageProps} />
        </DataContext.Provider>
      </GAListener>
    );
  }
}

export default MyApp;
