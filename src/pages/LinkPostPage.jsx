import { useState } from "react";
import { ActionCompleteModal } from "../components/ActionCompleteModal";
import { Button } from "../components/Button";
import { ProductUploader } from "../components/ProductUploader";
import { ShopManagement } from "../components/ShopManagement";
import { Toast } from "../components/Toast";
import styles from "./LinkPostPage.module.css";
export function LinkPostPage() {
  // 모달용 임시 스테이트
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAllFilled = false;

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.head}>
            <h2 className={styles.title}>대표 상품</h2>
            <button type="button" className={styles.btn}>
              추가
            </button>
          </div>
          <ProductUploader />
        </div>
        <div className={styles.container}>
          <div className={styles.head}>
            <h2 className={styles.title}>내 쇼핑몰</h2>
          </div>
          <ShopManagement />
        </div>
        <Button
          type="button"
          className={
            isAllFilled
              ? `${styles.createbtn} ${styles.active}`
              : styles.createbtn
          }
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
      </main>
    </>
  );
}
