// App.jsx test
import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import ShopListPage from "./pages/ShopListPage";
import { LinkPostPage } from "./pages/LinkPostPage";
import SearchResultPage from "./pages/SearchResultPage";
import LinkProfilePage from "./pages/LinkProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ShopListPage />} />
        <Route path="/linkpost" element={<LinkPostPage />} />
        <Route path="/profile" element={<LinkProfilePage />} />
        <Route path="/search" element={<SearchResultPage />} />
      </Routes>
    </>
  );
}

export default App ;
