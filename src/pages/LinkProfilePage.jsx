// LinkProfilePage.jsx
import { useState, useEffect, useMemo } from "react";
import {
  useNavigate,
  useParams,
  useLocation, // ✅ 추가
} from "react-router-dom";
import styles from "./LinkProfilePage.module.css";

import Marquee from "../components/Marquee";
import Back from "../components/Back";
import LikeButton from "../components/LikeButton";
import FeaturedProduct from "../components/FeaturedProduct";

import shop from "../assets/shop.svg";
import share from "../assets/share.svg";
import meatball from "../assets/meatball.svg";
import close from "../assets/close.svg";

const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";
const CORRECT_PASSWORD = "test123";

function LinkProfilePage() {
  const { id, shopId } = useParams();
  const targetId = id || shopId;
  const navigate = useNavigate();

  // ✅ ShopListPage에서 전달된 state 받기
  const location = useLocation();
  const preloadedShop = location.state?.shop || null;

  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ preloadedShop이 있으면 그걸로 먼저 렌더
  const [shopData, setShopData] = useState(preloadedShop);
  const [loading, setLoading] = useState(!preloadedShop);

  const [isPwOpen, setIsPwOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState("");

  const isPwValid = password === CORRECT_PASSWORD;

  useEffect(() => {
    if (!targetId) return;

    // ✅ 이미 받은 데이터가 있으면 로딩 최소화
    setLoading(!preloadedShop);

    fetch(`${BASE_URL}/${TEAM_ID}/linkshops/${targetId}`)
      .then((res) => res.json())
      .then((data) => setShopData(data))
      .catch((err) => {
        console.error("상점 정보 로딩 실패:", err);
        // ❗ 실패 시 preloadedShop 유지
        if (!preloadedShop) setShopData(null);
      })
      .finally(() => setLoading(false));
  }, [targetId]);

  const handleShare = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    alert("URL이 복사되었습니다!");
  };

  const handleEdit = () => {
    setMenuOpen(false);
    setPassword("");
    setPwError("");
    setIsPwOpen(true);
  };

  const handleDelete = () => {
    setMenuOpen(false);
    const ok = window.confirm("정말 삭제할까요?");
    if (!ok) return;
    alert("삭제되었습니다.");
    navigate("/");
  };

  const handlePwConfirm = () => {
    if (!isPwValid) {
      setPwError("비밀번호가 올바르지 않습니다.");
      return;
    }

    setIsPwOpen(false);
    setPwError("");

    navigate(`/post/${targetId}/edit`, {
      state: { authorized: true },
    });
  };

  // ✅ 대표상품: 상세 API 기준 (없으면 빈 배열)
  const featuredProducts = useMemo(() => {
    const products = Array.isArray(shopData?.products)
      ? shopData.products
      : [];

    return products
      .filter((p) => p?.imageUrl)
      .slice(0, 6)
      .map((p) => ({
        id: p.id,
        imageUrl: p.imageUrl,
        name: p.name || "상품명 없음",
        price: p.price ?? 0,
      }));
  }, [shopData]);

  if (loading) return <div>로딩 중...</div>;
  if (!shopData) return <div>상점을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.marquee_top}>
      <Marquee className={styles.marquee} />
      <Back className={styles.Back} />

      <div className={styles.no}>
      <div className={styles.like}>
  <LikeButton
    count={shopData.likes}
    linkShopId={shopData.id}
  />
</div>


        <div className={styles.menuWrapper}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={handleShare}
          >
            <img src={share} alt="공유" />
          </button>

          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <img src={meatball} alt="메뉴" />
          </button>

          {menuOpen && (
            <div className={styles.menuBox}>
              <button
                type="button"
                className={styles.menuItem}
                onClick={handleEdit}
              >
                수정하기
              </button>
              <button
                type="button"
                className={styles.menuItem}
                onClick={handleDelete}
              >
                삭제하기
              </button>
            </div>
          )}
        </div>

      <div className={styles.shop}>
  <img src={shop} alt="상점" />
</div>

<div className={styles.nugnri}>{shopData.name}</div>
<div className={styles.pumpkin}>@{shopData.userId}</div>
      </div>

      <div className={styles.featureSection}>
        <div className={styles.text}>대표상품</div>
        <FeaturedProduct items={featuredProducts} />
      </div>

      {isPwOpen && (
        <div
          className={styles.pwOverlay}
          onClick={() => setIsPwOpen(false)}
          role="presentation"
        >
          <div
            className={styles.pwModal}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pw-title"
          >
            <div className={styles.pwHeader}>
              <h3 id="pw-title" className={styles.pwTitle}>
                비밀번호 입력
              </h3>
              <button
                className={styles.closeBtn}
                onClick={() => setIsPwOpen(false)}
                type="button"
              >
                <img src={close} alt="닫기" />
              </button>
            </div>

            <div className={styles.pwBody}>
              <div className={styles.pwInputWrap}>
                <input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPwError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handlePwConfirm();
                  }}
                  className={styles.pwInput}
                />
              </div>

              {pwError && <div className={styles.pwError}>{pwError}</div>}

              <button
                type="button"
                onClick={handlePwConfirm}
                className={`${styles.pwButton} ${
                  isPwValid ? styles.pwButtonActive : styles.pwButtonDisabled
                }`}
                disabled={!isPwValid}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LinkProfilePage;
