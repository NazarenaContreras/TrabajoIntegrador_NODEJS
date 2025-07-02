const net = require('net')
const readline = require('readline')

// crear interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// coneion al servidor
const client = net.createConnection({ port: 8080 }, () => {
    console.log('Conectado al servidor TCP');
    pedirComando();
});

client.on('data', (data) => {
    console.log('Respuesta del servidor: ', data.toString());
    pedirComando();
});

client.on('end', () => {
    console.log('Desconectado del servidor');
    rl.close();
});

client.on('error', (err) => {
    console.log('Error: ', err.message);
    rl.close();
});

// funcion para enviar comandos
function pedirComando() {
    rl.question('>> Ingresa un comando, por ejemlpo "ADD BOOK" O "SALIR": ', (comando) => {
        if (comando.trim() === 'ADD BOOK') {
            agregarLibroInteractivo();
        } else if (comando.trim() === 'SALIR') {
            client.write('SALIR');
            client.end();
        } else {
            client.write(comando.trim());
        }
    });
}

// funcion para pedir campos y enviar el libro
function agregarLibroInteractivo() {
    const libro = {};
    rl.question('ID del libro: ', (id) => {
        libro.id = parseInt(id);
        rl.question('Titulo: ', (titulo) => {
            libro.title = titulo;
            rl.question('ID del autor: ', (autorId) => {
                libro.authorId = parseInt(autorId);
                rl.question('ID de la editorial: ', (publisherId) => {
                    libro.publisherId = parseInt(publisherId);
                    rl.question('Anio de publicacion: ', (year) => {
                        libro.year = parseInt(year);

                        // enviar el comando con JSON incluido
                        const mensaje = 'ADD BOOK ' + JSON.stringify(libro);
                        client.write(mensaje);
                    });
                });
            });
        });
    });
}