import { useEffect } from "react";
import { useState } from "react";
import { ActionCompleteModal } from "../components/ActionCompleteModal";
import { Button } from "../components/Button";
import { ProductUploader } from "../components/ProductUploader";
import { ShopManagement } from "../components/ShopManagement";
import { Toast } from "../components/Toast";
import styles from "./LinkPostPage.module.css";

export function LinkPostPage() {
  // 두 컴포넌트의 데이터를 각각 관리
  const [productData, setProductData] = useState({});
  const [shopData, setShopData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("제출할 데이터:", {
      product: productData,
      shop: shopData,
    });

    // ================================
    // API 테스트 코드
    // ================================

    const BASE_URL = "https://linkshop-api.vercel.app";
    const formData = new FormData();

    formData.append("image", shopData.shopImg);

    try {
      const response = await fetch(`${BASE_URL}/images/upload`, {
        method: "POST",
        body: formData,
      });

      const responseText = await response.text();
      console.log("응답 상태:", response.status);
      console.log("응답 내용:", responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = JSON.parse(responseText);
      console.log("생성 완료:", data);

      // setIsModalOpen(true);
    } catch (error) {
      console.error("API 호출 에러:", error);
      alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      console.log("Finally");
    }

    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // // 실제 폼 데이터를 API 형식에 맞게 변환
    // const requestBody = JSON.stringify({
    //   shop: {
    //     imageUrl: shopData.shopImg || "",
    //     urlName: shopData.shopName || "",
    //     shopUrl: shopData.shopUrl || "",
    //   },
    //   products: [
    //     {
    //       price: Number(productData.productPrice) || 0,
    //       imageUrl: productData.productImg || "",
    //       name: productData.productName || "",
    //     },
    //   ],
    //   password: shopData.userPw || "",
    //   userId: shopData.userId,
    // });

    // console.log("requestBody:", requestBody);

    // try {
    //   const response = await fetch(`${BASE_URL}/linkshops`, {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: requestBody,
    //   });

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status} `);
    //   }

    //   const data = await response.json();
    //   console.log("생성 완료:", data);

    //   // 성공 시 모달 열기
    //   setIsModalOpen(true);

    //   // 폼 초기화 (선택사항)
    //   // setProductData({});
    //   // setShopData({});
    // } catch (error) {
    //   console.error("API 호출 에러:", error);
    //   alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    // } finally {
    //   setIsModalOpen(false);
    // }
    // ================================
    // API 테스트 코드 끝
    // ================================
  };

  // 모든 인풋 값이 채워졌는지 확인
  const isAllFilled = true;
  // Object.keys(productData).length >= 3 &&
  // Object.values(productData).every((val) => val !== "" && val !== null) &&
  // Object.keys(shopData).length >= 5 &&
  // Object.values(shopData).every((val) => val !== "" && val !== null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main className={styles.main}>
        {/* 이미지 업로드 테스트 코드 */}
        <img src="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1770037574264/dice-purple-1.svg" />
        <img src="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1770036833681/Group%2011.png" />
        {/* 이미지 업로드 테스트 코드 */}

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
            // onClick={() => setIsModalOpen(isAllFilled)}
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
