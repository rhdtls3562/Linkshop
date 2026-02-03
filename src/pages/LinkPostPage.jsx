import { useEffect } from "react";
import { useState } from "react";
import { ActionCompleteModal } from "../components/ActionCompleteModal";
import { Button } from "../components/Button";
import { ProductUploader } from "../components/ProductUploader";
import { ShopManagement } from "../components/ShopManagement";
import { Toast } from "../components/Toast";
import styles from "./LinkPostPage.module.css";

export function LinkPostPage() {
  // 모달 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 두 컴포넌트의 데이터를 각각 관리
  const [productData, setProductData] = useState({});
  const [shopData, setShopData] = useState({});

  // 이미지 업로드 함수
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
      // console.log("handleImageUpload 응답 상태:", response.status);
      // console.log("handleImageUpload 응답 내용:", responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = JSON.parse(responseText);
      console.log("✅ 이미지 업로드 완료:", data);

      // URL 반환되는지 확인
      if (!data.url) {
        console.error("이미지 URL이 없습니다:", data);
        throw new Error("이미지 URL을 받지 못했습니다.");
      }

      // 이미지 URL 반환
      return data.url;
    } catch (error) {
      console.error("handleImageUpload API 호출 에러:", error);
      alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      console.log("handleImageUpload 함수 완료");
    }
  };

  // 최종 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("제출할 데이터:", {
      product: productData,
      shop: shopData,
    });

    try {
      // 1. Shop 이미지 업로드
      let shopImageUrl = shopData.imageUrl;
      if (shopData.shopImg instanceof File) {
        shopImageUrl = await handleImageUpload(shopData.shopImg);
      }

      // 2. Product 이미지 업로드
      let productImageUrl = productData.imageUrl;
      if (productData.productImg instanceof File) {
        productImageUrl = await handleImageUpload(productData.productImg);
      }

      const PASSWORD = "test1234";
      const BASE_URL = "https://linkshop-api.vercel.app/22-3";
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // 3. 폼 데이트를 Request body 형식에 맞게 변환
      const requestBody = JSON.stringify({
        // currentPassword: PASSWORD, // PUT, DELETE 바디 값
        shop: {
          imageUrl: shopImageUrl || "",
          urlName: shopData.shopName?.trim() || "",
          shopUrl: shopData.shopUrl?.trim() || "",
        },
        products: [
          {
            price: Number(productData.productPrice) || 0,
            imageUrl: productImageUrl?.trim() || "",
            name: productData.productName?.trim() || "",
          },
        ],
        password: shopData.userPw || "",
        userId: shopData.userId,
        name: shopData.shopName?.trim(),
      });

      console.log("handleSubmit requestBody:", requestBody);

      // 4. API 호출
      const response = await fetch(`${BASE_URL}/linkshops/`, {
        method: "POST",
        headers: myHeaders,
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.message} `
        );
      }

      const result = await response.json();
      console.log("✅ 최종 제출 완료:", result);

      // 성공 시 모달 열기
      setIsModalOpen(true);
    } catch (error) {
      console.error("handleSubmit API 호출 에러:", error);
      alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      console.log("handleSubmit 함수 완료");
    }
  };

  // 모든 인풋 값이 채워졌는지 확인
  const isAllFilled =
    Object.keys(productData).length >= 3 &&
    Object.values(productData).every((val) => val !== "" && val !== null) &&
    Object.keys(shopData).length >= 5 &&
    Object.values(shopData).every((val) => val !== "" && val !== null);

  return (
    <>
      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.container}>
            <div className={styles.head}>
              <h2 className={styles.title}>대표 상품</h2>
              <button type="button" className={styles.btn}>
                추가
              </button>
            </div>
            <ProductUploader
              formData={productData}
              setFormData={setProductData}
            />
          </div>
          <div className={styles.container}>
            <div className={styles.head}>
              <h2 className={styles.title}>내 쇼핑몰</h2>
            </div>
            <ShopManagement formData={shopData} setFormData={setShopData} />
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
          <Toast isOpen={isModalOpen} message="등록 완료!" />
          <ActionCompleteModal
            onClose={() => setIsModalOpen(false)}
            isOpen={isModalOpen}
            message="등록이 완료되었습니다."
          />
        </form>
      </main>
    </>
  );
}
