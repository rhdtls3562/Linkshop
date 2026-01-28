import styles from "./SearchResultPage.module.css";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import noResult from "../assets/Img_search_null.svg";

function SearchResultPage() {
  return (
    <div className={styles.container}>
      <SearchBar className={styles.SearchBar} />
      <Filter />

      <div className={styles.no}>
        <img src={noResult} alt="검색결과 없음" />
        <div>검색 결과가 없어요</div>
        <div>지금 프로필을 만들고 내 상품을 소개해보세요</div>
      </div>
    </div>
  );
}

export default SearchResultPage;
