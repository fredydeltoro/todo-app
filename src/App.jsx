import { Route, Routes } from 'react-router-dom';
import './App.css';
import List from './features/List/List';
import Login from './features/Login/Login';
import Todos from './features/Todos/Todos';
import Signup from './features/Signup/Signup';

function App() {
  return (
    <div data-bs-theme="dark">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<List />} />
        <Route path="/:listId" element={<Todos />} />
      </Routes>
    </div>
  );
}

export default App;
