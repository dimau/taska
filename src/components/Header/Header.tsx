import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.root}>
      <div className="container">
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            Taska
          </Link>
          <div className={styles.menu}></div>
          <Link to="/tasks">Log In</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
