// App.jsx
import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import ShopListPage from "./pages/ShopListPage";
import Deco from "./components/Deco";
import Back from "./components/Back";
function App() {
  return (
    <>
      <Deco /> 
      <Back onClick={() => window.history.back()} />
      <Routes>
        <Route path="/" element={<ShopListPage />} />
        <Route path="/create" />
      </Routes>
    </>
  );
}

export default App;
