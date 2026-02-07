import { useMemo } from "react";
import { useEffect, useState, useRef } from "react";
import { Navigate, useParams, useLocation } from "react-router-dom";
import { ActionCompleteModal } from "../components/ActionCompleteModal";
import { Button } from "../components/Button";
import { ProductUploader } from "../components/ProductUploader";
import { ShopManagement } from "../components/ShopManagement";
import { Toast } from "../components/Toast";
import { useImageUpload } from "../hooks/useImageUpload";
import { useProducts } from "../hooks/useProducts";
import styles from "./LinkPostPage.module.css";

const BASE_URL = "https://linkshop-api.vercel.app";
const PASSWORD = "test123";

export function LinkPostEditPage() {
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

  const {
    productDataList,
    setProductDataList,
    addProduct,
    updateProduct,
    removeProduct,
  } = useProducts([]);
  const { uploadImage } = useImageUpload();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isCreateCompleted, setIsCreateCompleted] = useState(false);
  const [originalShopData, setOriginalShopData] = useState({}); // 기존 샵 데이터
  const [shopData, setShopData] = useState({}); // '수정하기' 버튼 클릭 시 수집된 데이터

  // 입력값 체크
  const isAllFilled = useMemo(() => {
    const hasAllProducts = productDataList.every(
      (product) => product.name && product.price && product.imageUrl
    );

    const hasShopData =
      Object.keys(originalShopData).length >= 5 &&
      Object.values(originalShopData).every(
        (val) => val !== "" && val !== null
      );

    return hasAllProducts && hasShopData;
  }, [productDataList, originalShopData]);
  // 샵 데이터 변경사항 추출
  const getChangedShopFields = async (original, current) => {
    const fieldMapping = {
      shopName: original?.shop?.urlName,
      shopUrl: original?.shop?.shopUrl,
      userId: original?.userId,
    };

    const changes = {};

    Object.entries(fieldMapping).forEach(([field, originalValue]) => {
      if (field in current) {
        if (originalValue !== current[field]) {
          changes[field] = current[field];
        }
      } else {
        changes[field] = originalValue;
      }
    });

    // 이미지 필드 따로 처리
    const currentImage = current.shopImageUrl || current.shopImg;
    const originalImage = original?.shop?.imageUrl;

    if (currentImage instanceof File) {
      let shopImageUrl = await uploadImage(currentImage);
      changes.shopImg = shopImageUrl;

      if (changes.shopImg === originalImage) {
        changes.shopImg = originalImage;
      }
    } else if (!currentImage) {
      changes.shopImg = originalImage;
    } else {
      // 변경 없음
      console.log("⚪ 이미지 변경 없음");
      changes.shopImg = originalImage;
    }
    return changes;
  };

  // 상품 데이터 변경사항 추출
  const getChangedProductsFields = (originalArray, currentArray) => {
    return currentArray.map((current) => {
      const original = originalArray.find((o) => o.id === current.id) || {};

      return {
        id: current.id,
        name: current.name || original.name,
        price: current.price || original.price,
        imageUrl: current.imageUrl || original.imageUrl,
      };
    });
  };

  // 최종 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true); // 모달 오버레이 오픈

    try {
      // 샵 데이터 비교 후 최종 데이터 추출
      const finalShopData = await getChangedShopFields(
        originalShopData,
        shopData
      );

      // 상품 데이터 비교 후 최종 데이터 추출
      const changedProductsFields = getChangedProductsFields(
        originalShopData.products,
        productDataList
      );

      // Product 이미지
      const uploadedProducts = await Promise.all(
        changedProductsFields.map(async (product) => {
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
        currentPassword: PASSWORD,
        shop: {
          imageUrl: finalShopData.shopImg || "",
          urlName: finalShopData.shopName?.trim(),
          shopUrl: finalShopData.shopUrl?.trim() || "",
        },
        products: uploadedProducts,
        userId: finalShopData.userId,
        name: finalShopData.shopName?.trim(),
      });

      console.log("📌 requestBody : ", JSON.parse(requestBody));

      // API 호출
      const response = await fetch(`${BASE_URL}/22-3/linkshops/${id}`, {
        method: "PUT",
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

  // 샵 데이터 호출
  const getShopData = async (e) => {
    try {
      // API 호출
      const response = await fetch(`${BASE_URL}/22-3/linkshops/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ 샵 데이터 호출 완료 :", result);

      setOriginalShopData(result); // 샵 데이터 저장
      setProductDataList(result?.products); // 상품 데이터 저장
      setIsModalOpen(false); // 모달 오버레이 닫기(수정 완료 창 제외)
    } catch (error) {
      console.error("getShopData API 호출 에러:", error);
      alert("샵 데이터를 불러올 수 없습니다.");
      setIsModalOpen(false); // 모달 오버레이 닫기(수정 완료 창 제외)
    }
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
              <button type="button" className={styles.btn} onClick={addProduct}>
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
            <ShopManagement
              shopData={originalShopData}
              onUpdate={setShopData}
            />
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
