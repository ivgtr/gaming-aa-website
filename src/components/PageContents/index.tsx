import React, { useState } from "react";
import sampleJson from "../../assets/json/sample.json";
import { Button } from "../Button";

export const PageContents: React.VFC = () => {
  const [AA, setAA] = useState<string>("");
  const [palette, setPalette] = useState<string[]>([
    "#40e0d0",
    "#41e081",
    "#e0d041",
    "#ff8c00",
    "#ff0080",
    "#d041e0",
  ]);

  console.log(palette);

  return (
    <div className="px-6 overflow-hidden">
      <div className="overflow-hidden">
        <textarea
          name="aa-input"
          id="aa-input"
          rows={10}
          placeholder="入力してください"
          value={AA}
          onChange={(e) => {
            setAA(e.target.value);
            // console.log(encodeURI(e.target.value))
          }}
        ></textarea>
      </div>
      <div>
        {sampleJson.aa_samples.map((sample, index) => {
          return (
            <Button
              onClick={() => {
                setAA(decodeURI(sample.value));
              }}
              key={index}
            >
              {sample.title}
            </Button>
          );
        })}
        <Button
          onClick={() => {
            setAA("");
          }}
        >
          リセット
        </Button>
      </div>
      <div className="mt-4 flex">
        {sampleJson.color_samples.map((sample, i) => {
          return (
            <div
              key={i}
              className="flex ml-2"
              onClick={() => {
                setPalette(sample.palette);
              }}
            >
              {sample.palette.map((color, j) => {
                return (
                  <span
                    key={j}
                    style={{ backgroundColor: color }}
                    className="h-6 w-6 inline-block"
                  ></span>
                );
              })}
            </div>
          );
        })}
      </div>
      <div>
        <p className="py-4">↓</p>
      </div>
      <div>
        <p>
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
