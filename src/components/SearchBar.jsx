import React from "react";
import search from "../assets/search.svg";
import styles from "./SearchBar.module.css";

function SearchBar({ placeholder = "샵 이름으로 검색해 보세요.", onSearch }) {
  return (
    <div className={styles.searchBar}>
      <img src={search} alt="돋보기" className={styles.searchIcon} />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={(e) => onSearch?.(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
