import styles from "./SearchResultPage.module.css";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import noResult from "../assets/Img_search_null.svg";
import { useEffect, useMemo, useState } from "react"; //useState: 상태저장 useEffect: 특정 값이 바뀔 때 실행 useMemo: 계산 결과를 메모(불필요한 재계산x)
import { useNavigate, useSearchParams } from "react-router-dom"; //useNavigate: 코드로 페이지 이동 useSearchParams: URL 쿼리 스트링 읽고 쓰기
import ShopList from "../components/ShopList"; //결과 리스트
import Loading from "../components/Loading";

const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";

//keyWordInput: 지금 검색창에 타이핑중인 글자
//nextKeyword: 이제 적용할 예정인 키워드
//queryKeyword: URL에 확정돼서 들어간 공식 검색어(진짜 검색에 사용중인 키보드)
//keyWordInput -> nextKeyword -> queryKeyword

function SearchResultPage() {
  const navigate = useNavigate(); //코드로 페이지 이동할 때 쓰는 함수 얻기

  const [results, setResults] = useState([]); //검색 결과 목록 저장
  const [loading, setLoading] = useState(false); //API 요청 중인지 여부
  const [searchParams, setSearchParams] = useSearchParams(); //현재 URL의 쿼리 파라미터 읽기 쓰기

  const [keywordInput, setKeywordInput] = useState(
    //검색창에 들어갈 값. 초기값을 URL의 키워드에서 가져오고 없으면 빈 문자열.
    () => searchParams.get("keyword") ?? "",
  );
  const [orderBy, setOrderBy] = useState(
    //정렬 기준(없으면 최신순)
    () => searchParams.get("orderBy") ?? "recent",
  );

  const queryKeyword = useMemo(() => keywordInput.trim(), [keywordInput]); //keywordInput에서 앞뒤 공백을 제거한 값

  const hasResult = results.length > 0; //결과 배열이 비어있는지 체크

  const handleKeywordChange = (nextKeyword) => {
    //SearchBar에서 입력이 바뀔 때 실행될 함수(SearchBar가 호출)
    setKeywordInput(nextKeyword); //화면 입력값 상태 업데이트(동기화)

    const trimmed = nextKeyword.trim(); //공백 제거한 검색어 만들기
    if (!trimmed) {
      //공백 제거 했을 시 아무 글자도 없으면 /list로 이동
      navigate("/list", { replace: true });
      return;
    }

    const nextParams = new URLSearchParams(searchParams); //현재 쿼리파라미터를 복사해서 수정할 준비
    nextParams.set("keyword", trimmed);
    nextParams.set("orderBy", orderBy);
    setSearchParams(nextParams, { replace: true }); //실제로 URL쿼리스트링을 업데이트
  };

  //Filter에서 정렬이 바뀌면 실행
  const handleFilterChange = (newOrderBy) => {
    setOrderBy(newOrderBy);

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("orderBy", newOrderBy);

    //검색어가 비어있지 않으면 keyword도 유지해서 URL에 같이 넣음
    if (keywordInput.trim()) nextParams.set("keyword", keywordInput);
    setSearchParams(nextParams, { replace: true });
  };

  //결과 목록에서 카드를 클릭하면 상세로 이동
  const handleShopClick = (shopId) => {
    navigate(`/shop/${shopId}`);
  };

  //검색 API 호출
  useEffect(() => {
    if (!queryKeyword) {
      //만약 queryKeyword가 비어있으면 결과를 비우고 API요청 안함
      setResults([]);
      return;
    }

    const params = new URLSearchParams();
    params.set("orderBy", orderBy);
    params.set("keyword", queryKeyword);

    setLoading(true);
    fetch(`${BASE_URL}/${TEAM_ID}/linkshops?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setResults(data.list ?? []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [orderBy, queryKeyword]); //orderBy, queryKeyword가 바뀔때마다 실행됨

  //URL이 바뀌면 state를 URL에 맞춰 동기화
  useEffect(() => {
    const nextKeyword = searchParams.get("keyword") ?? "";
    const nextOrderBy = searchParams.get("orderBy") ?? "recent";

    if (nextKeyword !== keywordInput) setKeywordInput(nextKeyword); //URL값과 state가 다르면 state를 URL로 맞춤
    if (nextOrderBy !== orderBy) setOrderBy(nextOrderBy);
  }, [searchParams]);

  //화면에 뭘 보여줄지 (content) 결정
  let content;

  if (loading) {
    content = <Loading />;
  } else if (hasResult) {
    content = <ShopList shops={results} onShopClick={handleShopClick} />;
  } else {
    content = <NoResult />;
  }

  return (
    <div className={styles.container}>
      <SearchBar value={keywordInput} onSearch={handleKeywordChange} />
      <Filter onFilterChange={handleFilterChange} className={styles.filter} />

      {content}
    </div>
  );
}

function NoResult() {
  return (
    <div className={styles.no}>
      {/*이미지 전용 래퍼 */}
      <div className={styles.imageRow}>
        <img className={styles.noImg} src={noResult} alt="검색 결과 없음" />
      </div>

      <div className={styles.font}>
        <p>검색 결과가 없어요.</p>
        <p>지금 프로필을 만들고 상품을 소개해 보세요.</p>
      </div>
    </div>
  );
}

export default SearchResultPage;
