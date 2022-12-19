import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";

export function Header() {
  return (
    <header className={styles.root}>
      <div className="container">
        <div className={styles.headerContent}>
          <Logo />
          <div className={styles.menu}></div>
          <Link to="/tasks">Log In</Link>
        </div>
      </div>
    </header>
  );
}
