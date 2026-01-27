import { ProductItem } from '../components/ProductItem';
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
          <ProductItem />
        </div>
        <div className={styles.container}>
          <div className={styles.head}>
            <h2 className={styles.title}>내 쇼핑몰</h2>
          </div>
          <ProductItem />
        </div>
      </main>
    </>
  );
}
