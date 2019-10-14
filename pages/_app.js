import React from 'react';
import App from 'next/app';
import data from '../data';

import '../scss/index.scss';

export const DataContext = React.createContext();

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <DataContext.Provider value={data}>
        <Component {...pageProps} />
      </DataContext.Provider>
    );
  }
}

export default MyApp;
