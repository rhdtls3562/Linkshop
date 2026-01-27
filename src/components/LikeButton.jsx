import styles from "./LikeButton.module.css";
import heartLine from "../assets/heart_line.svg";
import heart from "../assets/heart.svg";

function LikeButton({ count }) {
  return (
    <div className={styles.wrapper}>
      <button className={styles.likes}>
        <img src={heartLine} alt="좋아요" />
        <img src={heart} className={styles.heart} alt="좋아요 활성" />
      </button>
      <div className={styles.count}>{count}</div>
    </div>
  );
}

export default LikeButton;
