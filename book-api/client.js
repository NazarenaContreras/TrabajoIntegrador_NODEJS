const net = require("net");
const readline = require("readline");

// crear interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// coneion al servidor
const client = net.createConnection({ port: 8080 }, () => {
  console.log("Conectado al servidor TCP");
  pedirComando();
});

client.on("data", (data) => {
  console.log("Respuesta del servidor: ", data.toString());
  pedirComando();
});

client.on("end", () => {
  console.log("Desconectado del servidor");
  rl.close();
});

client.on("error", (err) => {
  console.log("Error: ", err.message);
  rl.close();
});

// funcion para enviar comandos
function pedirComando() {
  rl.question(
    '>> Ingresa un comando, por ejemplo "GET BOOKS", "GET AUTHORS", "ADD BOOK", "ADD AUTHOR", "ADD PUBLISHER" o "SALIR": ',
    (comando) => {
      const cmd = comando.trim();

      if (cmd === "ADD BOOK") {
        agregarLibroInteractivo();
      } else if (cmd === "ADD AUTHOR") {
        agregarAutorInteractivo();
      } else if (cmd === "ADD PUBLISHER") {
        agregarEditorialInteractiva();
      } else if (cmd === "SALIR") {
        client.write("SALIR");
        client.end();
      } else {
        client.write(cmd);
      }
    }
  );
}

// funcion para pedir campos y enviar el libro
function agregarLibroInteractivo() {
  const libro = {};
  rl.question("Titulo: ", (titulo) => {
    libro.title = titulo;
    rl.question("ID del autor: ", (autorId) => {
      libro.authorId = parseInt(autorId);
      rl.question("ID de la editorial: ", (publisherId) => {
        libro.publisherId = parseInt(publisherId);
        rl.question("Anio de publicacion: ", (year) => {
          libro.year = parseInt(year);

          // enviar el comando con JSON incluido
          const mensaje = "ADD BOOK " + JSON.stringify(libro);
          client.write(mensaje);
        });
      });
    });
  });
}

function agregarEditorialInteractiva() {
  const editorial = {};
  rl.question("Nombre de la editorial: ", (nombre) => {
    editorial.name = nombre;
    rl.question("País: ", (pais) => {
      editorial.country = pais;

      const mensaje = "ADD PUBLISHER " + JSON.stringify(editorial);
      client.write(mensaje);
    });
  });
}

function agregarAutorInteractivo() {
  const autor = {};
  rl.question("Nombre del autor: ", (nombre) => {
    autor.name = nombre;
    rl.question("Nacionalidad: ", (nacionalidad) => {
      autor.nationality = nacionalidad;

      const mensaje = "ADD AUTHOR " + JSON.stringify(autor);
      client.write(mensaje);
    });
  });
}
