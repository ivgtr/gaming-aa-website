import React from "react";
import { TwitterIcon, TwitterShareButton } from "react-share";
import envJson from "../../assets/json/env.json";

export const TwitterShare: React.VFC = () => {
  return (
    <TwitterShareButton url={envJson.url} title={"次の時代はGaming AA"}>
      <TwitterIcon size={32} round />
    </TwitterShareButton>
  );
};
