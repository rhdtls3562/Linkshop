import { Routes, Route, useLocation } from "react-router-dom";
import "./styles/global.css";
import ShopListPage from "./pages/ShopListPage";
import LinkProfilePage from "./pages/LinkProfilePage";
import Header from "./components/Header";
import { LinkPostPage } from "./pages/LinkPostPage";
import SearchResultPage from "./pages/SearchResultPage";
import { LinkPostEditPage } from "./pages/LinkPostEditPage";

function App() {
  const location = useLocation();

  // 🔹 /shop/:shopId 에서는 Header 숨김
  const hideHeader = location.pathname.startsWith("/shop/");

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/list" element={<ShopListPage />} />
        <Route path="/linkpost" element={<LinkPostPage />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/shop/:shopId" element={<LinkProfilePage />} />
        <Route path="/link/:shopId/edit" element={<LinkPostEditPage />} />
      </Routes>
    </>
  );
}

export default App;
