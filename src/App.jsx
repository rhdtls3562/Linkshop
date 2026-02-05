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
        <Route path="/linkpost" element={<LinkPostPage />} />
      </Route>
      <Route path="/shop/:shopId" element={<LinkProfilePage />} />

      <Route path="/profile/:id" element={<LinkProfilePage />} />
      <Route path="/post/:id" element={<LinkPostPage />} />
      <Route path="/post/:id/edit" element={<LinkPostEditPage />} />
    </Routes>
  );
}

export default App;
