const { getAuthorById, getPublisherById } = require('../book-api/dataLoader');

function renderBookList(libros) {
    if (libros.lenght === 0) {
        return 'No hay libros disponibles. \n';
    }

    return libros.map(libro => {
        const autor = getAuthorById(libro.autorId);
        const editorial = getPublisherById(libro.publisherId);

        return `${libro.title} (ID: ${libro.id})
    Autor: ${autor ? autor.name + ' (' + autor.nationality + ')' : 'Desconectado'}
    Editorial: ${editorial ? editorial.name + ' (' + editorial.country + ')' : 'Desconocida'}
    Anio: ${libro.year}`;
    }).join('\n\n') + '\n';
}