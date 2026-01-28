import styles from "./Input.module.css";
import eyeOff from "../assets/btn_visibility_off.svg";
import eyeOn from "../assets/btn_visibility_on.svg";
import { useState } from "react";

export function TextInput({
  id,
  label,
  type = "text",
  className = "",
  ...props
}) {
  const classNames = `${styles.input} ${className}`;

  // 비밀번호 보기 버튼
  const [inputType, setInputType] = useState("password");
  const handleTogglePassword = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <label htmlFor={id}>{label}</label>
        {/* type 속성에 따라 분기 처리 */}
        {type === "password" ? (
          <div className={styles.passwordContainer}>
            <input id={id} type={inputType} className={classNames} {...props} />
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
        ) : (
          <input id={id} className={classNames} {...props} />
        )}
      </div>
    </>
  );
}
