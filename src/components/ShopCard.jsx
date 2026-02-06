import React from "react";
import styles from "./ShopCard.module.css";
import shopIcon from "../assets/shop.svg";
import LikeButton from "../components/LikeButton";

function ShopCard({ shop, onShopClick }) {
  const handleNameClick = () => {
    if (onShopClick) {
      onShopClick(shop.id);
    }
  };

  // ✅ API 이미지 경로
  const shopImageUrl = shop.shop?.imageUrl;

  // ✅ fallback 처리
  const imageSrc = shopImageUrl || shopIcon;
  const isDefaultImage = !shopImageUrl;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div
          className={`${styles.avatar} ${
            isDefaultImage ? styles.defaultAvatar : ""
          }`}
        >
          <img src={imageSrc} alt="상점 이미지" />
        </div>

        <div className={styles.info}>
          <h2 onClick={handleNameClick} style={{ cursor: "pointer" }}>
            {shop.name}
          </h2>
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
