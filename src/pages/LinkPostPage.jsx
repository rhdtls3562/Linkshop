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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제출할 데이터:", {
      product: productData,
      shop: shopData,
    });
    // API 호출
  };

  // 모든 인풋 값이 채워졌는지 확인
  const isAllFilled =
    Object.keys(productData).length > 0 &&
    Object.values(productData).every((val) => val !== "" && val !== null) &&
    Object.keys(shopData).length > 0 &&
    Object.values(shopData).every((val) => val !== "" && val !== null);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
            onClick={() => setIsModalOpen(isAllFilled)}
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
