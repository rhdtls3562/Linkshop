import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../assets/logo.svg";
import { Button } from "./Button";

export default function Header() {
  const location = useLocation();
  const isCreatePage = location.pathname === "/create";

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} alt="링크샵 로고" />
      </Link>

      {isCreatePage ? (
        <Button as={Link} to="/" className={styles.createBtn}>
          돌아가기
        </Button>
      ) : (
        <Button as={Link} to="/create" className={styles.createBtn}>
          생성하기
        </Button>
      )}
    </header>
  );
}
