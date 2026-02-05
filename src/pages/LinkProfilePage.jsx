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

const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";

function LinkProfilePage() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 상점 정보 가져오기
  useEffect(() => {
    if (!shopId) return;

    setLoading(true);
    fetch(`${BASE_URL}/${TEAM_ID}/linkshops/${shopId}`)
      .then((res) => res.json())
      .then((data) => setShopData(data))
      .catch((err) => console.error("상점 정보 로딩 실패:", err))
      .finally(() => setLoading(false));
  }, [shopId]);

  const handleShare = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    alert("URL이 복사되었습니다!");
  };

  const handleEdit = () => {
    setMenuOpen(false);
    navigate(`/link/${shopId}/edit`);
  };

  const handleDelete = () => {
    setMenuOpen(false);
    const ok = window.confirm("정말 삭제할까요?");
    if (!ok) return;
    alert("삭제되었습니다.");
    navigate("/");
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
        {/* 왼쪽 위 하트 */}
        <div className={styles.like}>
          <LikeButton />
        </div>

        {/* 오른쪽 위 공유 + 점3개 */}
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

        {/* 가운데 프로필 */}
        <div className={styles.shop}>
          <img
            src={shopData.shop?.imageUrl || shop}
            alt={shopData.name || "상점"}
          />
        </div>

        <div className={styles.nugnri}>너구리 직구상점</div>
        <div className={styles.pumpkin}>@pumpkinraccoon</div>
      </div>

      {/* 대표상품 */}
      <div className={styles.featureSection}>
        <div className={styles.text}>대표상품</div>
        <FeaturedProduct items={featuredProducts} />
      </div>
    </div>
  );
}

export default LinkProfilePage;
