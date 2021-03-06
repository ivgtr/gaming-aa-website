import classNames from "classnames";
import pako from "pako";
import React, { useCallback } from "react";
import { useClipboard } from "use-clipboard-copy";
import envJson from "../../assets/json/env.json";
import classes from "./ShareBox.module.scss";

const ShareTweetButton: React.VFC<{ url?: string }> = React.memo(({ url }) => {
  return (
    <button className={classes.tweet_button}>
      <a href={url} className={classes.tweet_link} target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <path d="M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z" />
        </svg>
      </a>
    </button>
  );
});

const ShareUrlForm: React.VFC<{ url: string }> = React.memo(({ url }) => {
  const clipboard = useClipboard();
  const handleClick = useCallback(() => {
    if (url) clipboard.copy(url);
  }, [clipboard, url]);

  return (
    <form className="py-2 max-w-lg w-full" onSubmit={(e) => e.preventDefault()}>
      <div className={classNames("relative rounded-sm w-full", classes.input_box)}>
        <input
          type="text"
          readOnly
          defaultValue={url}
          className={classNames("w-full pr-12 py-1 pl-1", classes.input)}
        />
        <button
          onClick={handleClick}
          className={classNames(
            "absolute right-0 top-0 h-full w-12 text-gray-50 bg-mono rounded-r-sm font-bold",
            classes.button
          )}
        >
          copy
        </button>
      </div>
    </form>
  );
});

export const ShareBox: React.VFC<{ text: string }> = React.memo(({ text }) => {
  const shareUrl = React.useMemo(() => {
    if (text) {
      const url = new URL(`${envJson.url}/aa`);
      const buf = pako.deflateRaw(encodeURIComponent(text), { to: "string" });
      const base64 = Buffer.from(buf).toString("base64");
      url.searchParams.set("text", base64);
      return url.toString();
    } else return envJson.url;
  }, [text]);

  const tweetUrl = React.useMemo(() => {
    if (shareUrl) {
      const url = new URL("http://twitter.com/share");
      url.searchParams.set("url", shareUrl);
      return url.toString();
    } else return undefined;
  }, [shareUrl]);

  return (
    <div className={classNames("flex items-center gap-4 w-full", classes.box)}>
      <ShareUrlForm url={shareUrl} />
      <ShareTweetButton url={tweetUrl} />
    </div>
  );
});
