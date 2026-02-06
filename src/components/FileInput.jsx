import { useState, useEffect, useRef } from "react";
import styles from "./Input.module.css";

export function FileInput({
  id,
  name,
  label,
  placeholder,
  initialPreview,
  onChange,
}) {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(initialPreview);
  const objectUrlRef = useRef(null);
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextFile = e.target.files?.[0];
    if (!nextFile) return;

    try {
      // 이전 blob URL 정리
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }

      // 새 이미지 미리보기
      const objectUrl = URL.createObjectURL(nextFile);
      objectUrlRef.current = objectUrl;
      setPreview(objectUrl);

      // 부모에게 파일 전달
      onChange(name, nextFile);
      console.log("nextFile", nextFile);
    } catch (error) {
      console.error("파일 미리보기 생성 실패:", error);
      alert("이미지 파일을 선택해주세요.");
    }
  };

  const handleClear = () => {
    // blob URL 정리
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    // 상태 초기화
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    // 부모에게 null 전달
    onChange(name, null);
  };

  // initialPreview 변경 감지
  useEffect(() => {
    setPreview(initialPreview);
  }, [initialPreview]);

  // 언마운트 시 blob URL 정리
  useEffect(() => {
    if (!preview) {
      setPreview(initialPreview);
      return;
    }
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

      <label htmlFor={id} className={styles.uploadButton} onClick={handleClear}>
        파일 첨부
      </label>

      <input
        id={id}
        name={name}
        type="file"
        className={styles.fileInput}
        onChange={handleChange}
        accept="image/*"
        ref={inputRef}
      />

      {/* 수정하기 페이지 용 */}
      {preview && (
        <div className={styles.previewContainer}>
          <img src={preview} alt="미리보기" className={styles.previewImage} />
        </div>
      )}
    </div>
  );
}
