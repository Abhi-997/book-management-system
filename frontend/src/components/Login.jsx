import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const success = await login(username, password);
    if (success) {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Welcome to Abhinaya's BookSite</h1>
        <p>Your personal library management system</p>
      </div>
      
      <div className="login-card">
        <h2>Login to Continue</h2>
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              id="username"
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-button">Sign In</button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <span>Contact admin</span></p>
        </div>
      </div>
    </div>
  );
}

export default Login;