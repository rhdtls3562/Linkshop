import React, { useEffect, useState, useCallback, useRef } from "react";
import SearchBar from "../components/SearchBar";
import ShopList from "../components/ShopList";
import Filter from "../components/Filter";
import styles from "./ShopListPage.module.css";

const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";
const ITEMS_PER_PAGE = 10;

function ShopListPage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  // 마지막 아이템 감지
  const lastItem = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // 페이지마다 데이터 로드
  useEffect(() => {
    setLoading(true);

    fetch(
      `${BASE_URL}/${TEAM_ID}/linkshops?page=${page}&limit=${ITEMS_PER_PAGE}`
    )
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.list ?? [];
        setShops((prev) => [...prev, ...list]);
        setHasMore(list.length > 0);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className={styles.container}>
      <SearchBar />
      <Filter />
      <ShopList shops={shops} lastItemRef={lastItem} />
      {loading && <div>로딩 중...</div>}
      {!hasMore && <div>모든 상점을 불러왔습니다 ✨</div>}
    </div>
  );
}

export default ShopListPage;
