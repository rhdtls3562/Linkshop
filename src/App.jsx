// App.jsx
import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import ShopListPage from "./pages/ShopListPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header /> {/* 모든 페이지에 공통 Header */}
      <Routes>
        <Route path="/" element={<ShopListPage />} />
        <Route path="/create" />
      </Routes>
    </>
  );
}

export default App;
