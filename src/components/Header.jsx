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
