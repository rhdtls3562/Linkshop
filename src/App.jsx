// App.jsx
import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import ShopListPage from "./pages/ShopListPage";
import Deco from "./components/Deco";
import Back from "./components/Back";
import Header from "./components/Header";
import { LinkPostPage } from "./pages/LinkPostPage";
import SearchResultPage from "./pages/SearchResultPage";

function App() {
  return (
    <>
      <Deco /> 
      <Back onClick={() => window.history.back()} />
      <Routes>
        <Route path="/" element={<ShopListPage />} />
        <Route path="/linkpost" element={<LinkPostPage />} />
        <Route path="/search" element={<SearchResultPage />} />
      </Routes>
    </>
  );
}

export default App ;
