import styles from "./ProductImageGrid.module.css";
import { SHOP_IMAGE_MAP, SHOP_IMAGES } from "../components/images";

function ProductImageGrid({ shopId }) {
  // 해당 상점의 이미지 가져오기
  const images = SHOP_IMAGE_MAP[shopId] || SHOP_IMAGES.shop1;

  return (
    <div className={styles.productImages}>
      {images.map((img, idx) => (
        <div key={idx}>
          <img src={img} alt={`상품 ${idx + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default ProductImageGrid;
