import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

interface BasicButton {
  type: "link" | "button";
  size: "big" | "middle" | "small";
  text: string;
}

interface LinkButton extends BasicButton {
  href: string;
}

interface ButtonButton extends BasicButton {
  href?: string;
}

type ButtonProps = LinkButton | ButtonButton;

export function Button({ type, size, text, href }: ButtonProps) {
  return (
    <>
      {type == "link" ? (
        <a
          href={href}
          className={clsx(styles.root, {
            [styles.big]: size === "big",
            [styles.middle]: size === "middle",
            [styles.small]: size === "small",
          })}
        >
          {text}
        </a>
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
