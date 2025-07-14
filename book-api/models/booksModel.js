const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../data/books.json');

function getBooks() {
    try {
      const data = fs.readFileSync(booksPath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer libros: ', err.message);
        return [];
    }
}


function saveBooks(books) {
    try {
      fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
    } catch (err) {
      console.error('Error al guardar libro:', err.message);
    }
}
    

function isValidBook(book) {
    return (
        typeof book.title === 'string' &&
        typeof book.authorId === 'string' &&
        typeof book.publisherId === 'string' &&
        typeof book.year === 'number'
    );
}


module.exports = {
    getBooks,
    saveBooks,
    isValidBook
};