<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
import './styles/global.css';
import { Layout } from './components/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
      </Routes>
    </>
  );
=======
import React from "react";
import ShopListPage from "./pages/ShopListPage";

function App() {
  return <ShopListPage />;
>>>>>>> 0ea41ce578f6ac0eaa1d90b5434bebe16f151e70
}

export default App;
