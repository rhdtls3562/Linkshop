import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ShopList from "../components/ShopList";
import Filter from "../components/Filter";
import styles from "./ShopListPage.module.css";

const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";

function ShopListPage() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/${TEAM_ID}/linkshops`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.list ?? [];
        setShops(list);
      })
      .catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <SearchBar />
      <Filter />
      <ShopList shops={shops} />
    </div>
  );
}

export default ShopListPage;
