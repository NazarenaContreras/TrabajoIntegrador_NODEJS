const Publisher = require('../models/publishersModel');
const { v4: uuid } = require('uuid');

function handleGetPublishers(socket) {
    try {
        const publishers = Publisher.getPublishers();
        if (publishers.length === 0) {
            socket.write('No hay editoriales disponibles.\n');
        } else {
            const lista = publishers.map(p => `${p.name} (${p.country}) - ID: ${p.id}`).join('\n');
            socket.write(lista + '\n');
        }
    } catch (err) {
        socket.write(`Error al obtener editoriales: ${err.message}\n`);
    }
}

function handleGetPublisherById(socket, id) {
    try {
        const publisher = Publisher.getPublisherById(Number(id));
        if (publisher) {
            socket.write(`${publisher.name} (${publisher.country}) - ID: ${publisher.id}\n`);
        } else {
            socket.write('Editorial no encontrada.\n');
        }
    } catch (err) {
        socket.write(`Error al buscar editorial: ${err.message}\n`);
    }
}

function handleAddPublisher(socket, datos) {
    try {
        const nuevaEditorial = JSON.parse(datos);
        nuevaEditorial.id = uuid();

        if (!Publisher.isValidPublisher(nuevaEditorial)) {
            throw new Error('Faltan campos obligatorios o formato incorrecto');
        }

        const editoriales = Publisher.getPublishers();
        editoriales.push(nuevaEditorial);
        Publisher.savePublishers(editoriales);

        socket.write('✅ Editorial agregada exitosamente.\n');
    } catch (err) {
        socket.write(`❌ Error al agregar editorial: ${err.message}\n`);
    }
}

module.exports = {
    handleGetPublishers,
    handleGetPublisherById,
    handleAddPublisher
};
