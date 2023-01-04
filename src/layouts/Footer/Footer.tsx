import React from "react";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.root}>
      <div className="container">
        <div className={styles.footerContent}>
          <span>©️ Dmitrii Ushakov, 2022</span>
        </div>
      </div>
    </footer>
  );
}
