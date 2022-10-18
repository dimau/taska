import React from "react";
import styles from "./styles.module.css";
import { Outlet } from "react-router-dom";
import { SiteHeader } from "../../components/SiteHeader/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter/SiteFooter";

export function SiteLayout() {
  return (
    <div className={styles.root}>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
