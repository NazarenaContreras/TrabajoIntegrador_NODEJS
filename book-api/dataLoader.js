const fs = require('fs');
const path = require('path');

function loadJSON(fileName) {
    const filePath = path.join(__dirname, '../data', fileName);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function getAuthorById(id) {
    const authors = loadJSON('authors.json');
    return authors.find(author => author.id === id);
}

function getPublisherById(id) {
    const publishers = loanJSON ('publisher.json');
    return publishers.find(pub => pub.id === id)
}

module.exports = {
    getAuthorById,
    getPublisherById
};