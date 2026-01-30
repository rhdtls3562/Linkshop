import { useInputValidation } from "../hooks/useInputValidation";
import { ErrorMessage } from "./ErrorMessage";
import styles from "./Input.module.css";

export function TextInput({
  id,
  label,
  type = "text",
  className = "",
  ...props
}) {
  const { value, error, handleChange, validate } = useInputValidation();

  const classNames = `${styles.input} ${className}`;

  return (
    <>
      <div className={`${styles.wrapper} ${error ? styles.errorInput : ""}`}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          value={value}
          onChange={handleChange}
          className={classNames}
          onBlur={validate} // 포커스가 사라질 때 검사
          {...props}
        />
        {/* 에러 메시지가 있을 때만 노출 */}
        {error && <ErrorMessage message={error} />}
      </div>
    </>
  );
}
