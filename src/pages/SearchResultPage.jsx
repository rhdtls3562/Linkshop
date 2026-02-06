import styles from "./SearchResultPage.module.css";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import noResult from "../assets/Img_search_null.svg";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ShopList from "../components/ShopList";

const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";

function SearchResultPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [keywordInput, setKeywordInput] = useState(
    () => searchParams.get("keyword") ?? "",
  );
  const [orderBy, setOrderBy] = useState(
    () => searchParams.get("orderBy") ?? "recent",
  );

  const queryKeyword = useMemo(() => keywordInput.trim(), [keywordInput]);

  const hasResult = results.length > 0;

  const handleKeywordChange = (nextKeyword) => {
    setKeywordInput(nextKeyword);

    const trimmed = nextKeyword.trim();
    if (!trimmed) {
      navigate("/list", { replace: true });
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("keyword", nextKeyword);
    nextParams.set("orderBy", orderBy);
    setSearchParams(nextParams, { replace: true });
  };

  const handleFilterChange = (newOrderBy) => {
    setOrderBy(newOrderBy);

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("orderBy", newOrderBy);
    if (keywordInput.trim()) nextParams.set("keyword", keywordInput);
    setSearchParams(nextParams, { replace: true });
  };

  const handleShopClick = (shopId) => {
    navigate(`/shop/${shopId}`);
  };

  useEffect(() => {
    if (!queryKeyword) {
      setResults([]);
      return;
    }

    const params = new URLSearchParams();
    params.set("orderBy", orderBy);
    params.set("keyword", queryKeyword);

    setLoading(true);
    fetch(`${BASE_URL}/${TEAM_ID}/linkshops?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setResults(data.list ?? []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [orderBy, queryKeyword]);

  useEffect(() => {
    const nextKeyword = searchParams.get("keyword") ?? "";
    const nextOrderBy = searchParams.get("orderBy") ?? "recent";

    if (nextKeyword !== keywordInput) setKeywordInput(nextKeyword);
    if (nextOrderBy !== orderBy) setOrderBy(nextOrderBy);
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <SearchBar value={keywordInput} onSearch={handleKeywordChange} />
      <Filter onFilterChange={handleFilterChange} />

      {loading ? (
        <div>로딩 중...</div>
      ) : hasResult ? (
        <ShopList shops={results} onShopClick={handleShopClick} />
      ) : queryKeyword ? (
        <NoResult />
      ) : (
        <NoResult />
      )}
    </div>
  );
}

function NoResult() {
  return (
    <div className={styles.no}>
      <img className={styles.noImg} src={noResult} alt="검색 결과 없음" />
      <div className={styles.font}>
        <p>검색 결과가 없어요.</p>
        <p>지금 프로필을 만들고 상품을 소개해 보세요.</p>
      </div>
    </div>
  );
}

export default SearchResultPage;
