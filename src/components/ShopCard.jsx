import React from "react";
import styles from "./ShopCard.module.css";
import heart_line from "../assets/heart_line.svg";
import heart from "../assets/heart.svg";
import shopIcon from "../assets/shop.svg";

function ShopCard({ shop }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src={shopIcon} alt="상점" />
        </div>
        <div className={styles.info}>
          <h2>{shop.name}</h2>
          <p>{shop.username}</p>
        </div>
        <button className={styles.likes}>
          <img src={heart_line} alt="좋아요" />
          <img src={heart} className={styles.heart} alt="좋아요 활성" />
        </button>
        <div>{shop.likes}</div>
      </div>

      <p className={styles.productTitle}>대표 상품 {shop.products.length}</p>

      <div className={styles.productImages}>
        {shop.products.map((img, idx) => (
          <div key={idx}>
            {" "}
            {/* div로 감싸기 */}
            <img src={img} alt="상품" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopCard;
