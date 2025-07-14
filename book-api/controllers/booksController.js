const Book = require('../models/booksModel');
const { getAuthors } = require('../models/authorsModel');
const { getPublishers } = require('../models/publishersModel');
const { renderBookList } = require('../views/responseView');
const { v4: uuid } = require('uuid');

function handleGetBooks(socket) {
    try {
        const libros = Book.getBooks();
        const respuesta = renderBookList(libros);
        socket.write(respuesta);
    } catch (err) {
        socket.write(`Error al obtener libros: ${err.message}\n`);
    }
}

function handleAddBook(socket, datos) {
  try {
    const nuevoLibro = JSON.parse(datos);
    const autores = getAuthors();
    const editoriales = getPublishers();

    const autor = autores.find(a => a.name.toLowerCase() === nuevoLibro.authorName?.toLowerCase());
    const editorial = editoriales.find(e => e.name.toLowerCase() === nuevoLibro.publisherName?.toLowerCase());

    console.log('📌 Nombre autor recibido:', nuevoLibro.authorName);
    console.log('🧠 Autor encontrado:', autor ? autor.name : 'Ninguno');


    if (!autor || !editorial) {
      throw new Error('Autor o editorial no encontrados.');
    }

    const libro = {
      id: uuid(),
      title: nuevoLibro.title,
      authorId: autor.id,
      publisherId: editorial.id,
      year: parseInt(nuevoLibro.year)
    };

    if (!Book.isValidBook(libro)) {
      throw new Error('Faltan campos obligatorios o formato incorrecto.');
    }

    const libros = Book.getBooks();
    libros.push(libro);
    Book.saveBooks(libros);

    socket.write(`Libro agregado: ${libro.title} (${libro.year}) — Autor: ${autor.name}, Editorial: ${editorial.name}\n`);
  } catch (err) {
    socket.write(`Error al agregar libro: ${err.message}\n`);
  }
}


function handleSalir(socket) {
    socket.write('👋 Adios!\n');
    socket.end();
}

function handleUnknownCommand(socket) {
    socket.write('Comando no reconocido.\n');
}

module.exports = {
    handleGetBooks,
    handleAddBook,
    handleSalir,
    handleUnknownCommand
};
