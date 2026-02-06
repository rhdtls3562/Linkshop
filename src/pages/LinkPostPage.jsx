import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionCompleteModal } from "../components/ActionCompleteModal";
import { Button } from "../components/Button";
import { ProductUploader } from "../components/ProductUploader";
import { ShopManagement } from "../components/ShopManagement";
import { Toast } from "../components/Toast";
import styles from "./LinkPostPage.module.css";

const BASE_URL = "https://linkshop-api.vercel.app";

export function LinkPostPage() {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateCompleted, setIsCreateCompleted] = useState(false);
  const [productDataList, setProductDataList] = useState([
    {
      id: crypto.randomUUID().slice(0, 4),
      productName: "",
      productPrice: "",
      productImg: "",
    },
  ]);
  const [shopData, setShopData] = useState({});

  // 입력값 체크
  const isAllFilled = true;
  // productDataList.every(
  //   (product) =>
  //     product.productName && product.productPrice && product.productImg
  // ) &&
  // Object.keys(shopData).length >= 5 &&
  // Object.values(shopData).every((val) => val !== "" && val !== null);

  // 이미지 업로드
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

  // 최종 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true); // 모달 오버레이 오픈

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
      await response.json();
      setIsCreateCompleted(true); // 호출 성공 시 수정 완료 창 열기
    } catch (error) {
      console.error("handleSubmit 에러:", error);
      alert("등록 중 오류가 발생했습니다.");
      setIsModalOpen(false); // 모달 오버레이 닫기(수정 완료 창 제외)
    }
  };

  // 상품 인스턴스 추가 버튼 클릭 핸들러
  const handleAddProductUploader = () => {
    const newProduct = {
      id: self.crypto.randomUUID().slice(0, 4),
      productName: "",
      productPrice: "",
      productImg: "",
    };

    setProductDataList([...productDataList, newProduct]);
  };

  // 상품 데이터 업데이트 함수(자식에서 받은 데이터로 특정 객체 업데이트)
  const updateProduct = (id, updatedData) => {
    setProductDataList(
      productDataList.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product
      )
    );
  };

  // 상품 삭제 함수
  const removeProduct = (id) => {
    if (productDataList.length === 1) {
      alert("최소 1개의 상품이 필요합니다.");
      return;
    }
    setProductDataList(productDataList.filter((product) => product.id !== id));
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
          message="등록이 완료되었습니다."
        />
      </form>
    </main>
  );
}
