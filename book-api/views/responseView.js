const { getAuthorById, getPublisherById } = require('../dataLoader');

function renderBookList(libros) {
    if (libros.length === 0) {
        return 'No hay libros disponibles. \n';
    }

    return libros.map(libro => {
        const autor = getAuthorById(libro.authorId);
        const editorial = getPublisherById(libro.publisherId);

        return `📚 ${libro.title} (ID: ${libro.id})
    👤 Autor: ${autor ? `${autor.name} (${autor.nationality})` : 'Desconocido'}
    🏢 Editorial: ${editorial ? `${editorial.name} (${editorial.country})` : 'Desconocida'}
    📅 Año: ${libro.year}`;
    }).join('\n\n') + '\n';
}

module.exports = {
    renderBookList
};