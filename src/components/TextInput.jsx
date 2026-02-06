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

  const wrappedChange = (e) => {
    handleChange(e); // 인풋 값 에러 확인 함수
    onChange(name, e.target.value); // 부모한테 보내줄 값
    setInputValue(e.target.value);
  };

  const classNames = `${styles.input} ${className}`;

  // 인풋 입력 값 상태 관리
  const [inputValue, setInputValue] = useState(value);

  // dataList가 로딩되면 초기값 설정
  useEffect(() => {
    if (dataList) {
      setInputValue(dataList);
    }
  }, [dataList]);

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
          // value={dataList ?? value} // dataList 여부에 따라 value 값 보여주기
          value={inputValue}
          // defaultValue={dataList}
        />
        {/* 에러 메시지가 있을 때만 노출 */}
        {error && <ErrorMessage message={error} />}
      </div>
    </>
  );
}
