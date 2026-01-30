import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styles from "./Input.module.css";
import ProductImageGrid from "./ProductImageGrid";

export function FileInput({
  id,
  label,
  placeholder,
  prdList,
  initialPreview = "",
}) {
  const inputRef = useRef();
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(initialPreview);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    // const nextFile = e.target;
    console.log("nextFile:", file);
    setFile(file);
  };

  useEffect(() => {
    if (!file) {
      setPreview(initialPreview);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    console.log("objectUrl: ", objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return (
    <>
      <div className={styles.wrapper}>
        <label htmlFor={id}>{label}</label>
        <p className={styles.input}>{placeholder}</p>
        <label htmlFor={id} className={styles.uploadButton}>
          파일 첨부
        </label>
        {/* 디자인을 위해 실제 인풋은 숨김 처리 */}
        <input
          id={id}
          type="file"
          className={styles.fileInput}
          onClick={handleChange}
        />

        {/* 상품 리스트가 존재할 경우 이미지 미리보기 렌더링 */}
        {file && <ProductImageGrid images={prdList} />}
      </div>
    </>
  );
}
