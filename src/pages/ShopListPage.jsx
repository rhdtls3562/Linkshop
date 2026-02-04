import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import ShopList from "../components/ShopList";
import styles from "./ShopListPage.module.css";

const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";
const ITEMS_PER_PAGE = 1;

function ShopListPage() {
  const navigate = useNavigate();
  const observer = useRef();

  // State 관리
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [orderBy, setOrderBy] = useState("recent");

  // 무한 스크롤: 마지막 아이템 감지
  const lastItem = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) setPage((prev) => prev + 1);
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // 필터 변경: 목록 초기화 후 새로 로드
  const handleFilterChange = (newOrderBy) => {
    setOrderBy(newOrderBy);
    setShops([]);
    setPage(1);
    setHasMore(true);
  };

  // 상점 클릭: 상세 페이지로 이동
  const handleShopClick = (shopId) => {
    navigate(`/shop/${shopId}`);
  };

  const handleSearchSubmit = (rawKeyword) => {
    const keyword = (rawKeyword ?? "").trim();
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    params.set("orderBy", orderBy);
    navigate(`/search?${params.toString()}`);
  };

  // API 호출: 상점 목록 가져오기
  useEffect(() => {
    setLoading(true);

    fetch(
      `${BASE_URL}/${TEAM_ID}/linkshops?orderBy=${orderBy}&page=${page}&limit=${ITEMS_PER_PAGE}`
    )
      .then((res) => res.json())
      .then((data) => {
        const list = data.list ?? [];
        setShops((prev) => [...prev, ...list]);
        setHasMore(list.length > 0);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [page, orderBy]);

  return (
    <div className={styles.container}>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Filter onFilterChange={handleFilterChange} />
      <ShopList
        shops={shops}
        lastItemRef={lastItem}
        onShopClick={handleShopClick}
      />

      {loading && <div>로딩 중...</div>}
      {!hasMore && <div>모든 상점을 불러왔습니다 ✨</div>}
    </div>
  );
}

export default ShopListPage;
