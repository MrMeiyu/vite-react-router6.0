import React from "react";

import { NavList } from "./const";

import styles from "./index.module.less";

const NavPage: React.FC = () => {
  return (
    <div className={styles.navPageWrap}>
      {NavList?.map((item) => (
        <p key={item.key}>{item.name}</p>
      ))}
    </div>
  );
};

export default NavPage;
