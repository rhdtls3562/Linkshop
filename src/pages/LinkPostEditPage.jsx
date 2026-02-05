import { useEffect } from "react";
import { useState } from "react";
import { ActionCompleteModal } from "../components/ActionCompleteModal";
import { Button } from "../components/Button";
import { ProductUploader } from "../components/ProductUploader";
import { ShopManagement } from "../components/ShopManagement";
import { Toast } from "../components/Toast";
import styles from "./LinkPostPage.module.css";

export function LinkPostEditPage() {
  // 모달 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateCompleted, setIsCreateCompleted] = useState(false);

  // 두 컴포넌트의 데이터를 각각 관리
  const [productDataList, setProductDataList] = useState([
    {
      id: self.crypto.randomUUID().slice(0, 4), // 초기 상품 1개
      productName: "",
      productPrice: "",
      productImg: "",
    },
  ]);
  const [shopData, setShopData] = useState({});

  // 상품 업로더 개수 관리
  const [uploaders, setUploaders] = useState([0]);

  // 모든 인풋에 값이 채워졌는지 확인
  const isAllFilled =
    Object.keys(productDataList).length >= 3 &&
    Object.values(productDataList).every((val) => val !== "" && val !== null) &&
    Object.keys(shopData).length >= 5 &&
    Object.values(shopData).every((val) => val !== "" && val !== null);

  // =============================
  // 이미지 업로드 함수
  // =============================
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
      console.log("📍handleImageUpload 함수 완료");
    }
  };

  // =============================
  // 최종 제출 함수
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 모달 오버레이 오픈
    setIsModalOpen(true);

    // try {
    //   // 1. Shop 이미지 업로드
    //   let shopImageUrl = shopData.imageUrl;
    //   if (shopData.shopImg instanceof File) {
    //     shopImageUrl = await handleImageUpload(shopData.shopImg);
    //   }

    //   // 2. Product 이미지 업로드
    //   const uploadedProducts = await Promise.all(
    //     productDataList.map(async (product) => {
    //       let productImageUrl = product.productImg;

    //       // 이미지 파일 업로드
    //       if (product.productImg instanceof File) {
    //         productImageUrl = await handleImageUpload(product.productImg);
    //       }

    //       return {
    //         price: Number(productDataList.productPrice) || 0,
    //         imageUrl: productImageUrl?.trim() || "",
    //         name: productDataList.productName?.trim() || "",
    //       };
    //     })
    //   );

    //   const BASE_URL = "https://linkshop-api.vercel.app/22-3";
    //   const SHOP_ID = 1072;
    //   const myHeaders = new Headers();
    //   myHeaders.append("Content-Type", "application/json");

    //   // 3. 폼 데이터를 body 형식에 맞게 변환
    //   const requestBody = JSON.stringify({
    //     shop: {
    //       imageUrl: shopImageUrl || "",
    //       urlName: shopData.shopName?.trim() || "",
    //       shopUrl: shopData.shopUrl?.trim() || "",
    //     },
    //     products: uploadedProducts,
    //     password: shopData.userPw || "",
    //     userId: shopData.userId,
    //     name: shopData.shopName?.trim(),
    //   });

    //   // 4. API 호출
    //   const response = await fetch(`${BASE_URL}/linkshops/${SHOP_ID}`, {
    //     method: "PUT",
    //     headers: myHeaders,
    //     body: requestBody,
    //   });

    //   if (!response.ok) {
    //     throw new Error(
    //       `HTTP error! status: ${response.status} ${response.message} `
    //     );
    //   }

    //   const result = await response.json();
    //   console.log("✅ 최종 제출 완료:", result);

    //   // 호출 성공 시 수정 완료 창 열기
    //   setIsCreateCompleted(true);
    // } catch (error) {
    //   console.error("handleSubmit API 호출 에러:", error);
    //   alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");

    //   // 모달 오버레이 닫기(수정 완료 창 제외)
    //   setIsModalOpen(false);
    // } finally {
    //   console.log("📍 handleSubmit 함수 완료");
    // }
  };

  // =============================
  // 샵 데이터 가져오는 함수
  // =============================
  const getShopData = async (e) => {
    try {
      const BASE_URL = "https://linkshop-api.vercel.app/22-3";
      const SHOP_ID = 1072;
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // API 호출
      const response = await fetch(`${BASE_URL}/linkshops/${SHOP_ID}`, {
        method: "GET",
        headers: myHeaders,
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.message} `
        );
      }

      const result = await response.json();
      console.log("✅ 샵 데이터 호출 완료 :", result);

      setShopData(result);
      setProductDataList(result?.products);
    } catch (error) {
      console.error("getShopData API 호출 에러:", error);
      alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");

      // 모달 오버레이 닫기(수정 완료 창 제외)
      setIsModalOpen(false);
    } finally {
      console.log("📍 getShopData 함수 완료");
    }
  };

  // =============================
  // 상품 인스턴스 추가 버튼 클릭 핸들러
  // =============================
  const handleAddProductUploader = (e) => {
    const newProduct = {
      id: self.crypto.randomUUID().slice(0, 4),
      productName: "",
      productPrice: "",
      productImg: "",
    };
    setProductDataList([...productDataList, newProduct]); // 기존 상품 리스트에 새 상품 추가
    setUploaders([...uploaders, uploaders.length]); // 상품 업로더 추가
  };

  // =============================
  // 상품 데이터 업데이트 함수(자식에서 받은 데이터로 특정 객체 업데이트)
  // =============================
  const updateProduct = (id, updatedData) => {
    setProductDataList(
      productDataList.map((product) =>
        product.id === id
          ? { ...product, ...updatedData } // 기존 데이터에 새 데이터 병합
          : product
      )
    );
  };

  // =============================
  // 상품 삭제 함수(작업중)
  // =============================
  const removeProduct = (id) => {
    if (productDataList.length === 1) {
      alert("최소 1개의 상품이 필요합니다.");
      return;
    }
    setProductDataList(productDataList.filter((product) => product.id !== id));
  };

  useEffect(() => {
    getShopData();
  }, []);

  return (
    <>
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
            {/* 각 상품 렌더링 */}
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
            {/* 샵 렌더링 */}
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
            수정하기
          </Button>
          <Toast isOpen={isCreateCompleted} message="수정 완료!" />
          <ActionCompleteModal
            onClose={() => setIsModalOpen(false)}
            isOpen={isModalOpen} // 수정하기 버튼 클릭 시 오픈
            isCreateCompleted={isCreateCompleted} // api 호출 완료 시 수정 완료 창 오픈
            message="수정이 완료되었습니다."
          />
        </form>
      </main>
    </>
  );
}
