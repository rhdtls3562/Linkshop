import React from "react";
import styles from "./Header.module.css";
import logo from "../assets/logo.svg";

function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <a href="#">
          <img src={logo} alt="로고" />
        </a>
      </h1>
      <a href="#">
        <div className={styles.button}>생성하기</div>
      </a>
    </header>
  );
}

export default Header;
