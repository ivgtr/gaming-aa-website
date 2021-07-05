import classNames from "classnames";
import Link from "next/link";
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
        <Link href="/">
          <a>ゲーミング AA</a>
        </Link>
      </h1>
    </header>
  );
};
