import React from "react";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.root}>
      <NavLink to="/" className={styles.link}>
        Home
      </NavLink>
      <NavLink to="/tasks" className={styles.link}>
        Tasks
      </NavLink>
    </footer>
  );
}

export default Footer;
