import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function AddBook({ onAddBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !author || !year) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      await onAddBook({ title, author, year });
      setTitle('');
      setAuthor('');
      setYear('');
      setError('');
    } catch (error) {
      setError('Failed to add book. Please try again.');
    }
  };

  return (
    <div className="add-book">
      <h2>Add New Book</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Year:</label>
          <input 
            type="number" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="login-button">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;