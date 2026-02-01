import { TextInput } from "./TextInput";
import styles from "./ProductUploader.module.css";
import { FileInput } from "./FileInput";
import { SHOP_IMAGES } from "../components/images";

export function ProductUploader({}) {
  const initialProducts = SHOP_IMAGES.shop1;

  return (
    <>
      <form className={styles.form}>
        <FileInput
          id="productImg"
          label="상품 대표 이미지"
          placeholder="상품 이미지를 첨부해 주세요."
        />
        <TextInput
          id="productName"
          type="text"
          label="상품 이름"
          placeholder="상품 이름을 입력해 주세요."
        />
        <TextInput
          id="productPrice"
          type="text"
          label="상품 가격"
          placeholder="원화로 표기해 주세요."
        />
      </form>
    </>
  );
}
