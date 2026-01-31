import { TextInput } from "./TextInput";
import styles from "./ProductUploader.module.css";
import { FileInput } from "./FileInput";
import shop1_img1 from "../assets/shop1_product1.png";
import shop1_img2 from "../assets/shop1_product2.png";
import shop1_img3 from "../assets/shop1_product3.png";

export function ProductUploader() {
  // const intialProducts = [
  //   { id: 1, img: black_jacket },
  //   { id: 2, img: red_jacket },
  //   { id: 3, img: brwon_jacket },
  // ];
  const intialProducts = [shop1_img1, shop1_img2, shop1_img3];
  return (
    <>
      <form className={styles.form}>
        <FileInput
          id="productImg"
          label="상품 대표 이미지"
          placeholder="상품 이미지를 첨부해 주세요."
          prdList={intialProducts}
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
