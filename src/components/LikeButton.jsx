import { useState, useEffect } from "react";
import styles from "./LikeButton.module.css";
import heartLine from "../assets/heart_line.svg";
import heart from "../assets/heart.svg";

const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";

function LikeButton({ count = 0, linkShopId }) {
  // localStorage 키
  const storageKey = `like_${linkShopId}`;
  const countKey = `like_${linkShopId}_count`;

  // localStorage에서 저장된 좋아요 상태 가져오기
  const savedLike = localStorage.getItem(storageKey);
  const savedCount = localStorage.getItem(countKey);

  // 상태 관리
  const [isLike, setIsLike] = useState(savedLike === "true");
  const [likeCount, setLikeCount] = useState(
    savedCount ? Number(savedCount) : count
  );

  // 상태가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(storageKey, isLike);
    localStorage.setItem(countKey, likeCount);
  }, [isLike, likeCount]);

  // 좋아요 버튼 클릭
  const handleClick = async () => {
    // 좋아요 상태 토글
    const newIsLike = !isLike;
    setIsLike(newIsLike);

    // 카운트 증가/감소
    if (newIsLike) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }

    // 서버에 요청
    try {
      const method = newIsLike ? "POST" : "DELETE";
      await fetch(`${BASE_URL}/${TEAM_ID}/linkshops/${linkShopId}/like`, {
        method: method,
      });
    } catch (error) {
      console.error("좋아요 요청 실패:", error);
      // 실패하면 원래대로 되돌리기
      setIsLike(!newIsLike);
      if (newIsLike) {
        setLikeCount(likeCount);
      } else {
        setLikeCount(likeCount + 1);
      }
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
