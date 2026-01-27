<<<<<<< HEAD
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.svg';
import { Button } from './Button';
import styles from './Header.module.css';

export function Header() {
  return (
    <>
      <header>
        <Link to="/list">
          <div className={styles.logo}>
            <img src={logoImg} alt="링크샵 로고" />
          </div>
        </Link>
        <Link to="/list">
          <Button>돌아가기</Button>
        </Link>
      </header>
    </>
  );
}
=======
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
>>>>>>> 0ea41ce578f6ac0eaa1d90b5434bebe16f151e70
