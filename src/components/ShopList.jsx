import React from "react";
import ShopCard from "./ShopCard";
import styles from "./ShopList.module.css";

function ShopList({ shops, lastShopRef }) {
  if (!shops || shops.length === 0) {
    return null;
  }

  return (
    <div className={styles.shopList}>
      {shops.map((shop, index) => {
        // 마지막 카드에만 ref 연결
        if (index === shops.length - 1) {
          return (
            <div key={shop.id} ref={lastShopRef}>
              <ShopCard shop={shop} />
            </div>
          );
        }
        return <ShopCard key={shop.id} shop={shop} />;
      })}
    </div>
  );
}

export default ShopList;
