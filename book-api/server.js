const net = require("net");
const booksController = require("./controllers/booksController");
const authorsController = require("./controllers/authorsController");
const publishersController = require("./controllers/publishersController");

const server = net.createServer((socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("data", (data) => {
    const mensaje = data.toString().trim();
    console.log("Comando recibido: ", mensaje);

    if (mensaje === "GET BOOKS") {
      booksController.handleGetBooks(socket);
    } else if (mensaje.startsWith("ADD BOOK")) {
      const datos = mensaje.slice(9);
      booksController.handleAddBook(socket, datos);
    } else if (mensaje === "GET AUTHORS") {
      authorsController.handleGetAuthors(socket);
    } else if (mensaje.startsWith("GET AUTHOR")) {
      const id = mensaje.slice(11).trim();
      authorsController.handleGetAuthorById(socket, id);
    } else if (mensaje.startsWith("ADD AUTHOR")) {
      const datos = mensaje.slice(10).trim();
      authorsController.handleAddAuthor(socket, datos);
    } else if (mensaje === "GET PUBLISHERS") {
      publishersController.handleGetPublishers(socket);
    } else if (mensaje.startsWith("GET PUBLISHER")) {
      const id = mensaje.slice(13).trim();
      publishersController.handleGetPublisherById(socket, id);
    } else if (mensaje === "SALIR") {
      booksController.handleSalir(socket);
    } else {
      booksController.handleUnknownCommand(socket);
    }
  });
  socket.on("end", () => {
    console.log("Cliente desconectado.");
  });

  socket.on("error", (err) => {
    console.error("Error de conexion: ", err.message);
  });
});

server.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
