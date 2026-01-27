import { Routes, Route } from 'react-router-dom';
import './styles/global.css';
import { LinkPostPage } from './pages/LinkPostPage';

function App() {
  return (
    <>
      <Routes>
        {/* Path 변경 필요 -> /listpost */}
        <Route path="/" element={<LinkPostPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
