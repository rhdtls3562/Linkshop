import styles from "./ProductImageGrid.module.css";

function ProductImageGrid({ images }) {
  return (
    <div className={styles.productImages}>
      {images.map((img, idx) => (
        <div key={idx}>
          <img src={img} alt="상품" />
        </div>
      ))}
    </div>
  );
}

export default ProductImageGrid;
