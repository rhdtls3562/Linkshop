// App.jsx test
import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import ShopListPage from "./pages/ShopListPage";
import Header from "./components/Header";
import { LinkPostPage } from "./pages/LinkPostPage";
import SearchResultPage from "./pages/SearchResultPage";

function App() {
  return (
    <>
      <Header /> {/* 모든 페이지에 공통 Header */}
      <Routes>
        <Route path="/" element={<ShopListPage />} />
        <Route path="/linkpost" element={<LinkPostPage />} />
        <Route path="/search" element={<SearchResultPage />} />
      </Routes>
    </>
  );
}

export default App;
