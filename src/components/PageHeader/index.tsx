import classNames from "classnames";
import React from "react";
import classes from "./PageHeader.module.scss";

export const PageHeader = () => {
  return (
    <header>
      <h1
        className={classNames(
          "mt-4",
          "px-4",
          "font-bold",
          "text-xl",
          "text-gray-50",
          classes.title
        )}
      >
        ゲーミング AA
      </h1>
      <p className="px-4 mt-2 text-sm text-gray-50">2021/07/01 フォント切替方法を模索中</p>
    </header>
  );
};
