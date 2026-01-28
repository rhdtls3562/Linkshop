import styles from "./LikeButton.module.css";
import heartLine from "../assets/heart_line.svg";
import heart from "../assets/heart.svg";
import { useState } from "react";

function LikeButton({ count }) {
  const [isLike, setIsLike] = useState(false);

  const handleClick = () => {
    return setIsLike(!isLike);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.likes} onClick={handleClick}>
        <img src={heartLine} alt="좋아요" />
        <img
          src={heart}
          className={`${styles.heart} ${isLike ? styles.active : ""}`}
          alt="좋아요 활성"
        />
      </button>
      <div className={styles.count}>{isLike === true ? count + 1 : count}</div>
    </div>
  );
}

export default LikeButton;
