import { useState } from "react";
import { useRef } from "react";
import styles from "./Input.module.css";

export function TextInput({
  id,
  label,
  type = "text",
  className = "",
  ...props
}) {
  const [error, setError] = useState("");

  const inputRef = useRef(null);
  const handleClick = () => {
    if (inputRef.current) {
      if (inputRef.current.value.trim() === "") {
        setError("값을 입력해주세요."); // 에러 메시지 설정
        return false;
      }
      setError(""); // 값이 있으면 에러 초기화
      return true;
    }
  };

  // 에러 여부에 따라 클래스 추가
  const classNames = `${styles.input} ${className}`;

  return (
    <>
      <div className={`${styles.wrapper} ${error ? styles.errorInput : ""}`}>
        <label htmlFor={id}>{label}</label>
        <input
          ref={inputRef}
          id={id}
          className={classNames}
          onBlur={handleClick} // 포커스가 나갈 때 검사
          {...props}
        />
        {/* 에러 메시지가 있을 때만 노출 */}
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    </>
  );
}
