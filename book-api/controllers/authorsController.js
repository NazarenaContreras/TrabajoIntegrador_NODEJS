const Author = require('../models/authorsModel');
const { v4: uuid } = require('uuid');

function handleGetAuthors(socket) {
    try {
        const authors = Author.getAuthors();
        if (authors.length === 0) {
            socket.write('No hay autores disponibles.\n');
        } else {
            const lista = authors.map(a => `${a.name} (${a.nationality}) - ID: ${a.id}`).join('\n');
            socket.write(lista + '\n');
        }
    } catch (err) {
        socket.write(`Error al obtener autores: ${err.message}\n`);
    }
}

function handleAddAuthor(socket, datos) {
    try {
        const nuevoAutor = JSON.parse(datos);
        nuevoAutor.id = uuid();

        if (!Author.isValidAuthor(nuevoAutor)) {
            throw new Error('Faltan campos obligatorios o formato incorrecto');
        }

        const autores = Author.getAuthors();
        autores.push(nuevoAutor);
        Author.saveAuthors(autores);

        socket.write('Autor agregado exitosamente.\n');
    } catch (err) {
        socket.write(`Error al agregar autor: ${err.message}\n`);
    }
}

module.exports = {
    handleGetAuthors,
    handleAddAuthor
};