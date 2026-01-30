import styles from "./Input.module.css";
import ProductImageGrid from "./ProductImageGrid";
import shopCardStyles from "./ShopCard.module.css";

export function FileInput({ id, label, placeholder, prdList }) {
  return (
    <>
      <div className={styles.wrapper}>
        <label htmlFor={id}>{label}</label>
        <p className={styles.input}>{placeholder}</p>
        <label htmlFor={id} className={styles.uploadButton}>
          파일 첨부
        </label>
        {/* 디자인을 위해 실제 인풋은 숨김 처리 */}
        <input id={id} type="file" className={styles.fileInput} />

        {/* 상품 리스트가 존재할 경우 이미지 미리보기 렌더링 */}
        {prdList && <ProductImageGrid images={prdList} />}
        {/* {prdList && (
          <div className={shopCardStyles.productImages}>
            {prdList.map((prd) => {
              return (
                <div key={prd.id}>
                  <img src={prd.img} alt="대표 상품" />
                </div>
              );
            })}
          </div>
        )} */}
      </div>
    </>
  );
}
