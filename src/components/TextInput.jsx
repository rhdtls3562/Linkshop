import { useState } from "react";
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
  const [price, setPrice] = useState(0);

  const wrappedChange = (e) => {
    handleChange(e); // 인풋 값 에러 확인 함수
    onChange(name, e.target.value); // 부모한테 보내줄 값

    // if (name === "productPrice") {
    //   const onlyNumber = e.target.value.replace(/[^\d]/g, "");
    //   // setPrice(Number(onlyNumber));
    //   return (value = onlyNumber);
    // }
  };

  // 숫자일 때 원화 표시

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
          onChange={wrappedChange}
          onBlur={validate} // 포커스가 사라질 때 검사
          value={dataList ?? value} // dataList 여부에 따라 value 값 보여주기
        />
        {/* 에러 메시지가 있을 때만 노출 */}
        {error && <ErrorMessage message={error} />}
      </div>
    </>
  );
}
