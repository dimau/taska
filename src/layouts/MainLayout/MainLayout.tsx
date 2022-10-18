import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";

export function MainLayout() {
  return (
    <div className={styles.root}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
