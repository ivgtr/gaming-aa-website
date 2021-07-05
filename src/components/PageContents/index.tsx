import classNames from "classnames";
import React, { useEffect, useState } from "react";
import sampleJson from "../../assets/json/sample.json";
import { ShareBox } from "../ShareBox";
import classes from "./PageContents.module.scss";
import { PageContentsButtons } from "./PageContentsButtons";

function checkLanguage(decodeText: string): boolean {
  let flag: boolean = false;
  for (let i = 0; i < decodeText.length; i++) {
    const code = decodeText.charCodeAt(i);
    if (code >= 256) {
      flag = true;
      break;
    }
  }
  return flag;
}

export const PageContents: React.VFC<{ query?: string }> = ({ query }) => {
  const [AA, setAA] = useState<string>(query ? decodeURI(query) : "");
  const [lang, setLang] = useState<"ja" | "en">("ja");

  useEffect(() => {
    setLang(checkLanguage(AA) ? "ja" : "en");
  }, [AA]);

  return (
    <div className="mt-4 px-6">
      <div className="overflow-hidden">
        <textarea
          name="aa-input"
          id="aa-input"
          rows={10}
          placeholder="入力してください"
          className={classNames(classes.textarea, lang === "ja" ? classes.ja : classes.en)}
          value={AA}
          onChange={(e) => {
            e.preventDefault();
            setAA(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="mt-2">
        <PageContentsButtons aa_samples={sampleJson.aa_samples} setAA={setAA} />
      </div>
      <div>
        <p className="py-4 text-gray-50">↓</p>
      </div>
      <div className="overflow-x-auto pb-4">
        <p className={classNames(classes.gaming, lang === "ja" ? classes.ja : classes.en)}>{AA}</p>
      </div>
      <section className="mt-12">
        <h3 className={classNames("text-gray-50 text-lg", classes.title)}>Share</h3>
        <ShareBox text={AA} />
      </section>
    </div>
  );
};
