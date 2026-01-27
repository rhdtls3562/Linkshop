import React from "react";
import arrow from "../assets/arrow.svg";
import styles from "./Filter.module.css";

function Filter() {
  return (
    <div className={styles.filter}>
      <button className={styles.textBtn}>상세필터</button>
      <button type="button" className={styles.arrowBtn}>
        <img src={arrow} alt="화살표" />
      </button>
    </div>
  );
}

export default Filter;
