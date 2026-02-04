import { useState } from "react";
import arrow from "../assets/arrow.svg";
import close from "../assets/close.svg";
import check from "../assets/check.svg";
import styles from "./Filter.module.css";

// 필터 옵션 상수 정의
// label: 사용자에게 보여지는 텍스트
// value: API에 전달되는 실제 파라미터 값
const FILTER_OPTIONS = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "likes" },
  { label: "등록된 상품순", value: "productsCount" },
];

//  Filter 컴포넌트
//  * @param {Function} onFilterChange - 필터 변경 시 부모 컴포넌트에 알리는 콜백 함수
function Filter({ onFilterChange }) {
  // 모달 열림/닫힘 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  // 현재 선택된 필터 옵션의 label을 저장 (화면에 표시용)
  const [selected, setSelected] = useState("상세필터");

  //
  //필터 옵션 선택 핸들러
  //@param {Object} option - 선택된 필터 옵션 객체 {label, value}
  const handleSelect = (option) => {
    // 1. 화면에 표시될 텍스트 업데이트
    setSelected(option.label);

    // 2. 모달 닫기
    setIsOpen(false);

    // 3. 부모 컴포넌트에 API 파라미터(value) 전달
    // 예: "최신순" 선택 시 "recent"를 부모에게 전달
    onFilterChange(option.value);
  };

  return (
    <>
      {/* 필터 버튼 영역 */}
      <div className={styles.filter}>
        {/* 선택된 필터명을 표시하는 텍스트 버튼 */}
        <button className={styles.textBtn} onClick={() => setIsOpen(true)}>
          {selected}
        </button>

        {/* 화살표 아이콘 버튼 */}
        <button className={styles.arrowBtn} onClick={() => setIsOpen(true)}>
          <img src={arrow} alt="화살표" />
        </button>
      </div>

      {/* 모달이 열렸을 때만 렌더링 */}
      {isOpen && (
        // 오버레이: 모달 배경 (클릭 시 모달 닫힘)
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          {/* 모달 본체: stopPropagation으로 클릭 시 닫힘 방지 */}
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* 모달 헤더 */}
            <div className={styles.header}>
              <h3>정렬</h3>
              {/* 닫기 버튼 */}
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
              >
                <img src={close} alt="닫기" />
              </button>
            </div>

            {/* 필터 옵션 리스트 */}
            <ul className={styles.list}>
              {FILTER_OPTIONS.map((option) => (
                <li
                  key={option.value} // 고유 key로 value 사용
                  // 선택된 항목에 active 클래스 추가
                  className={selected === option.label ? styles.active : ""}
                  // 클릭 시 해당 옵션 선택
                  onClick={() => handleSelect(option)}
                >
                  {option.label}

                  {/* 선택된 항목에만 체크 아이콘 표시 */}
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
