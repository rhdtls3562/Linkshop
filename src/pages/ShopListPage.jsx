import React, { useEffect, useState, useCallback, useRef } from "react";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import styles from "./ShopListPage.module.css";
import ShopList from "../components/ShopList";

const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";
const ITEMS_PER_PAGE = 1;

function ShopListPage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

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

  useEffect(() => {
    setLoading(true);

    fetch(
      `${BASE_URL}/${TEAM_ID}/linkshops?page=${page}&limit=${ITEMS_PER_PAGE}`
    )
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.list ?? [];

        // 중복 데이터 테스트용으로 그냥 이어붙이기
        setShops((prev) => [...prev, ...list]);
        setHasMore(list.length > 0);
      })
      .catch((err) => console.error(err))
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
