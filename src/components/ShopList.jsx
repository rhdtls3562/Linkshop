import React from "react";
import ShopCard from "./ShopCard";
import styles from "./ShopList.module.css";

function ShopList({ shops, lastItemRef, onShopClick }) {
  return (
    <div className={styles.shopList}>
      {shops.map((shop, index) => {
        const isLast = index === shops.length - 1;

        return (
          <div key={`${shop.id}-${index}`} ref={isLast ? lastItemRef : null}>
            <ShopCard shop={shop} onShopClick={onShopClick} />
          </div>
        );
      })}
    </div>
  );
}

export default ShopList;
