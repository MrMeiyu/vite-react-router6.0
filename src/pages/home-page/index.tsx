import React from "react";
import Header from "./header-page";
import styles from "./index.module.less";
import Nav from "./nav-page";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePageWrap}>
      <Header />
      <Nav />
    </div>
  );
};

export default HomePage;
