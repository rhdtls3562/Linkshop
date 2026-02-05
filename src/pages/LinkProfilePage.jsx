// LinkProfilePage.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./LinkProfilePage.module.css";

import Marquee from "../components/Marquee";
import Back from "../components/Back";
import LikeButton from "../components/LikeButton";
import FeaturedProduct from "../components/FeaturedProduct";
import Loading from "../components/Loading";

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

  const [menuOpen, setMenuOpen] = useState(false);
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isPwOpen, setIsPwOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState("");

  // ✅ 비밀번호 보기/숨기기
  const [showPw, setShowPw] = useState(false);

  const isPwValid = password === CORRECT_PASSWORD;

  useEffect(() => {
    if (!targetId) return;

    setLoading(true);
    fetch(`${BASE_URL}/${TEAM_ID}/linkshops/${targetId}`)
      .then((res) => res.json())
      .then((data) => setShopData(data))
      .catch((err) => console.error("상점 정보 로딩 실패:", err))
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
    setShowPw(false);
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

  const featuredProducts = [
    {
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
      name: "아디다스 가젤 HP5379",
      price: 134000,
    },
    {
      id: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300",
      name: "아디다스 가젤 HP5379",
      price: 104000,
    },
    {
      id: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
      name: "나이키 집업",
      price: 154000,
    },
    {
      id: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1528701800489-20be3c4eaad6?w=300",
      name: "나이키 신발",
      price: 124000,
    },
    {
      id: 5,
      imageUrl:
        "https://images.unsplash.com/photo-1528701800489-20be3c4eaad6?w=300",
      name: "나이키 신발",
      price: 124000,
    },
    {
      id: 6,
      imageUrl:
        "https://images.unsplash.com/photo-1528701800489-20be3c4eaad6?w=300",
      name: "나이키 신발",
      price: 124000,
    },
  ];

  if (loading) return <Loading />;
  if (!shopData) return <div>상점을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.marquee_top}>
      <Marquee className={styles.marquee} />
      <Back className={styles.Back} />

      <div className={styles.no}>
        <div className={styles.like}>
          <LikeButton />
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
          <img
            src={shopData.shop?.imageUrl || shop}
            alt={shopData.name || "상점"}
          />
        </div>

        <div className={styles.nugnri}>너구리 직구상점</div>
        <div className={styles.pumpkin}>@pumpkinraccoon</div>
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
                  type={showPw ? "text" : "password"}
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
