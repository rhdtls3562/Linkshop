import { useState, useEffect, useRef } from "react";
import styles from "./Input.module.css";

export function FileInput({
  id,
  label,
  placeholder,
  initialPreview = "",
  onChange,
}) {
  const [preview, setPreview] = useState(initialPreview);
  const objectUrlRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("FileInput 컴포넌트의 file :", file);

    // 이전 blob URL 정리
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setPreview(objectUrl);

    onChange([e.target.id], e.target.files[0]); // ProductUploader, ShopManagement 컴포넌트에 보내줄 값
  };

  // 언마운트 시 blob URL 정리
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id}>{label}</label>
      <p className={styles.input}>{placeholder}</p>

      <label htmlFor={id} className={styles.uploadButton}>
        파일 첨부
      </label>

      <input
        id={id}
        type="file"
        className={styles.fileInput}
        onChange={handleChange}
        accept="image/*"
      />

      {preview && (
        <div className={styles.previewContainer}>
          <img src={preview} alt="미리보기" className={styles.previewImage} />
        </div>
      )}
    </div>
  );
}
