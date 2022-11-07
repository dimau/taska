import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

function Header() {
  return (
    <header className={styles.root}>
      <div className="container">
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logoBlock}>
            <img src={Logo} alt="Logo" className={styles.logoImg} />
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
