import { useEffect } from "react";
import { useInputValidation } from "../hooks/useInputValidation";
import { ErrorMessage } from "./ErrorMessage";
import styles from "./Input.module.css";

export function TextInput({
  updateField = "",
  id,
  name,
  label,
  type = "text",
  className = "",
  onChange,
  dataList,
  ...props
}) {
  const { value, error, handleChange, validate } = useInputValidation();

  const wrappedChange = (e) => {
    handleChange(e); // 인풋 값 에러 확인 함수
    onChange(name, e.target.value); // 부모한테 보내줄 값
  };

  const classNames = `${styles.input} ${className}`;

  return (
    <>
      <div className={`${styles.wrapper} ${error ? styles.errorInput : ""}`}>
        <label htmlFor={id}>{label}</label>
        <input
          {...props}
          id={id}
          name={name}
          className={classNames}
          // value={value}
          onChange={wrappedChange}
          onBlur={validate} // 포커스가 사라질 때 검사
          value={dataList ?? ""}
        />
        {/* 에러 메시지가 있을 때만 노출 */}
        {error && <ErrorMessage message={error} />}
      </div>
    </>
  );
}
