import React, { useState } from 'react';
import glizzyLogo from '../assets/glizzy-logo.svg';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded credentials
  const VALID_USERNAME = 'rajitha';
  const VALID_PASSWORD = 'rajitha123';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a brief loading state
    setTimeout(() => {
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        onLogin();
      } else {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="login-root">
      {/* Header */}
      <header className="login-header">
        <img src={glizzyLogo} alt="Glizzy" className="login-header-logo" />
        <p className="login-tagline">Precision Invoice Management</p>
      </header>

      {/* Main Content */}
      <main className="login-main">
        <div className="login-card">
          <h2 className="login-title">Welcome back</h2>
          <p className="login-subtitle">Enter your credentials to access your account</p>

          {error && (
            <div className="login-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {/* Username Field */}
            <div className="login-field">
              <label className="login-label">Username</label>
              <input
                id="login-username"
                type="text"
                placeholder="Enter your username"
                className="login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            {/* Password Field */}
            <div className="login-field">
              <div className="login-label-row">
                <label className="login-label">Password</label>
              </div>
              <div className="login-input-wrapper">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="login-input login-input-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="login-eye-btn"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className={`login-submit ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="login-spinner"></span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="login-footer">
        <span className="login-footer-logo">GLIZZY</span>
        <span>© 2024 Glizzy Invoice Systems. All rights reserved.</span>
        <div className="login-footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Help Center</a>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
