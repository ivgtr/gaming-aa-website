import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import sampleJson from "../../assets/json/sample.json";
import classes from "./PageContents.module.scss";
import { PageContentsButtons } from "./PageContentsButtons";
import { PageContentsPalettes } from "./PageContentsPalettes";

export const PageContents: React.VFC = () => {
  const { query } = useRouter();
  const [AA, setAA] = useState<string>("");
  const [palette, setPalette] = useState<string[]>([
    "#40e0d0",
    "#41e081",
    "#e0d041",
    "#ff8c00",
    "#ff0080",
    "#d041e0",
  ]);

  useEffect(() => {
    document.documentElement.style.setProperty("--gradient-color", palette.join(","));
  }, [palette]);

  useEffect(() => {
    if (Object.keys(query) && typeof query?.text === "string") {
      setAA(decodeURI(query.text));
    }
  }, [query]);

  return (
    <div className="px-6 overflow-hidden">
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
            // console.log(encodeURI(e.target.value))
          }}
        ></textarea>
      </div>
      <div>
        <PageContentsButtons aa_samples={sampleJson.aa_samples} setAA={setAA} />
      </div>
      <div className="mt-4">
        <PageContentsPalettes color_samples={sampleJson.color_samples} setPalette={setPalette} />
      </div>
      <div>
        <p className="py-4 text-gray-50">↓</p>
      </div>
      <div>
        <p className={classes.gaming}>
          {AA.split("\n").map((str, index) => (
            <React.Fragment key={index}>
              {str}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};
