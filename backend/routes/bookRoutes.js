const express = require('express');
const { checkRole } = require('../middlewares/auth');
const { getAllBooks, addBook, deleteBook } = require('../controllers/bookController');

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', checkRole(['admin', 'author']), addBook);
router.delete('/:id', checkRole(['admin']), deleteBook);

module.exports = router;