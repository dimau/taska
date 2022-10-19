import React from "react";
import styles from "./HomePage.module.css";
import { Button } from "../../components/Button/Button";

const HomePage = () => {
  return (
    <main className={styles.root}>
      <div className="container">
        <div className={styles.homePageContent}>
          <div className={styles.firstBlock}>
            <div className={styles.textBlock}>
              <h1>Your Google tasks can do more!</h1>
              <Button
                type="link"
                href="/tasks"
                size="big"
                text="Just try it!"
              />
            </div>
            <img
              className={styles.imgBlock}
              src="/img/home-illustration.png"
              alt="working people"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
