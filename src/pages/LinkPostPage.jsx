import { Header } from '../components/Header';
import { ProductItem } from '../components/ProductItem';
import styles from './LinkPostPage.module.css';
export function LinkPostPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>{<ProductItem />}</main>
    </>
  );
}
