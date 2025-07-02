const Book = require('../models/booksModel');
const { v4: uuid } = require('uuid');

function handleGetBooks(socket) {
    const libros = Book.getBooks();
    socket.write(JSON.stringify(libros, null, 2) + '\n');
}

function handleAddBook(socket, datos) {
    try {
        const nuevoLibro = JSON.parse(datos);
        nuevoLibro.id = uuid();

        if (!Book.isValidBook(nuevoLibro)) {
            throw new Error('Faltan campos obligatorios o formato incorrecto');
        }

        const libros = Book.getBoooks();
        libros.push(nuevoLibro);
        Book.saveBooks(libros);

        socket.write('Libro agregado exitosamente. \n');
    } catch (err) {
        socket.write(`Error al agregar libro: ${err.message}\n`);
    }
}

function handleSalir(socket) {
    socket.write('Adios!\n');
    socket.end();
}

function handleUnknownCommand(socket) {
    socket.write('Comando no reconocido. \n');
}

module.exports = {
    handleGetBooks,
    handleAddBook,
    handleSalir,
    handleUnknownCommand
};