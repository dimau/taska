import React from "react";
import styles from "./SiteHeader.module.css";
import { Logo } from "../Logo/Logo";
import { AuthLink } from "../../features/authorization/AuthLink/AuthLink";

export function SiteHeader() {
  return (
    <header className={styles.root}>
      <div className="container">
        <div className={styles.headerContent}>
          <Logo />
          <div className={styles.menu}></div>
          <AuthLink />
        </div>
      </div>
    </header>
  );
}
