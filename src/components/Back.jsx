import { useNavigate } from "react-router-dom";
import styles from "./Back.module.css";
import backIcon from "../assets/back.svg";

export default function Back({ children = "돌아가기", onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();        // 전달된 onClick이 있으면 그거 실행
    } else {
      navigate(-1);     // 없으면 기본: 뒤로가기
    }
  };

  return (
    <button type="button" className={styles.backBtn} onClick={handleClick}>
      <span className={styles.iconBox}>
        <img src={backIcon} alt="" className={styles.icon} />
      </span>
      <span className={styles.text}>{children}</span>
    </button>
  );
}
