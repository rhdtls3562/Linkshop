import { useState } from "react";
import styles from "./Input.module.css";
import eyeOff from "../assets/btn_visibility_off.svg";
import eyeOn from "../assets/btn_visibility_on.svg";
import { ErrorMessage } from "./ErrorMessage";
import { useInputValidation } from "../hooks/useInputValidation";

export function PasswordInput({ id, label, className = "", ...props }) {
  const { value, error, handleChange, validate } = useInputValidation(); // 인풋 값

  const classNames = `${styles.input} ${className}`;

  // 비밀번호 보기 버튼
  const [inputType, setInputType] = useState("password");
  const handleTogglePassword = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };
  return (
    <>
      <div className={`${styles.wrapper} ${error ? styles.errorInput : ""}`}>
        <label htmlFor={id}>{label}</label>
        <div className={styles.passwordContainer}>
          <input
            {...props}
            id={id}
            value={value}
            onChange={handleChange}
            type={inputType}
            className={classNames}
            onBlur={validate} // 포커스가 사라질 때 검사
          />
          <button
            type="button"
            className={styles.btnEye}
            onClick={handleTogglePassword}
          >
            <img
              src={inputType === "password" ? eyeOff : eyeOn} // 상태에 따라 아이콘 변경
              alt={
                inputType === "password" ? "비밀번호 보기" : "비밀번호 숨기기"
              }
            />
          </button>
        </div>
        {/* 에러 메시지가 있을 때만 노출 */}
        {error && <ErrorMessage message={error} />}
      </div>
    </>
  );
}
