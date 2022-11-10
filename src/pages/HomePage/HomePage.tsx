import React from "react";
import styles from "./HomePage.module.css";
import { ButtonLink } from "../../components/ButtonLink/ButtonLink";
import HomeIllustration from "./home-illustration.png";

const HomePage = () => {
  return (
    <main className={styles.root}>
      <div className="container">
        <div className={styles.homePageContent}>
          <div className={styles.firstBlock}>
            <div className={styles.textBlock}>
              <h1>Your Google tasks can do more!</h1>
              <ButtonLink href="/tasks" size="big" text="Just try it!" />
            </div>
            <img
              className={styles.imgBlock}
              src={HomeIllustration}
              alt="working people"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
