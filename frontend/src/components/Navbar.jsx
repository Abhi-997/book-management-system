import React from 'react';
import { useAuth } from '../context/AuthContext';

function Navbar({ setView, isAdmin, isAuthor }) {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">Book Manager</div>
      <div className="navbar-links">
        <button onClick={() => setView('books')}>Books</button>
        
        {!user && (
          <button onClick={() => setView('login')}>Login</button>
        )}
        
        {(isAdmin || isAuthor) && (
          <button onClick={() => setView('add')}>Add Book</button>
        )}
        
        {user && (
          <button onClick={logout}>Logout ({user.username})</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;