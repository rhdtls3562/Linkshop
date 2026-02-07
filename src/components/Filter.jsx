import { useState } from "react";
import arrow from "../assets/arrow.svg";
import close from "../assets/close.svg";
import check from "../assets/check.svg";
import styles from "./Filter.module.css";

const FILTER_OPTIONS = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "likes" },
  { label: "등록된 상품수", value: "productsCount" },
];

function Filter({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onFilterChange?.(option.value);
  };

  return (
    <>
      {/* 필터 버튼들 */}
      <div className={styles.filterButtons}>
        {/* 선택된 필터 버튼 (왼쪽) */}
        {selected && (
          <div className={styles.filter}>
            <button className={styles.textBtn} onClick={() => setIsOpen(true)}>
              {selected.label}
            </button>
            <button className={styles.arrowBtn} onClick={() => setIsOpen(true)}>
              <img src={arrow} alt="arrow" />
            </button>
          </div>
        )}

        {/* 상세필터 버튼 (오른쪽) */}
        <div className={styles.filter}>
          <button className={styles.textBtn} onClick={() => setIsOpen(true)}>
            상세필터
          </button>
          <button className={styles.arrowBtn} onClick={() => setIsOpen(true)}>
            <img src={arrow} alt="arrow" />
          </button>
        </div>
      </div>

      {/* 모달 */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* 헤더 */}
            <div className={styles.header}>
              <h3>정렬</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
              >
                <img src={close} alt="close" />
              </button>
            </div>

            {/* 옵션 리스트 */}
            <ul className={styles.list}>
              {FILTER_OPTIONS.map((option) => (
                <li
                  key={option.value}
                  className={
                    selected?.value === option.value ? styles.active : ""
                  }
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                  {selected?.value === option.value && (
                    <img src={check} alt="check" />
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
