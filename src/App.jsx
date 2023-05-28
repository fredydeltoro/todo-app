import { Route, Routes } from 'react-router-dom';
import './App.css'
import List from './List/List';

function App() {

  return (
    <Routes>
      <Route path='/'  element={<List />} />
    </Routes>
  )
}

export default App
