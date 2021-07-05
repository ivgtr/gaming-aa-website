import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import pako from "pako";
import React from "react";
import envJson from "../../assets/json/env.json";
import { PageContents } from "../../components/PageContents";
import { PageFooter } from "../../components/PageFooter";
import { PageHeader } from "../../components/PageHeader";
import { PageWrapper } from "../../components/PageWrapper";

type ServerSideProps = {
  text: string;
};

export async function getServerSideProps(context: GetServerSidePropsContext<ServerSideProps>) {
  if (context.query?.text) {
    const buf = Buffer.from(context.query?.text as string, "base64").toString("utf-8");
    const text = pako.inflateRaw(buf, { to: "string" });
    return {
      props: {
        text: decodeURIComponent(text),
      },
    };
  }
  return {
    notFound: true,
  };
}

const AAPage: NextPage<ServerSideProps> = ({ text }) => {
  const title = "Gaming AA Website";
  const description = "次の時代はGaming Ascii Art です。乗り遅れないで。";
  const ogUrl = React.useMemo(() => {
    if (text) {
      const url = new URL(`${envJson.url}/aa`);
      url.searchParams.set("text", text);
      return url.toString();
    } else return envJson.url;
  }, [text]);

  const ogpUrl = React.useMemo(() => {
    if (text) {
      const url = new URL(`${envJson.url}/api/ogp`);
      url.searchParams.set("text", text);
      return url.toString();
    } else return envJson.url;
  }, [text]);

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
        <meta property="og:url" content={ogUrl} />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={ogpUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@ivgtr" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <PageHeader />
        <PageContents query={text} />
        <PageFooter />
      </PageWrapper>
    </>
  );
};

export default AAPage;
