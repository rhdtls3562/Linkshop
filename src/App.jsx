// App.jsx
import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import ShopListPage from "./pages/ShopListPage";
import LinkProfilePage from "./pages/LinkProfilePage";
import { LinkPostPage } from "./pages/LinkPostPage";
import SearchResultPage from "./pages/SearchResultPage";
import { LinkPostEditPage } from "./pages/LinkPostEditPage";
import Layout from "./pages/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ShopListPage />} />
        <Route path="/list" element={<ShopListPage />} />
        <Route path="/search" element={<SearchResultPage />} />

        {/* 생성 페이지(기존 유지) */}
        <Route path="/linkpost" element={<LinkPostPage />} />

        {/* 비번 맞으면 들어갈 "수정 페이지" 경로(레이아웃 안에 두고 싶으면 여기) */}
        <Route path="/post/:id/edit" element={<LinkPostEditPage />} />
      </Route>

      {/* 프로필(기존 유지) */}
      <Route path="/shop/:shopId" element={<LinkProfilePage />} />
      <Route path="/profile/:id" element={<LinkProfilePage />} />

      {/* 기존 유지 */}
      <Route path="/post/:id" element={<LinkPostPage />} />
    </Routes>
  );
}

export default App;
