import { AppProps } from "next/app";
import React from "react";
import "../assets/styles/global.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
