import { useState } from "react";
import arrow from "../assets/arrow.svg";
import styles from "./Filter.module.css";
import close from "../assets/close.svg";
import check from "../assets/check.svg";

function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("상세필터");

  const options = ["최신순", "좋아요순", "등록된 상품순"];

  return (
    <>
      {/* 필터 버튼 */}
      <div className={styles.filter} onClick={() => setIsOpen(true)}>
        <button className={styles.textBtn}>{selected}</button>
        <button type="button" className={styles.arrowBtn}>
          <img src={arrow} alt="화살표" />
        </button>
      </div>

      {/* 모달 UI만 */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.header}>
              <h3>정렬</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
              >
                <img src={close} alt="닫기" />
              </button>
            </div>

            <ul className={styles.list}>
              {options.map((option) => (
                <li
                  key={option}
                  className={selected === option ? styles.active : ""}
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                  {selected === option && (
                    <span>
                      <img src={check} alt="체크" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Filter;
