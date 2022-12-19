import React from "react";
import styles from "./ButtonLink.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";

interface ButtonLinkProps {
  size: "big" | "middle" | "small";
  text: string;
  href: string;
  type: "internal" | "external";
}

export function ButtonLink({ size, text, href, type }: ButtonLinkProps) {
  if (type === "external")
    return (
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
    );

  return (
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
  );
}
