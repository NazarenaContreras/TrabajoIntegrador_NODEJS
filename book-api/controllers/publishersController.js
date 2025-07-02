const fs = require('fs');
const path = require('path');
const publishersPath = path.join(__dirname, '../data/publisher.json');

function getPublishers() {
    return JSON.parse(fs.readFileSync(publishersPath, 'utf-8'));
}

function getPublisherById(id) {
    const publishers = getPublishers();
    return publishers.find(pub => pub.id === id);
}

function handleGetPublishers(socket) {
    const publishers = getPublishers();
    if (publishers.length === 0) {
        socket.write('No hay editoriales disponibles.\n');
    } else {
        const lista = publishers.map(p => `${p.name} (${p.country}) - ID: ${p.id}`).join('\n');
        socket.write(lista + '\n');
    }
}

function handleGetPublisherById(socket, id) {
    const publisher = getPublisherById(Number(id));
    if (publisher) {
        socket.write(`${publisher.name} (${publisher.country}) - ID: ${publisher.id}\n`);
    } else {
        socket.write(' Editorial no encontrada.\n');
    }
}

module.exports = {
    handleGetPublishers,
    handleGetPublisherById
};