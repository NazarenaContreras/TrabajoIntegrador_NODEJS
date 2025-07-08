const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../data/books.json');

function getBooks() {
    try {
        const data = fs.readFileSync(booksPath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer libros: ', err.messaje);
        return[];
    }
}


function addBook(book) {
    try {
        const books = getBooks();
        books.push(book);
        fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
    } catch (err) {
        console.error('Error al guardar libro: ', error.messaje);
    }
}

function isValidBook(book) {
    const campos = ['title', 'authorId', 'publisherId', 'year'];
    return campos.every(c => book.hasOwnProperty(c));
}


module.exports = {
    getBooks,
    addBook,
    isValidBook
};