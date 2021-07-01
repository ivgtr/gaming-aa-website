import React from "react";
import { Button } from "../../Button";

type Props = {
  aa_samples: { title: string; value: string }[];
  setAA: React.Dispatch<React.SetStateAction<string>>;
};

export const PageContentsButtons: React.VFC<Props> = React.memo(({ aa_samples, setAA }) => {
  return (
    <div className="flex flex-wrap">
      {aa_samples.map((sample, index) => {
        return (
          <Button
            onClick={() => {
              setAA(decodeURI(sample.value));
            }}
            key={index}
            classname="mr-2 last:mr-0 mt-2"
          >
            {sample.title}
          </Button>
        );
      })}
      <Button
        onClick={() => {
          setAA("");
        }}
        classname="mr-2 last:mr-0 mt-2"
      >
        リセット
      </Button>
    </div>
  );
});
