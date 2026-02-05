// LinkPostPage.jsx (authorized 없으면 프로필로 되돌리기 + 기존 버그 수정 포함)
import { useState } from "react";
import { useLocation, Navigate, useParams } from "react-router-dom";
import { ActionCompleteModal } from "../components/ActionCompleteModal";
import { Button } from "../components/Button";
import { ProductUploader } from "../components/ProductUploader";
import { ShopManagement } from "../components/ShopManagement";
import { Toast } from "../components/Toast";
import styles from "./LinkPostPage.module.css";

export function LinkPostPage() {
  const location = useLocation();
  const { id } = useParams();

  // ✅ 비번 인증 없이 /post/:id/edit 직접 접근하면 막기
  // - /linkpost(생성페이지) 같은 곳에서는 params.id가 없고 state도 없을 수 있음
  // - "edit 경로일 때만" 막고 싶으면 아래 조건 그대로 두면 됨(대부분 edit에서만 id가 존재)
  const isEditRoute = Boolean(id);
  const isAuthorized = location.state?.authorized === true;

  if (isEditRoute && !isAuthorized) {
    return <Navigate to={`/profile/${id}`} replace />;
  }

  // 모달 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateCompleted, setIsCreateCompleted] = useState(false);

  // 상품 데이터
  const [productDataList, setProductDataList] = useState([
    {
      id: self.crypto.randomUUID().slice(0, 4),
      productName: "",
      productPrice: "",
      productImg: "",
    },
  ]);

  const [shopData, setShopData] = useState({});

  // ✅ 전체 입력 체크(배열/객체 기준으로 수정)
  const isAllFilled =
    productDataList.length >= 1 &&
    productDataList.every(
      (p) =>
        p.productName?.trim() &&
        String(p.productPrice).trim() &&
        p.productImg !== "" &&
        p.productImg !== null
    ) &&
    Object.keys(shopData).length >= 1 &&
    Object.values(shopData).every((val) => val !== "" && val !== null);

  // 이미지 업로드
  const handleImageUpload = async (imageFile) => {
    const BASE_URL = "https://linkshop-api.vercel.app";
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(`${BASE_URL}/images/upload`, {
        method: "POST",
        body: formData,
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = JSON.parse(responseText);

      if (!data.url) {
        console.error("이미지 URL이 없습니다:", data);
        throw new Error("이미지 URL을 받지 못했습니다.");
      }

      return data.url;
    } catch (error) {
      console.error("handleImageUpload API 호출 에러:", error);
      alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      return "";
    } finally {
      console.log("📍handleImageUpload 함수 완료");
    }
  };

  // 최종 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);

    try {
      // 1) shop 이미지
      let shopImageUrl = shopData.imageUrl;
      if (shopData.shopImg instanceof File) {
        shopImageUrl = await handleImageUpload(shopData.shopImg);
      }

      // 2) product 이미지 + 매핑(기존 버그 수정: productDataList.xxx → product.xxx)
      const uploadedProducts = await Promise.all(
        productDataList.map(async (product) => {
          let productImageUrl = product.productImg;

          if (product.productImg instanceof File) {
            productImageUrl = await handleImageUpload(product.productImg);
          }

          return {
            price: Number(product.productPrice) || 0,
            imageUrl: productImageUrl?.trim() || "",
            name: product.productName?.trim() || "",
          };
        })
      );

      const BASE_URL = "https://linkshop-api.vercel.app/22-3";
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestBody = JSON.stringify({
        shop: {
          imageUrl: shopImageUrl || "",
          urlName: shopData.shopName?.trim() || "",
          shopUrl: shopData.shopUrl?.trim() || "",
        },
        products: uploadedProducts,
        password: shopData.userPw || "",
        userId: shopData.userId,
        name: shopData.shopName?.trim(),
      });

      const response = await fetch(`${BASE_URL}/linkshops`, {
        method: "POST",
        headers: myHeaders,
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ 최종 제출 완료:", result);

      setIsCreateCompleted(true);
    } catch (error) {
      console.error("handleSubmit API 호출 에러:", error);
      alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsModalOpen(false);
    } finally {
      console.log("📍 handleSubmit 함수 완료");
    }
  };

  // 상품 추가
  const handleAddProductUploader = () => {
    const newProduct = {
      id: self.crypto.randomUUID().slice(0, 4),
      productName: "",
      productPrice: "",
      productImg: "",
    };
    setProductDataList((prev) => [...prev, newProduct]);
  };

  // 상품 업데이트
  const updateProduct = (id, updatedData) => {
    setProductDataList((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product
      )
    );
  };

  // 상품 삭제
  const removeProduct = (id) => {
    if (productDataList.length === 1) {
      alert("최소 1개의 상품이 필요합니다.");
      return;
    }
    setProductDataList((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.head}>
            <h2 className={styles.title}>대표 상품</h2>
            <button
              type="button"
              className={styles.btn}
              onClick={handleAddProductUploader}
            >
              추가
            </button>
          </div>

          {productDataList.map((product) => (
            <ProductUploader
              key={product.id}
              productId={product.id}
              productData={product}
              onUpdate={updateProduct}
              removeProduct={removeProduct}
            />
          ))}
        </div>

        <div className={styles.container}>
          <div className={styles.head}>
            <h2 className={styles.title}>내 쇼핑몰</h2>
          </div>

          <ShopManagement shopData={shopData} onUpdate={setShopData} />
        </div>

        <Button
          type="submit"
          className={
            isAllFilled
              ? `${styles.createbtn} ${styles.active}`
              : styles.createbtn
          }
          disabled={!isAllFilled}
        >
          생성하기
        </Button>

        <Toast isOpen={isCreateCompleted} message="등록 완료!" />

        <ActionCompleteModal
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          isCreateCompleted={isCreateCompleted}
          message="등록이 완료되었습니다."
        />
      </form>
    </main>
  );
}
