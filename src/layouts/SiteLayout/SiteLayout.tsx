import React from "react";
import styles from "./SiteLayout.module.css";
import { Outlet } from "react-router-dom";
import { SiteHeader } from "../SiteHeader/SiteHeader";
import { SiteFooter } from "../SiteFooter/SiteFooter";

export function SiteLayout() {
  return (
    <div className={styles.root}>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
