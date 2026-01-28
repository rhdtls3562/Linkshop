import React from "react";
import ShopCard from "./ShopCard";
import styles from "./ShopList.module.css";

function ShopList({ shops }) {
  return (
    <div className={styles.shopList}>
      {shops.map((shop) => (
        <ShopCard key={shop.id} shop={shop} />
      ))}
    </div>
  );
}

export default ShopList;
