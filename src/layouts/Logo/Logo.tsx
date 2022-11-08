import React from "react";
import styles from "./Logo.module.css";
import { Link } from "react-router-dom";
import LogoImg from "../../assets/logo.png";

export function Logo() {
  return (
    <Link to="/" className={styles.logoBlock}>
      <img src={LogoImg} alt="Logo" className={styles.logoImg} />
      Taska
    </Link>
  );
}
