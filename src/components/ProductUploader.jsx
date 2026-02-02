import { TextInput } from "./TextInput";
import { FileInput } from "./FileInput";
import { SHOP_IMAGES } from "../components/images";
import styles from "./ProductUploader.module.css";

export function ProductUploader({ formData, setFormData }) {
  const initialProducts = SHOP_IMAGES.shop1;

  // 하위 인풋 컴포넌트에서 전달받은 name, value로 폼 상태 업데이트
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className={styles.inputWrap}>
        <FileInput
          id="productImg"
          label="상품 대표 이미지"
          placeholder="상품 이미지를 첨부해 주세요."
          onChange={handleChange}
        />
        <TextInput
          id="productName"
          type="text"
          label="상품 이름"
          placeholder="상품 이름을 입력해 주세요."
          onChange={handleChange}
        />
        <TextInput
          id="productPrice"
          type="text"
          label="상품 가격"
          placeholder="원화로 표기해 주세요."
          onChange={handleChange}
        />
      </div>
    </>
  );
}
