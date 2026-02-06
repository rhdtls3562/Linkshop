import { useState } from "react";

import { ActionCompleteModal } from "../components/ActionCompleteModal";
import { Button } from "../components/Button";
import { ProductUploader } from "../components/ProductUploader";
import { ShopManagement } from "../components/ShopManagement";
import { Toast } from "../components/Toast";
import styles from "./LinkPostPage.module.css";

const BASE_URL = "https://linkshop-api.vercel.app";

export function LinkPostPage() {
  // =============================
  // 모달 관리
  // =============================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateCompleted, setIsCreateCompleted] = useState(false);

  // =============================
  // 상품 / 샵 데이터
  // =============================
  const [productDataList, setProductDataList] = useState([
    {
      id: self.crypto.randomUUID().slice(0, 4),
      productName: "",
      productPrice: "",
      productImg: "",
    },
  ]);

  const [shopData, setShopData] = useState({});
  const [uploaders, setUploaders] = useState([0]);

  // =============================
  // 입력값 체크 (배열/객체 오류 수정)
  // =============================
  const isAllFilled =
    productDataList.every(
      (product) =>
        product.productName && product.productPrice && product.productImg
    ) &&
    Object.keys(shopData).length >= 5 &&
    Object.values(shopData).every((val) => val !== "" && val !== null);

  // =============================
  // 이미지 업로드
  // =============================
  const handleImageUpload = async (imageFile) => {
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
        throw new Error("이미지 URL이 없습니다.");
      }

      return data.url; // 이미지 URL 반환
    } catch (error) {
      console.error("handleImageUpload 에러:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  // =============================
  // 최종 제출
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);

    try {
      // Shop 이미지
      let shopImageUrl = shopData.imageUrl;
      if (shopData.shopImg instanceof File) {
        shopImageUrl = await handleImageUpload(shopData.shopImg);
      }

      // Product 이미지
      const uploadedProducts = await Promise.all(
        productDataList.map(async (product) => {
          let productImageUrl = product.productImg;

          if (product.productImg instanceof File) {
            productImageUrl = await handleImageUpload(product.productImg);
          }

          return {
            name: product.productName?.trim() || "",
            price: Number(product.productPrice) || 0,
            imageUrl: productImageUrl || "",
          };
        })
      );

      const requestBody = JSON.stringify({
        shop: {
          urlName: shopData.shopName?.trim(),
          imageUrl: shopImageUrl || "",
          shopUrl: shopData.shopUrl?.trim() || "",
        },
        products: uploadedProducts,
        password: shopData.userPw || "",
        userId: shopData.userId,
        name: shopData.shopName?.trim(),
      });

      const response = await fetch(`${BASE_URL}/22-3/linkshops`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });
      console.log("5️⃣");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
      setIsCreateCompleted(true);
    } catch (error) {
      console.error("handleSubmit 에러:", error);
      alert("등록 중 오류가 발생했습니다.");
      setIsModalOpen(false);
    }
  };

  // =============================
  // 상품 추가
  // =============================
  const handleAddProductUploader = () => {
    const newProduct = {
      id: self.crypto.randomUUID().slice(0, 4),
      productName: "",
      productPrice: "",
      productImg: "",
    };

    setProductDataList([...productDataList, newProduct]);
    setUploaders([...uploaders, uploaders.length]);
  };

  // =============================
  // 상품 업데이트
  // =============================
  const updateProduct = (id, updatedData) => {
    setProductDataList(
      productDataList.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product
      )
    );
  };

  // =============================
  // 상품 삭제
  // =============================
  const removeProduct = (id) => {
    if (productDataList.length === 1) {
      alert("최소 1개의 상품이 필요합니다.");
      return;
    }
    setProductDataList(productDataList.filter((p) => p.id !== id));
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
