const API_URL = 'http://localhost:5000/api/books';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const getBooks = async () => {
  const response = await fetch(API_URL, {
    headers: getAuthHeader()
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  
  return await response.json();
};

export const addBook = async (book) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify(book),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add book');
  }
  
  return await response.json();
};

export const deleteBook = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete book');
  }
  
  return await response.json();
};