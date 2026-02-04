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
  const [selected, setSelected] = useState("정렬");

  // 필터 선택: 텍스트 업데이트 + 모달 닫기 + 부모에 값 전달
  const handleSelect = (option) => {
    setSelected(option.label);
    setIsOpen(false);
    onFilterChange?.(option.value);
  };

  return (
    <>
      {/* 필터 버튼 */}
      <div className={styles.filter}>
        <button className={styles.textBtn} onClick={() => setIsOpen(true)}>
          {selected}
        </button>
        <button className={styles.arrowBtn} onClick={() => setIsOpen(true)}>
          <img src={arrow} alt="화살표" />
        </button>
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
                <img src={close} alt="닫기" />
              </button>
            </div>

            {/* 옵션 리스트 */}
            <ul className={styles.list}>
              {FILTER_OPTIONS.map((option) => (
                <li
                  key={option.value}
                  className={selected === option.label ? styles.active : ""}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                  {selected === option.label && (
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
