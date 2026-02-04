import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./LinkProfilePage.module.css";

import Marquee from "../components/Marquee";
import Deco from "../components/Deco";
import Back from "../components/Back";

import shop from "../assets/shop.svg";
import share from "../assets/share.svg";
import meatball from "../assets/meatball.svg";

import LikeButton from "../components/LikeButton";

const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";

function LinkProfilePage() {
  // URL 파라미터에서 shopId 가져오기
  const { shopId } = useParams();

  const [menuOpen, setMenuOpen] = useState(false);
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 상점 정보 가져오기
  useEffect(() => {
    if (!shopId) return;

    setLoading(true);
    fetch(`${BASE_URL}/${TEAM_ID}/linkshops/${shopId}`)
      .then((res) => res.json())
      .then((data) => {
        setShopData(data);
      })
      .catch((err) => console.error("상점 정보 로딩 실패:", err))
      .finally(() => setLoading(false));
  }, [shopId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!shopData) {
    return <div>상점을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <Marquee className={styles.marquee} />
      <Back className={styles.Back} />

      <div className={styles.no}>
        {/* 왼쪽 위 하트 */}
        <div className={styles.like}>
          <LikeButton />
        </div>

        {/* 오른쪽 위 공유 + 점3개 */}
        <div className={styles.menuWrapper}>
          <button type="button" className={styles.iconButton}>
            <img src={share} alt="공유" />
          </button>

          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <img src={meatball} alt="메뉴" />
          </button>

          {menuOpen && (
            <div className={styles.menuBox}>
              <button type="button" className={styles.menuItem}>
                수정하기
              </button>
              <button type="button" className={styles.menuItem}>
                삭제하기
              </button>
            </div>
          )}
        </div>

        {/* 가운데 프로필 */}
        <div className={styles.shop}>
          <img
            src={shopData.shop?.imageUrl || shop}
            alt={shopData.name || "상점"}
          />
        </div>

        <div className={styles.nugnri}>
          {shopData.name || "너구리 직구상점"}
        </div>
        <div className={styles.pumpkin}>
          @{shopData.userId || "pumpkinraccoon"}
        </div>
      </div>
      <div className={styles.text}>대표상품</div>
    </div>
  );
}

export default LinkProfilePage;
