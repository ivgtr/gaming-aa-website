import React, { useEffect, useState } from "react";
import envJson from "../../assets/json/env.json";
import sampleJson from "../../assets/json/sample.json";
import { GitHubLink } from "../GitHubLink";
import { TwitterShare } from "../TwitterShare";
import classes from "./PageContents.module.scss";
import { PageContentsButtons } from "./PageContentsButtons";

export const PageContents: React.VFC<{ query?: string }> = ({ query }) => {
  const [AA, setAA] = useState<string>("");

  useEffect(() => {
    if (query) setAA(decodeURIComponent(query));
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
              // console.log(encodeURIComponent(e.target.value));
            }}
          ></textarea>
        </div>
        <div className="mt-2">
          <PageContentsButtons aa_samples={sampleJson.aa_samples} setAA={setAA} />
        </div>
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
          <TwitterShare
            url={AA.length > 0 ? `${envJson.url}/aa/${encodeURIComponent(AA)}` : envJson.url}
          />
          <GitHubLink />
        </div>
      </div>
    </>
  );
};
