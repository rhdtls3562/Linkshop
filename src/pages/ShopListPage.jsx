import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ShopList from "../components/ShopList";
import styles from "./ShopListPage.module.css";
import Header from "../components/Header";
import Filter from "../components/Filter";
import black_jacket from "../assets/black_jacket.png";
import red_jacket from "../assets/red_jacket.png";
import brwon_jacket from "../assets/brown_jacket.png";
// import watch from "../assets/watch.png";
import earing from "../assets/earing.png";
import bracelet from "../assets/bracelet.png";
import shoes_white from "../assets/shoes_white.png";
import shoes_gray from "../assets/shoes_gray.png";
import shoes_blue from "../assets/shoes_blue.png";

const initialShops = [
  {
    id: 1,
    name: "너구리 직구상점",
    username: "@pumpkinraccoon",
    products: [black_jacket, red_jacket, brwon_jacket],
    likes: 65,
  },
  {
    id: 2,
    name: "구파발 보따리",
    username: "@hibottari",
    products: [bracelet, earing],
    likes: 38,
  },
  {
    id: 3,
    name: "COCO앤네",
    username: "@sleep_sound",
    products: [shoes_white, shoes_gray, shoes_blue],
    likes: 24,
  },
  {
    id: 4,
    name: "너구리 직구상점",
    username: "@pumpkinraccoon",
    products: [black_jacket, red_jacket, brwon_jacket],
    likes: 65,
  },
  {
    id: 5,
    name: "구파발 보따리",
    username: "@hibottari",
    products: [bracelet, earing],
    likes: 38,
  },
  {
    id: 6,
    name: "COCO앤네",
    username: "@sleep_sound",
    products: [shoes_white, shoes_gray, shoes_blue],
    likes: 24,
  },
];

function ShopListPage() {
  const [shops] = useState(initialShops);

  return (
    <div className={styles.container}>
      <SearchBar />
      <Filter />
      <ShopList shops={shops} />
    </div>
  );
}

export default ShopListPage;
