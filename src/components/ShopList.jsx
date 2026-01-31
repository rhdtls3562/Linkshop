import React from "react";
import ShopCard from "./ShopCard";
import styles from "./ShopList.module.css";

function ShopList({ shops }) {
  if (!shops || shops.length === 0) {
    return <div>표시할 상점이 없습니다.</div>;
  }

  return (
    <div className={styles.shopList}>
      {shops.map((shop) => (
        <ShopCard key={shop.id} shop={shop} />
      ))}
    </div>
  );
}

export default ShopList;
