import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import HomePage from "../../pages/HomePage/HomePage";
import TaskListPage from "../../pages/TaskListPage/TaskListPage";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";
import { SiteLayout } from "../../layouts/SiteLayout/SiteLayout";

function App() {
  return (
    <div className={styles.root}>
      <Routes>
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/tasks" element={<MainLayout />}>
          <Route index element={<TaskListPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
