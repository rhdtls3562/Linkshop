// hooks/useInputValidation.js
import { useState } from "react";

export function useInputValidation(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const validate = () => {
    if (value.trim() === "") {
      // 인풋 값 여부 확인
      setError("값을 입력해주세요.");
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (error) setError(""); // 입력하는 동안 에러 메시지 초기화
  };

  return { value, error, setValue, setError, handleChange, validate };
}
