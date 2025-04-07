import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import Login from './components/Login';
import AddBook from './components/AddBook';
import { AuthProvider, useAuth } from './context/AuthContext'; // Added useAuth import
import { getBooks, addBook, deleteBook } from './api/books'; // Added addBook import
import './style.css';

// Main App component with AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <AppContentWrapper />
    </AuthProvider>
  );
}

// Inner component that uses useAuth
function AppContentWrapper() {
  const [books, setBooks] = useState([]);
  const [view, setView] = useState('books');
  const { user, logout } = useAuth(); // Now properly used inside AuthProvider

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    
    fetchBooks();
  }, []);

  const handleAddBook = async (book) => {
    try {
      const newBook = await addBook(book);
      setBooks([...books, newBook]);
      setView('books');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="app">
      <Navbar 
        user={user} 
        onLogout={logout} 
        setView={setView}
        isAdmin={user?.role === 'admin'}
        isAuthor={user?.role === 'author'}
      />
      
      <div className="content">
        {view === 'books' && (
          <BookList 
            books={books} 
            onDelete={handleDeleteBook} 
            canDelete={user?.role === 'admin'} 
          />
        )}
        
        {view === 'login' && !user && (
          <Login onLogin={() => setView('books')} />
        )}
        
        {view === 'add' && (user?.role === 'admin' || user?.role === 'author') && (
          <AddBook onAddBook={handleAddBook} />
        )}
      </div>
    </div>
  );
}