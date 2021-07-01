import React, { useEffect, useState } from "react";
import sampleJson from "../../assets/json/sample.json";
// import { PageContentsPalettes } from "./PageContentsPalettes";
import { GitHubLink } from "../GitHubLink";
import { TwitterShare } from "../TwitterShare";
import classes from "./PageContents.module.scss";
import { PageContentsButtons } from "./PageContentsButtons";

export const PageContents: React.VFC<{ query?: string }> = ({ query }) => {
  const [AA, setAA] = useState<string>("");
  // const [palette, setPalette] = useState<string[]>([
  //   "#40e0d0",
  //   "#41e081",
  //   "#e0d041",
  //   "#ff8c00",
  //   "#ff0080",
  //   "#d041e0",
  // ]);

  // useEffect(() => {
  //   document.documentElement.style.setProperty("--gradient-color", palette.join(","));
  // }, [palette]);

  useEffect(() => {
    if (query) setAA(decodeURI(query));
  }, [query]);

  return (
    <>
      <div className="mt-4 px-6 overflow-hidden">
        <div className="overflow-hidden">
          <textarea
            name="aa-input"
            id="aa-input"
            rows={10}
            placeholder="入力してください"
            className={classes.textarea}
            value={AA}
            onChange={(e) => {
              setAA(e.target.value);
              // console.log(encodeURI(e.target.value));
            }}
          ></textarea>
        </div>
        <div className="mt-2">
          <PageContentsButtons aa_samples={sampleJson.aa_samples} setAA={setAA} />
        </div>
        {/* <div className="mt-2">
          <PageContentsPalettes color_samples={sampleJson.color_samples} setPalette={setPalette} />
        </div> */}
        <div>
          <p className="py-4 text-gray-50">↓</p>
        </div>
        <div className="overflow-x-auto">
          <p className={classes.gaming}>{AA}</p>
          <div className="my-12">
            <pre className={classes.gaming}>{AA}</pre>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap gap-2">
          <TwitterShare />
          <GitHubLink />
        </div>
      </div>
    </>
  );
};
