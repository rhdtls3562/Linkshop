import { useState } from "react";
import styles from "./LikeButton.module.css";
import heartLine from "../assets/heart_line.svg";
import heart from "../assets/heart.svg";

const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";

function LikeButton({ count = 0, linkShopId }) {
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(count);

  const handleClick = async () => {
    const nextIsLike = !isLike;

    // UI 즉시 반영
    setIsLike(nextIsLike);
    setLikeCount(nextIsLike ? likeCount + 1 : likeCount - 1);

    // API 호출
    try {
      await fetch(`${BASE_URL}/${TEAM_ID}/linkshops/${linkShopId}/like`, {
        method: nextIsLike ? "POST" : "DELETE",
      });
    } catch (error) {
      console.error("좋아요 요청 실패:", error);
    }
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

      <div className={styles.count}>{likeCount}</div>
    </div>
  );
}

export default LikeButton;
