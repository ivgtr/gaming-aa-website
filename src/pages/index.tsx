import React from "react";
import { PageContents } from "../components/PageContents";
import { PageWrapper } from "../components/PageWrapper";

export default function App() {
  return (
    <PageWrapper>
      <h1 className="p-4 font-bold text-xl">ゲーミング AA</h1>
      <PageContents />
    </PageWrapper>
  );
}
