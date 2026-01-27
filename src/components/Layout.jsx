import { Header } from './Header';
import { ProductItem } from './ProductItem';
import styles from './Layout.module.css';
export function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>{<ProductItem />}</main>
    </>
  );
}
