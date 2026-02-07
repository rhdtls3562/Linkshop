// LinkProfilePage.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "./LinkProfilePage.module.css";

import Marquee from "../components/Marquee";
import Back from "../components/Back";
import LikeButton from "../components/LikeButton";
import FeaturedProduct from "../components/FeaturedProduct";
import Loading from "../components/Loading";

import shopIcon from "../assets/shop.svg";
import share from "../assets/share.svg";
import meatball from "../assets/meatball.svg";
import close from "../assets/close.svg";

import visibilityOff from "../assets/btn_visibility_off.svg";
import visibilityOn from "../assets/btn_visibility_on.svg";

const BASE_URL = "https://linkshop-api.vercel.app";
const TEAM_ID = "22-3";
const CORRECT_PASSWORD = "test123";

export default function LinkProfilePage() {
  const { id, shopId } = useParams();
  const targetId = id || shopId;
  const navigate = useNavigate();

  const location = useLocation();
  const preloadedShop = location.state?.shop || null;

  const [menuOpen, setMenuOpen] = useState(false);
  const [shopData, setShopData] = useState(preloadedShop);
  const [loading, setLoading] = useState(!preloadedShop);

  const [isPwOpen, setIsPwOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pwAction, setPwAction] = useState(null);

  const isPwValid = password === CORRECT_PASSWORD;
  const pwInputRef = useRef(null);

  useEffect(() => {
    if (!targetId) return;

    setLoading(!preloadedShop);

    fetch(`${BASE_URL}/${TEAM_ID}/linkshops/${targetId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`GET 실패: ${res.status}`);
        return res.json();
      })
      .then((data) => setShopData(data))
      .catch((err) => {
        console.error("상점 정보 로딩 실패:", err);
        if (!preloadedShop) setShopData(null);
      })
      .finally(() => setLoading(false));
  }, [targetId, preloadedShop]);

  // ✅ iOS: 모달 오픈 시 input 포커스(키보드) 안정화
  useEffect(() => {
    if (!isPwOpen) return;

    // 한 프레임 뒤 포커스
    const raf = requestAnimationFrame(() => {
      pwInputRef.current?.focus?.();
    });

    // 모바일 바텀시트 애니메이션이 있는 경우를 대비해 한 번 더
    const t = setTimeout(() => {
      pwInputRef.current?.focus?.();
    }, 300);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [isPwOpen]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        alert("URL이 복사되었습니다!");
        return;
      }
      throw new Error("clipboard unsupported");
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        alert("URL이 복사되었습니다!");
      } catch (e) {
        console.error("URL 복사 실패:", e);
        alert("URL 복사에 실패했습니다.");
      }
    }
  };

  const resetPwState = () => {
    setPassword("");
    setPwError("");
    setShowPassword(false);
    setPwAction(null);
  };

  const openPwModal = (action) => {
    setMenuOpen(false);
    setPwAction(action);
    setPwError("");
    setPassword("");
    setShowPassword(false);
    setIsPwOpen(true);
  };

  const handleEdit = () => openPwModal("edit");
  const handleDelete = () => openPwModal("delete");

  const doDelete = async () => {
    if (!targetId) {
      alert("삭제할 대상이 없습니다.");
      return false;
    }

    const ok = window.confirm("정말 삭제할까요?");
    if (!ok) return false;

    const endpoint = `${BASE_URL}/${TEAM_ID}/linkshops/${targetId}`;

    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          currentPassword: password,
        }),
      });

      if (!res.ok) {
        const raw = await res.text();
        let parsed = null;
        try {
          parsed = raw ? JSON.parse(raw) : null;
        } catch {
          parsed = null;
        }

        console.log("[DELETE] status:", res.status);
        console.log("[DELETE] raw:", raw);
        if (parsed?.details) console.log("[DELETE] details:", parsed.details);

        alert(
          `삭제 실패 (${res.status})\n` +
            `${parsed?.message || raw || ""}` +
            (parsed?.details
              ? `\n\n[details]\n${JSON.stringify(parsed.details, null, 2)}`
              : "")
        );
        return false;
      }

      return true;
    } catch (e) {
      console.error("삭제 요청 실패:", e);
      alert("서버 오류");
      return false;
    }
  };

  const handlePwConfirm = async () => {
    if (!isPwValid) {
      setPwError("비밀번호가 올바르지 않습니다.");
      return;
    }

    setIsPwOpen(false);

    if (pwAction === "edit") {
      resetPwState();
      navigate(`/post/${targetId}/edit`, { state: { authorized: true } });
      return;
    }

    if (pwAction === "delete") {
      const deleted = await doDelete();
      resetPwState();
      if (deleted) {
        alert("삭제되었습니다.");
        navigate("/");
      }
      return;
    }

    resetPwState();
  };

  const featuredProducts = useMemo(() => {
    const products = Array.isArray(shopData?.products) ? shopData.products : [];
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

  if (loading) return <Loading />;
  if (!shopData) return <div>상점을 찾을 수 없습니다.</div>;

  const shopImageUrl = shopData.shop?.imageUrl;
  const isDefaultImage = !shopImageUrl;

  const closePwModal = () => {
    setIsPwOpen(false);
    resetPwState();
  };

  return (
    <div className={styles.marquee_top}>
      <Marquee />
      <Back />

      <div className={styles.no}>
        <div className={styles.like}>
          <LikeButton count={shopData.likes} linkShopId={shopData.id} />
        </div>

        <div className={styles.menuWrapper}>
          <button type="button" className={styles.iconButton} onClick={handleShare}>
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
              <button type="button" className={styles.menuItem} onClick={handleEdit}>
                수정하기
              </button>
              <button type="button" className={styles.menuItem} onClick={handleDelete}>
                삭제하기
              </button>
            </div>
          )}
        </div>

        <div className={`${styles.shop} ${isDefaultImage ? styles.defaultShop : ""}`}>
          <img src={shopImageUrl || shopIcon} alt="상점 이미지" />
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
          // ✅ iOS: click 대신 down 이벤트로 overlay 닫기(포커스 꼬임 감소)
          onMouseDown={closePwModal}
          onTouchStart={closePwModal}
        >
          <div
            className={styles.pwModal}
            // ✅ 내부 클릭/터치가 overlay로 전파되지 않게 차단
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.pwHeader}>
              <h3 className={styles.pwTitle}>
                {pwAction === "delete" ? "삭제 비밀번호 입력" : "비밀번호 입력"}
              </h3>
              <button type="button" className={styles.closeBtn} onClick={closePwModal}>
                <img src={close} alt="닫기" />
              </button>
            </div>

            <div className={styles.pwBody}>
              <div className={styles.pwInputWrap}>
                <input
                  ref={pwInputRef}
                  autoFocus
                  type={showPassword ? "text" : "password"}
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

                <button
                  type="button"
                  className={styles.pwEyeBtn}
                  // ✅ iOS: pointerdown + preventDefault 조합 대신 mouse/touch 분리
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPassword((p) => !p);
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPassword((p) => !p);
                  }}
                >
                  <img src={showPassword ? visibilityOn : visibilityOff} alt="" />
                </button>
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
                {pwAction === "delete" ? "삭제" : "확인"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
