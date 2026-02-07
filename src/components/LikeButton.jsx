import { useState, useEffect } from "react";
import styles from "./LikeButton.module.css";
import heartLine from "../assets/heart_line.svg";
import heart from "../assets/heart.svg";

const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";

function LikeButton({ count = 0, linkShopId }) {
  const storageKey = `like_${linkShopId}`;
  const savedLike = localStorage.getItem(storageKey);

  const [isLike, setIsLike] = useState(savedLike === "true");
  const [likeCount, setLikeCount] = useState(count);

  // count prop이 변경되면 업데이트 (부모에서 새로고침 시)
  useEffect(() => {
    setLikeCount(count);
  }, [count]);

  // 좋아요 상태만 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(storageKey, isLike);
  }, [isLike, storageKey]);

  const handleClick = async () => {
    const newIsLike = !isLike;
    const optimisticCount = newIsLike ? likeCount + 1 : likeCount - 1;

    setIsLike(newIsLike);
    setLikeCount(optimisticCount);

    try {
      const method = newIsLike ? "POST" : "DELETE";
      await fetch(`${BASE_URL}/${TEAM_ID}/linkshops/${linkShopId}/like`, {
        method: method,
      });
    } catch (error) {
      console.error("좋아요 요청 실패:", error);
      // 실패 시 롤백
      setIsLike(!newIsLike);
      setLikeCount(likeCount);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.likes} onClick={handleClick}>
        <img src={heartLine} alt="좋아요" />
        <img
          src={heart}
          alt="좋아요"
          className={`${styles.heart} ${isLike ? styles.active : ""}`}
        />
      </button>
      <span className={styles.count}>{likeCount}</span>
    </div>
  );
}

export default LikeButton;
