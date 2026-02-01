import { useState } from "react";
import { useEffect } from "react";
import styles from "./Input.module.css";
import ProductImageGrid from "./ProductImageGrid";

export function FileInput({
  id,
  label,
  placeholder,
  initialPreview,
  updateField,
}) {
  const [fileData, setFileData] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("✅ FileInput 컴포넌트의 file :", file);

    const objectUrl = URL.createObjectURL(file); // 업로드 한 파일 URL을 생성

    setFileData({
      file, // 실제 File 객체 (서버 전송용)
      previewUrl: objectUrl, // 미리보기 URL
      name: file.name,
      size: file.size,
      type: file.type,
    });
    console.log("objectUrl", objectUrl);

    // updateField(e); // ProductUploader 컴포넌트에 보내줄 값
  };

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
            src={fileData.previewUrl || initialPreview}
            alt="업로드 이미지 미리보기"
          />
        )}

        {/* 확인 필요 */}
        {/* {fileData && <ProductImageGrid fileData={fileData} />} */}
      </div>
    </>
  );
}
