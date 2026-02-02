import { useState, useEffect, useRef } from "react";
import styles from "./Input.module.css";

export function FileInput({ id, label, placeholder, initialPreview = "" }) {
  const [preview, setPreview] = useState(initialPreview);
  const objectUrlRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이전 blob URL 정리
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setPreview(objectUrl);
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
