import React, { useEffect, useState, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import ShopList from "../components/ShopList";
import Filter from "../components/Filter";
import styles from "./ShopListPage.module.css";

const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";

function ShopListPage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  //마지막 상품 데이터 추적 함수
  const lastItem = useCallback((node) => {
    if (node !== null) {
      console.log("마지막 데이터 로딩 완료");
    }
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/${TEAM_ID}/linkshops`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.list ?? [];
        setShops(list);
      })
      .catch((error) => {
        console.error("상점 목록을 불러오는데 실패했습니다:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <SearchBar />
      <Filter />
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <ShopList shops={shops} lastItemRef={lastItem} />
      )}
    </div>
  );
}

export default ShopListPage;
