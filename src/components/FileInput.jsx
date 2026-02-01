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
  const [fileData, setFileData] = useState(null);
  const [preview, setPreview] = useState(initialPreview);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("file:", file);

    const objectUrl = URL.createObjectURL(file);

    setFileData({
      file, // 실제 File 객체 (서버 전송용)
      preview: objectUrl, // 미리보기 URL
      name: file.name,
      size: file.size,
      type: file.type,
      // idx: fileData.length + 1,
    });
    console.log("fileData", fileData);
  };

  // 업로드 한 파일의 URL을 생성하는 로직
  // useEffect(() => {
  //   if (!file) {
  //     setPreview(initialPreview);
  //     return;
  //   }
  //   const objectUrl = URL.createObjectURL(file);
  //   setPreview(objectUrl);
  //   console.log("objectUrl: ", objectUrl);
  //   return () => {
  //     URL.revokeObjectURL(objectUrl);
  //   };
  // }, [file]);

  useEffect(() => {
    return () => {
      if (fileData?.preview) {
        URL.revokeObjectURL(fileData.preview);
      }
    };
  }, [fileData]);

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
          onChange={handleChange}
        />

        {/* 상품 리스트가 존재할 경우 이미지 미리보기 렌더링 */}
        {fileData && (
          <img
            className={styles.preview}
            src={fileData.preview}
            alt="업로드 이미지 미리보기"
          />
        )}

        {/* 컴포넌트 확인 필요 */}
        {/* {fileData && <ProductImageGrid fileData={fileData} />} */}
      </div>
    </>
  );
}
