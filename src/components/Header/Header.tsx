import React from "react";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>It's Header in main part</h1>
    </div>
  );
}

export default Header;
