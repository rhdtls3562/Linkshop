import { useState } from "react";
import { ActionCompleteModal } from "../components/ActionCompleteModal";
import { Button } from "../components/Button";
import { ProductUploader } from "../components/ProductUploader";
import { ShopManagement } from "../components/ShopManagement";
import { Toast } from "../components/Toast";
import { useImageUpload } from "../hooks/useImageUpload";
import { useProducts } from "../hooks/useProducts";
import styles from "./LinkPostPage.module.css";

const BASE_URL = "https://linkshop-api.vercel.app";

export function LinkPostPage() {
  const {
    productDataList,
    setProductDataList,
    addProduct,
    updateProduct,
    removeProduct,
  } = useProducts([]);
  const { uploadImage } = useImageUpload();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateCompleted, setIsCreateCompleted] = useState(false);
  const [shopData, setShopData] = useState({});
  const [result, setResult] = useState({});

  // 입력값 체크
  const isAllFilled =
    productDataList.every(
      (product) => product.name && product.price && product.imageUrl
    ) &&
    Object.keys(shopData).length >= 5 &&
    Object.values(shopData).every((val) => val !== "" && val !== null);

  // 최종 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true); // 모달 오버레이 오픈

    try {
      // Shop 이미지
      let shopImageUrl = shopData.imageUrl;
      if (shopData.shopImg instanceof File) {
        shopImageUrl = await uploadImage(shopData.shopImg);
      }

      // Product 이미지
      const uploadedProducts = await Promise.all(
        productDataList.map(async (product) => {
          let productImageUrl = product.imageUrl;

          if (product.imageUrl instanceof File) {
            productImageUrl = await uploadImage(product.imageUrl);
          }

          return {
            name: product.name?.trim() || "",
            price: Number(product.price) || 0,
            imageUrl: productImageUrl || "",
          };
        })
      );

      // body 값
      const requestBody = JSON.stringify({
        shop: {
          imageUrl: shopImageUrl || "",
          urlName: shopData.shopName?.trim(),
          shopUrl: shopData.shopUrl?.trim() || "",
        },
        products: uploadedProducts,
        password: shopData.userPw || "",
        userId: shopData.userId,
        name: shopData.shopName?.trim(),
      });

      // API 호출
      const response = await fetch(`${BASE_URL}/22-3/linkshops`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setResult(result);
      setIsCreateCompleted(true); // 호출 성공 시 수정 완료 창 열기
    } catch (error) {
      console.error("handleSubmit 에러:", error);
      alert("등록 중 오류가 발생했습니다.");
      setIsModalOpen(false); // 모달 오버레이 닫기(수정 완료 창 제외)
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.head}>
            <h2 className={styles.title}>대표 상품</h2>
            <button
              type="button"
              className={styles.addBtn}
              onClick={addProduct}
            >
              추가
            </button>
          </div>

          {productDataList.map((product) => (
            <ProductUploader
              key={product.id}
              productId={product.id}
              productData={product}
              onUpdate={updateProduct} // 업데이트 함수 전달
              removeProduct={removeProduct} // 상품 삭제 함수 전달
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
          isOpen={isModalOpen} // 생성하기 버튼 클릭 시 오픈
          isCreateCompleted={isCreateCompleted} // api 호출 완료 시 생성 완료 창 오픈
          result={result} // 확인 버튼 클릭 시 상세페이지로 이동
          message="등록이 완료되었습니다."
        />
      </form>
    </main>
  );
}
