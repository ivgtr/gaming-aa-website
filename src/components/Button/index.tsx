import classNames from "classnames";
import React from "react";
import classes from "./Button.module.scss";

type Props = {
  onClick?: () => void;
  classname?: string;
};

export const Button: React.FC<Props> = (props) => {
  return (
    <button
      className={classNames(
        "leading-8",
        "px-2",
        "text-gray-50",
        "rounded-md",
        "border",
        "border-gray-500",
        "shadow-sm",
        "focus:border-indigo-300",
        "focus:ring",
        "focus:ring-indigo-200",
        "focus:ring-opacity-50",
        "break-normal",
        classes.button,
        props.classname
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
