import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../assets/logo.svg";
import { Button } from "./Button";

export default function Header() {
  const location = useLocation();
  const isCreatePage =
    location.pathname === "/linkpost" || location.pathname.includes("/edit");

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.href = "/list"; // 항상 새로고침하면서 /list로 이동
  };

  return (
    <header className={styles.header}>
      <a href="/list" onClick={handleLogoClick}>
        <img src={logo} alt="링크샵 로고" />
      </a>

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
