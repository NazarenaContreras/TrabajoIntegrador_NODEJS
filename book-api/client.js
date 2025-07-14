const net = require('net');
const readline = require('readline');
const { getAuthors } = require('./models/authorsModel');
const { getPublishers } = require('./models/publishersModel');

const client = new net.Socket();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.connect(8080, 'localhost', () => {
  console.log('Conectado al servidor TCP\n');
  pedirComando();
});

client.on('data', (data) => {
  console.log('Respuesta del servidor: \n', data.toString());
  pedirComando();
});

client.on('close', () => {
  console.log('Conexion cerrada.');
  rl.close();
});

function pedirComando() {
  rl.question('\n>> Ingresa un comando, por ejemplo: (GET BOOKS, ADD BOOK, GET AUTHORS, ADD AUTHOR, SALIR): ', (comando) => {
    switch (comando.toUpperCase()) {
      case 'GET BOOKS':
      case 'GET AUTHORS':
      case 'GET PUBLISHERS':
        client.write(comando.toUpperCase());
        break;

      case 'ADD BOOK':
        agregarLibroInteractivo();
        break;

      case 'ADD AUTHOR':
        agregarAutorInteractivo();
        break;

      case 'ADD PUBLISHER':
        agregarEditorialInteractiva();
        break;

      case 'SALIR':
        client.write('SALIR');
        break;

      default:
        console.log('Comando no reconocido.');
        pedirComando();
    }
  });
}

function agregarLibroInteractivo() {
  console.log('\nAgregar nuevo libro');

  const autores = getAuthors();
  console.log('\nAutores disponibles:');
  autores.forEach(a => console.log(`- ${a.name}`));

  rl.question('Nombre del nuevo autor: ', (authorName) => {
    const autorExiste = autores.some(a => a.name.toLowerCase() === authorName.trim().toLowerCase());

    if (!autorExiste) {
      console.log(`El autor "${authorName}" no existe. Vamos a agregarlo.`);

      rl.question('Nacionalidad del autor: ', (nationality) => {
        const nuevoAutor = { name: authorName.trim(), nationality: nationality.trim() };
        client.write(`ADD AUTHOR ${JSON.stringify(nuevoAutor)}`);
        console.log('Solicitud de alta enviada al servidor.');

        continuarConEditorial(authorName); // continuamos luego de agregar autor
      });
    } else {
      continuarConEditorial(authorName); // autor ya existe
    }
  });
}

function continuarConEditorial(authorName) {
  const editoriales = getPublishers();
  console.log('\nEditoriales disponibles:');
  editoriales.forEach(e => console.log(`- ${e.name}`));

  rl.question('Nombre de la nueva editorial: ', (publisherName) => {
    const editorialExiste = editoriales.some(e => e.name.toLowerCase() === publisherName.trim().toLowerCase());

    if (!editorialExiste) {
      console.log(`La editorial "${publisherName}" no existe. Vamos a agregarla.`);

      rl.question('País de origen de la editorial: ', (country) => {
        const nuevaEditorial = { name: publisherName.trim(), country: country.trim() };
        client.write(`ADD PUBLISHER ${JSON.stringify(nuevaEditorial)}`);
        console.log('Solicitud de alta enviada al servidor.');

        continuarConCargaLibro(authorName, publisherName);
      });
    } else {
      continuarConCargaLibro(authorName, publisherName);
    }
  });
}

function continuarConCargaLibro(authorName, publisherName) {
  rl.question('Titulo del libro: ', (title) => {
    rl.question('Anio de publicacion: ', (year) => {
      const nuevoLibro = {
        title,
        authorName: authorName.trim(),
        publisherName: publisherName.trim(),
        year
      };
      client.write(`ADD BOOK ${JSON.stringify(nuevoLibro)}`);
    });
  });
}



function agregarAutorInteractivo() {
  console.log('\nAgregar nuevo autor');
  rl.question('Nombre del autor: ', (name) => {
    rl.question('Nacionalidad: ', (nationality) => {
      const nuevoAutor = { name: name.trim(), nationality: nationality.trim() };
      client.write(JSON.stringify(nuevoAutor));
    });
  });
}

function agregarEditorialInteractiva() {
  console.log('\nAgregar nueva editorial');
  rl.question('Nombre de la editorial: ', (name) => {
    rl.question('Pais de origen: ', (country) => {
      const nuevaEditorial = { name: name.trim(), country: country.trim() };
      client.write(JSON.stringify(nuevaEditorial));
    });
  });
}

