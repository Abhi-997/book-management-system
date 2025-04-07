const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('createdBy', 'username');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const book = new Book({ title, author, year, createdBy: req.user.userId });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Only admin or the user who created the book can delete it
    if (req.user.role !== 'admin' && book.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await book.remove();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllBooks, addBook, deleteBook };