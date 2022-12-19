import React from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

export function MainLayout() {
  return (
    <div className={styles.root}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
