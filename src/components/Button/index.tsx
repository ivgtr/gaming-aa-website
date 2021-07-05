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
        "pt-1",
        "px-2",
        "relative",
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
      <span className="text-gray-50 text-base h-4 leading-4 align-middle">{props.children}</span>
    </button>
  );
};
