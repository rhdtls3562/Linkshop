import { useEffect, useState } from "react";
import styles from "./LikeButton.module.css";
import heartLine from "../assets/heart_line.svg";
import heart from "../assets/heart.svg";

const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";

function LikeButton({ count = 0, linkShopId }) {
  const storageKey = `liked-linkshop-${linkShopId}`;

  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(count);
  const [isLoading, setIsLoading] = useState(false);

  // 최초 로딩 시 localStorage 기준으로 상태 복원
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved === "true") {
      setIsLike(true);
    }
  }, [storageKey]);

  //  서버에서 내려온 count 동기화
  useEffect(() => {
    setLikeCount(count);
  }, [count]);

  const handleClick = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const nextIsLike = !isLike;

    //  UI 즉시 반영
    setIsLike(nextIsLike);
    setLikeCount((prev) => (nextIsLike ? prev + 1 : prev - 1));

    //  localStorage 저장
    localStorage.setItem(storageKey, String(nextIsLike));

    try {
      const res = await fetch(
        `${BASE_URL}/${TEAM_ID}/linkshops/${linkShopId}/like`,
        { method: nextIsLike ? "POST" : "DELETE" },
      );

      if (!res.ok) {
        throw new Error("API 실패");
      }
    } catch (err) {
      // 실패 시 롤백
      setIsLike(isLike);
      setLikeCount((prev) => (nextIsLike ? prev - 1 : prev + 1));
      localStorage.setItem(storageKey, String(isLike));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.likes}
        onClick={handleClick}
        disabled={isLoading}
      >
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
