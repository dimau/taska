import React from "react";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.root}>
      <div className="container">
        <div className={styles.footerContent}>
          <span>Creator: Dmitrii Ushakov, 2022</span>
          <a href="mailto:dimau777@gmail.com">Send me email</a>
          <a href="https://t.me/UshakovDmitrii">Send me telegram message</a>
        </div>
      </div>
    </footer>
  );
}
