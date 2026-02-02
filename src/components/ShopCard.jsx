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
          <p>@{shop.userId}</p>
        </div>

        <LikeButton count={shop.likes} linkShopId={shop.id} />
      </div>

      <p className={styles.productTitle}>
        대표 상품 {shop.products?.length ?? 0}
      </p>

      <div className={styles.productImages}>
        {shop.products?.slice(0, 3).map((product) => (
          <div key={product.id} className={styles.productImageWrapper}>
            <img src={product.imageUrl} alt={product.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopCard;
