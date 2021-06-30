import React from "react";
import { PageContents } from "../components/PageContents";
import { PageHeader } from "../components/PageHeader";
import { PageWrapper } from "../components/PageWrapper";

export default function App() {
  return (
    <PageWrapper>
      <PageHeader />
      <PageContents />
    </PageWrapper>
  );
}
