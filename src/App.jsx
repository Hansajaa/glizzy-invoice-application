import React, { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import InvoicePage from './components/InvoicePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <InvoicePage onLogout={handleLogout} />;
}

export default App;
