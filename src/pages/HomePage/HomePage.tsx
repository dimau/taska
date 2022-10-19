import React from "react";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <main className={styles.root}>
      <div className="container">
        <div className={styles.homePageContent}>
          <h1>Home page</h1>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
