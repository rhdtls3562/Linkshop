import { useState } from "react";
import styles from "./LinkProfilePage.module.css";

import Marquee from "../components/Marquee";
import Deco from "../components/Deco";
import Back from "../components/Back";

import shop from "../assets/shop.svg";
import share from "../assets/share.svg";
import meatball from "../assets/meatball.svg";

import LikeButton from "../components/LikeButton";

function LinkProfilePage() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <img src={shop} alt="" />
        </div>

        <div className={styles.nugnri}>너구리 직구상점</div>
        <div className={styles.pumpkin}>@pumpkinraccoon</div>
      </div>
      <div className={styles.text}>대표상품</div>
    </div>
  );
}

export default LinkProfilePage;


