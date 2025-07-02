const fs = require('fs');
const path = require('path');

const authorsPath = path.join(__dirname, '../data/authors.json');

// para leer todos los autores
function getAuthors() {
    try {
        const data = fs.readFileSync(authorsPath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer autores: ', err.message);
        return[];
    }
}

// para guardar autores
function saveAuthors(authors) {
    try {
        fs.writeFileSync(authorsPath, JSON.stringify(authors, null, 2));
    } catch (err) {
        console.error('Error al guardar autores: ', err.message);
    }
}

// para buscar autor por id
function getAuthorById(id) {
    const authors = getAuthors();
    return authors.find(author => author.id === id);
}

// para validar estructura de autor
function isValidAuthor(author) {
    const campos = ['id', 'name', 'nationality'];
    return campos.every(c => author.hasOwnProperty(c));
}
module.exports = {
    getAuthors,
    saveAuthors,
    getAuthorById,
    isValidAuthor
};