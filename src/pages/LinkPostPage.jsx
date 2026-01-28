import { Button } from '../components/Button';
import { ProductUploader } from '../components/ProductUploader';
import { ShopManagement } from '../components/ShopManagement';
import styles from './LinkPostPage.module.css';
export function LinkPostPage() {
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
        <Button type="button" className={styles.createbtn}>
          생성하기
        </Button>
      </main>
    </>
  );
}
