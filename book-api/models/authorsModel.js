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

// para validar estructura de autor
function isValidAuthor(author) {
    return (
        typeof author.name === 'string' &&
        typeof author.nationality === 'string'
    );
}

module.exports = {
    getAuthors,
    saveAuthors,
    isValidAuthor
};
