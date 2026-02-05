// pages/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={styles.layoutWrapper}>
      <Header />
      <div className={styles.layoutContent}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
