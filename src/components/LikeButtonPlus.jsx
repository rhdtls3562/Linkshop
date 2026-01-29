import styles from "./LikeButtonPlus.module.css";
import heart from "../assets/heart.svg";
import { useState } from "react";

function LikeButtonPlus() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.likes} onClick={handleClick}>
        <img src={heart} alt="좋아요" />
      </button>
      <div className={styles.count}>{count}</div>
    </div>
  );
}

export default LikeButtonPlus;

