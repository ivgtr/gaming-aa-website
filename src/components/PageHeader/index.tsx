import classNames from "classnames";
import React from "react";
import classes from "./PageHeader.module.scss";

export const PageHeader = () => {
  return (
    <header>
      <h1 className={classNames("p-4 font-bold text-xl text-gray-50", classes.title)}>
        ゲーミング AA
      </h1>
    </header>
  );
};
