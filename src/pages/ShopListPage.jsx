import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import ShopList from "../components/ShopList";
import styles from "./ShopListPage.module.css";

// API 관련 상수 정의
const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";
const ITEMS_PER_PAGE = 1; // 한 번에 가져올 상점 개수

/**
 * ShopListPage 컴포넌트
 * 상점 목록을 무한 스크롤로 표시하고, 필터링 기능을 제공
 */
function ShopListPage() {
  // React Router의 navigate 함수
  const navigate = useNavigate();

  // 상점 목록 데이터 저장
  const [shops, setShops] = useState([]);

  // 로딩 상태 관리 (로딩 중일 때 true)
  const [loading, setLoading] = useState(false);

  // 현재 페이지 번호 (무한 스크롤용)
  const [page, setPage] = useState(1);

  // 더 가져올 데이터가 있는지 여부
  const [hasMore, setHasMore] = useState(true);

  // 현재 선택된 정렬 기준 (기본값: 최신순)
  const [orderBy, setOrderBy] = useState("recent");

  // IntersectionObserver를 저장할 ref
  // (컴포넌트가 리렌더링되어도 observer 인스턴스 유지)
  const observer = useRef();

  /**
   * 무한 스크롤을 위한 마지막 아이템 감지 콜백
   * @param {HTMLElement} node - 마지막 아이템의 DOM 노드
   */
  const lastItem = useCallback(
    (node) => {
      // 로딩 중이거나 더 이상 데이터가 없으면 실행하지 않음
      if (loading || !hasMore) return;

      // 이전 observer가 있으면 연결 해제
      if (observer.current) observer.current.disconnect();

      // 새로운 IntersectionObserver 생성
      observer.current = new IntersectionObserver((entries) => {
        // 마지막 아이템이 화면에 보이면 다음 페이지 로드
        if (entries[0].isIntersecting) setPage((prev) => prev + 1);
      });

      // 마지막 아이템 노드를 observer에 등록
      if (node) observer.current.observe(node);
    },
    [loading, hasMore] // loading이나 hasMore가 변경되면 콜백 재생성
  );

  /**
   * 필터 변경 핸들러
   * @param {string} newOrderBy - 새로운 정렬 기준 ("recent", "favorite", "productsCount")
   */
  const handleFilterChange = (newOrderBy) => {
    // 1. 정렬 기준 업데이트
    setOrderBy(newOrderBy);

    // 2. 기존 상점 목록 초기화 (새로운 정렬로 처음부터 다시 로드)
    setShops([]);

    // 3. 페이지를 1로 리셋
    setPage(1);

    // 4. 더보기 상태 초기화
    setHasMore(true);
  };

  /**
   * 상점 클릭 핸들러
   * @param {number} shopId - 클릭한 상점의 ID
   */
  const handleShopClick = (shopId) => {
    // 상점 상세 페이지로 이동 (URL에 shopId 포함)
    navigate(`/shop/${shopId}`);
  };

  /**
   * 상점 목록 데이터 가져오기
   * page나 orderBy가 변경될 때마다 실행
   */
  useEffect(() => {
    // 로딩 시작
    setLoading(true);

    // API 호출
    fetch(
      `${BASE_URL}/${TEAM_ID}/linkshops?orderBy=${orderBy}&page=${page}&limit=${ITEMS_PER_PAGE}`
    )
      .then((res) => res.json())
      .then((data) => {
        // API 응답에서 list 배열 추출 (없으면 빈 배열)
        const list = data.list ?? [];

        // 기존 목록에 새로운 데이터 추가 (무한 스크롤)
        setShops((prev) => [...prev, ...list]);

        // 가져온 데이터가 없으면 더 이상 로드할 데이터 없음
        setHasMore(list.length > 0);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        // 로딩 종료
        setLoading(false);
      });
  }, [page, orderBy]); // page나 orderBy가 변경될 때마다 실행

  return (
    <div className={styles.container}>
      {/* 검색바 */}
      <SearchBar />

      {/* 필터 컴포넌트: 필터 변경 시 handleFilterChange 호출 */}
      <Filter onFilterChange={handleFilterChange} />

      {/* 상점 목록: 무한 스크롤을 위해 lastItemRef 전달, 클릭 핸들러 추가 */}
      <ShopList
        shops={shops}
        lastItemRef={lastItem}
        onShopClick={handleShopClick}
      />

      {/* 로딩 중 표시 */}
      {loading && <div>로딩 중...</div>}

      {/* 모든 데이터 로드 완료 메시지 */}
      {!hasMore && <div>모든 상점을 불러왔습니다 ✨</div>}
    </div>
  );
}

export default ShopListPage;
