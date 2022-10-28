import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";

interface BasicButton {
  type: "link" | "button";
  size: "big" | "middle" | "small";
  text: string;
}

interface LinkButton extends BasicButton {
  type: "link";
  href: string;
}

interface ButtonButton extends BasicButton {
  type: "button";
  href?: string;
}

type ButtonProps = LinkButton | ButtonButton;

export function Button({ type, size, text, href }: ButtonProps) {
  return (
    <>
      {type === "link" ? (
        <Link
          to={href}
          className={clsx(styles.root, {
            [styles.big]: size === "big",
            [styles.middle]: size === "middle",
            [styles.small]: size === "small",
          })}
        >
          {text}
        </Link>
      ) : (
        <button
          className={clsx(styles.root, {
            [styles.big]: size === "big",
            [styles.middle]: size === "middle",
            [styles.small]: size === "small",
          })}
        >
          {text}
        </button>
      )}
    </>
  );
}
