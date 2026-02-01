import styles from "./SearchResultPage.module.css";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import noResult from "../assets/Img_search_null.svg";
import { useState } from "react";

function SearchResultPage() {
  const [results, setResults] = useState([]);
  const hasResult = results.length > 0;

  return (
    <div className={styles.container}>
      <SearchBar className={styles.SearchBar} />
      <Filter />
      {hasResult ? <p>검색 결과 있음</p> : <NoResult />}
    </div>
  );
}

function NoResult() {
  return (
    <div className={styles.no}>
      <img src={noResult} alt="검색결과 없음" />
      <div className={styles.font}>
        <p>검색 결과가 없어요</p>
        <p>지금 프로필을 만들고 내 상품을 소개해보세요</p>
      </div>
    </div>
  );
}
export default SearchResultPage;
