const fs = require('fs');
const path = require('path');


function loadJSON(fileName) {
    try {
        const filePath = path.join(__dirname, 'data', fileName);
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (err) {
        console.error(`Error al cargar ${fileName}:`, err.message);
        return [];
    } 
}

function getAuthorById(id) {
    if (!id) return null;
    const authors = loadJSON('authors.json');
    return authors.find(author => author.id === id);
}

function getPublisherById(id) {
    if (!id) return null;
    const publishers = loadJSON ('publishers.json');
    return publishers.find(pub => pub.id === id);
}

module.exports = {
    getAuthorById,
    getPublisherById
};
