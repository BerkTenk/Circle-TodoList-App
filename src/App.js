import React from 'react';
import './App.css';
import Todolist from './Components/Todolist';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeStore from './Components/ThemeStore';
import WalletPage from './Components/WalletPage';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Todolist />} />
      <Route path="/wallet-page" element={<WalletPage />} />
      <Route path="/theme-store" element={<ThemeStore />} />
    </Routes>
  </Router>
  );
}

export default App;
