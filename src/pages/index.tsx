import Head from "next/head";
import React from "react";
import envJson from "../assets/json/env.json";
import { PageContents } from "../components/PageContents";
import { PageHeader } from "../components/PageHeader";
import { PageWrapper } from "../components/PageWrapper";

export default function MainPage() {
  const title = "Gaming AA Website";
  const description = "次の時代はGaming Ascii Art です。乗り遅れないで。";
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <meta name="viewport" content="width=device-width,height=device-height" key="viewport" />
        <meta name="theme-color" content="#087da1" key="themeColor" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={envJson.url} />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={`${envJson.url}api/ogp`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@ivgtr" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <PageHeader />
        <PageContents />
      </PageWrapper>
    </>
  );
}
