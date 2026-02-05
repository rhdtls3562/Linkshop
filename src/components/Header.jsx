// Header.jsx
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../assets/logo.svg";
import { Button } from "./Button";

export default function Header() {
  const location = useLocation();
  const isCreatePage =
    location.pathname === "/linkpost" || location.pathname.includes("/edit");

  return (
    <header className={styles.header}>
      <Link to="/list">
        <img src={logo} alt="링크샵 로고" />
      </Link>

      {isCreatePage ? (
        <Button as={Link} to="/list" className={styles.createBtn}>
          돌아가기
        </Button>
      ) : (
        <Button as={Link} to="/linkpost" className={styles.createBtn}>
          생성하기
        </Button>
      )}
    </header>
  );
}
