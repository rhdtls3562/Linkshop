import React from "react";
import styles from "./Back.module.css"
import backIcon from "../assets/back.svg";

export default function Back({ children = "돌아가기", onClick }) {
    return (
        <button type="button" className={styles.backBtn} onClick={onClick}>
        <span className={styles.iconBox}>
        <img src={backIcon} alt="" className={styles.icon} />
        </span>
        <span className={styles.text}>{children}</span>
        </button>
    ) ;
 }