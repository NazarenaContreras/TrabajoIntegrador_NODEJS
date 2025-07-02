const fs = require('fs');
const path = require('path')

const publishersPath = path.join(__dirname, '../data/publisher.json');

// para leer todas las editoriales
function getPublishers() {
    try {
        const data = fs.readFileSync(publishersPath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer editoriales: ', err.message);
        return[];
    }
}

// para guardar editoriales
function savePublishers(publishers) {
    try {
        fs.writeFileSync(publishersPath, JSON.stringify(publishers, null, 2));
    } catch (err) {
        console.error('Error al guardar editorial: ', err.message);
    }
}

// para buscar editorial por ID
function getPublisherById(id) {
    const publishers = getPublishers();
    return publishers.find(pub => pub.id === id);
}

// para validar estructura de editorial
function isValidPublisher(publisher) {
    const campos = ['id', 'name', 'conutry'];
    return campos.every(c => publisher.hasOwnProperty(c));
}

module.exports = {
    getPublishers,
    savePublishers,
    getPublisherById,
    isValidPublisher
};