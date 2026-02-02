import React, { useEffect, useState, useRef, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import ShopList from "../components/ShopList";
import Filter from "../components/Filter";
import styles from "./ShopListPage.module.css";

const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";

function ShopListPage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef();

  const loadMoreShops = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const url = cursor
        ? `${BASE_URL}/${TEAM_ID}/linkshops?cursor=${cursor}`
        : `${BASE_URL}/${TEAM_ID}/linkshops`;

      const res = await fetch(url);
      const data = await res.json();

      const list = Array.isArray(data) ? data : data.list ?? [];

      setShops((prev) => [...prev, ...list]);
      setCursor(data.nextCursor);
      setHasMore(!!data.nextCursor);
    } catch (error) {
      console.error("상점 목록을 불러오는데 실패했습니다:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, cursor]);

  const lastShopRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreShops();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, loadMoreShops]
  );

  useEffect(() => {
    if (shops.length === 0) {
      loadMoreShops();
    }
  }, [loadMoreShops, shops.length]);

  return (
    <div className={styles.container}>
      <SearchBar />
      <Filter />
      <ShopList shops={shops} lastShopRef={lastShopRef} />
      {loading && <div className={styles.loading}>로딩 중...</div>}
    </div>
  );
}

export default ShopListPage;
