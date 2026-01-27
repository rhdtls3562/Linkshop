import React from "react";
import styles from "./ShopCard.module.css";
import shopIcon from "../assets/shop.svg";
import LikeButton from "../components/LikeButton";

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

        <LikeButton count={shop.likes} />
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
