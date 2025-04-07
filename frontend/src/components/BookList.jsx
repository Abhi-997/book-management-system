import React from 'react';

function BookList({ books, onDelete, canDelete }) {
  return (
    <div className="book-list-container">
      <h2 className="book-list-title">Our Book Collection</h2>
      <p className="book-list-subtitle">Browse through our wonderful selection of books</p>
      
      {books.length === 0 ? (
        <div className="empty-state">
          <p>No books available yet. Check back later!</p>
        </div>
      ) : (
        <div className="book-grid">
          {books.map(book => (
            <div key={book._id} className="book-card">
              <div className="book-card-content">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">By {book.author}</p>
                <p className="book-year">Published: {book.year}</p>
                {book.createdBy && (
                  <p className="book-added-by">Added by: {book.createdBy.username}</p>
                )}
              </div>
              {canDelete && (
                <button 
                  className="delete-button"
                  onClick={() => onDelete(book._id)}
                  aria-label={`Delete ${book.title}`}
                >
                  <span className="trash-icon">🗑️</span> Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;