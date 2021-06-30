import React from "react";

type Props = {
  color_samples: { title: string; palette: string[] }[];
  setPalette: React.Dispatch<React.SetStateAction<string[]>>;
};

export const PageContentsPalettes: React.VFC<Props> = React.memo(
  ({ color_samples, setPalette }) => {
    return (
      <div className="flex">
        {color_samples.map((sample, i) => {
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
    );
  }
);
