// App.jsx
import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import ShopListPage from "./pages/ShopListPage";
import Deco from "./components/Deco";
function App() {
  return (
    <>
      <Deco /> 
      <Routes>
        <Route path="/" element={<ShopListPage />} />
        <Route path="/create" />
      </Routes>
    </>
  );
}

export default App;
