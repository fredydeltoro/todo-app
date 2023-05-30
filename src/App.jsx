import { Route, Routes } from 'react-router-dom';
import './App.css';
import List from './features/List/List';
import Login from './features/Login';

function App() {
  return (
    <div data-bs-theme="dark">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<List />} />
      </Routes>
    </div>
  );
}

export default App;
