import React from 'react';
import App from 'next/app';
import data from '../data';
// import firebase from '../firebase/firebase';

import '../scss/index.scss';

export const DataContext = React.createContext();

class MyApp extends App {
  // async componentDidMount() {
  //   const testRef = await firebase.firestore().collection('components');
  //   let _data = data.components.servicesOverview;
  //   // let { projects, services, ...rest } = data.globals;
  //   // data.forEach(item => testRef.doc('homepage').set(item));
  //   testRef.doc('servicesOverview').set(_data);
  // }
  render() {
    const { Component, pageProps } = this.props;
    // console.log(storage);
    return (
      <DataContext.Provider value={data}>
        <Component {...pageProps} />
      </DataContext.Provider>
    );
  }
}

export default MyApp;
