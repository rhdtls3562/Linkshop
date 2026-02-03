// App.jsx
import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import ShopListPage from "./pages/ShopListPage";
import Header from "./components/Header";
import { LinkPostPage } from "./pages/LinkPostPage";
import SearchResultPage from "./pages/SearchResultPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/list" element={<ShopListPage />} />
        <Route path="/linkpost" element={<LinkPostPage />} />
        <Route path="/search" element={<SearchResultPage />} />
      </Routes>
    </>
  );
}

export default App;
