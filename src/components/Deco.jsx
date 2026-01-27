import React from "react";
import styles from "./Deco.module.css";
import deco_pc from "../assets/deco_pc.svg";

export default function Deco() {
  return (
    <div className={styles.wrapper}>
    <img src={deco_pc} alt="링크샵 데코" className={styles.deco} />
    </div>
  );
}


