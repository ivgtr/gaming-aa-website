import { AppProps } from "next/app";
import React from "react";
import "../assets/styles/global.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <div className="root">
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default App;
