import React from "react";
import App from "next/app";
import data from "../data";

import GAListener from "../lib/ga";
import "../scss/index.scss";
import "video-react/styles/scss/video-react.scss";

export const DataContext = React.createContext();

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <GAListener>
        <DataContext.Provider value={data[router.locale]}>
          <Component {...pageProps} />
        </DataContext.Provider>
      </GAListener>
    );
  }
}

export default MyApp;
