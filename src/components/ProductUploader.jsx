import { TextInput } from "./TextInput";
import { FileInput } from "./FileInput";
import styles from "./ProductUploader.module.css";
import closeIcon from "../assets/close.svg";

export function ProductUploader({
  productId,
  productData,
  onUpdate,
  removeProduct,
}) {
  // 자식에서 폼 데이터 변경 시 부모에게 전달
  const handleChange = (field, value) => {
    const updatedData = {
      [field]: value,
    };
    onUpdate(productId, updatedData); // 부모의 updateProduct 호출
  };

  return (
    <>
      <div className={styles.inputWrap}>
        <div className={styles.btnWrap}>
          <button
            className={styles.deleteBtn}
            type="button"
            onClick={() => removeProduct(productId)}
          >
            <img src={closeIcon} alt="삭제 버튼" />
          </button>
          <div className={styles.bar}></div>
        </div>
        <FileInput
          id={`productImg_${productId}`}
          name="productImg"
          label="상품 대표 이미지"
          placeholder="상품 이미지를 첨부해 주세요."
          onChange={handleChange}
          value={productData.productImg || ""}
          initialPreview={productData?.imageUrl}
        />
        <TextInput
          id={`productName_${productId}`}
          name="productName"
          label="상품 이름"
          placeholder="상품 이름을 입력해 주세요."
          onChange={handleChange}
          value={productData.productName || ""}
          dataList={productData?.name}
        />
        <TextInput
          id={`productPrice_${productId}`} // 라벨, 인풋용
          name="productPrice" // 필드용 네임
          type="number"
          label="상품 가격"
          placeholder="원화로 표기해 주세요."
          onChange={handleChange}
          value={productData.productPrice || ""}
          dataList={productData?.price}
        />
      </div>
    </>
  );
}
