import { TextInput } from "./TextInput";
import styles from "./ProductUploader.module.css";
import { FileInput } from "./FileInput";
import { SHOP_IMAGES } from "../components/images";
import { useState } from "react";

export function ProductUploader({ productsData }) {
  const initialProducts = SHOP_IMAGES.shop1;

  // 테스트 코드
  const [values, setValues] = useState({
    // productImg: "",
    productName: "",
    productPrice: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
    console.log("✅ ProductUploader form 입력 값 :", values);
  };

  const handleSubmit = (e) => {
    alert(JSON.stringify(values, null, 2));
    productsData(values);
  };

  return (
    <>
      <form className={styles.form} action={handleSubmit}>
        <FileInput
          id="productImg"
          label="상품 대표 이미지"
          placeholder="상품 이미지를 첨부해 주세요."
          // updateField={handleChange}
        />
        <TextInput
          id="productName"
          type="text"
          label="상품 이름"
          placeholder="상품 이름을 입력해 주세요."
          updateField={handleChange}
        />
        <TextInput
          id="productPrice"
          type="text"
          label="상품 가격"
          placeholder="원화로 표기해 주세요."
          updateField={handleChange}
        />
        <button type="submit">제출</button>
      </form>
    </>
  );
}
