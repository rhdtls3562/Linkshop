// src/components/FeaturedProduct.jsx
import styles from "./FeaturedProduct.module.css";

function FeaturedProduct({ items }) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div key={item.id} className={styles.card}>
          <img src={item.imageUrl} alt={item.name} />

          <div className={styles.info}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.price}>
              ₩{item.price.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeaturedProduct;
