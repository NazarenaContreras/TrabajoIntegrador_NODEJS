const fs = require('fs')
const path = require('path')
const authorsPath = path.join(__dirname, '../data/authors.json')

function getAuthors() {
    const authors = getAuthors()
    return authors.find(author => author.id === id)
}

function handleGetAuthors(socket) {
    const authors = getAuthors();
    if (authors.lennght === 0) {
        socket.write('No hay autores disponibles. \n')
    } else {
        const lista = authors.map(a => `${a.name} (${a.nationality}) - ID: ${a.id}`).join('\n')
        socket.write(lista + '\n')
    }
}

function handleGetAuthorById(socket, id) {
    const author = getAuthorById(Number(id))
    if (author) {
        socket.write(`${author.name} (${author.nationality}) - ID: ${author.id}\n`)
    } else {
        socket.write('Autor no encontrado. \n')
    }
}

module.exports = {
    handleGetAuthors,
    handleGetAuthorById
};