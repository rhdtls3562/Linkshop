import styles from "./ProductImageGrid.module.css";

// 상점 1 이미지
import shop1_img1 from "../assets/shop1_product1.png";
import shop1_img2 from "../assets/shop1_product2.png";
import shop1_img3 from "../assets/shop1_product3.png";

// 상점 2 이미지
import shop2_img1 from "../assets/shop2_product1.png";
import shop2_img2 from "../assets/shop2_product2.png";
import shop2_img3 from "../assets/shop2_product3.png";

function ProductImageGrid({ shopId }) {
  // productCount 제거
  // 상점별 이미지 매핑
  const shopImageMap = {
    1052: [shop1_img1, shop1_img2, shop1_img3],
    1050: [shop2_img1, shop2_img2, shop2_img3],
  };

  // 해당 상점의 이미지 가져오기
  const images = shopImageMap[shopId] || [shop1_img1, shop1_img2, shop1_img3];

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
