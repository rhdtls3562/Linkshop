import React, { useMemo, useState } from "react";
import search from "../assets/search.svg";
import styles from "./SearchBar.module.css";

function SearchBar({
  className,
  placeholder = "샵 이름으로 검색해 보세요.",
  onSearch,
  onSubmit,
  value,
  defaultValue = "",
}) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputValue = isControlled ? value : internalValue;
  const [isComposing, setIsComposing] = useState(false);
  const [composingValue, setComposingValue] = useState("");

  const rootClassName = useMemo(() => {
    return [styles.searchBar, className].filter(Boolean).join(" ");
  }, [className]);

  return (
    <div className={rootClassName}>
      <img src={search} alt="돋보기" className={styles.searchIcon} />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        value={isComposing ? composingValue : inputValue}
        onChange={(e) => {
          const nextValue = e.target.value;
          if (isComposing) {
            setComposingValue(nextValue);
            if (!isControlled) setInternalValue(nextValue);
            return;
          }
          if (!isControlled) setInternalValue(nextValue);
          onSearch?.(nextValue);
        }}
        onCompositionStart={(e) => {
          setIsComposing(true);
          setComposingValue(e.currentTarget.value);
        }}
        onCompositionEnd={(e) => {
          const nextValue = e.currentTarget.value;
          setIsComposing(false);
          setComposingValue("");
          if (!isControlled) setInternalValue(nextValue);
          onSearch?.(nextValue);
        }}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          if (isComposing) return;
          onSubmit?.(inputValue);
        }}
      />
    </div>
  );
}

export default SearchBar;
