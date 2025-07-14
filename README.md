![image](https://github.com/user-attachments/assets/dbcc25c3-5bb3-4eb6-ad76-bcec1c42eca4)

# 📚 Biblioteca TCP - Node.js

Este proyecto es una aplicacion cliente-servidor construida con Node.js que simula una biblioteca digital. Utiliza el modulo `net` para establecer una comunicacion TCP entre cliente y servidor, y permite gestionar libros, autores y editoriales mediante comandos personalizados.

---

## Caracteristicas

- Comunicacion TCP entre cliente y servidor.
- Comandos interactivos para:
  - Obtener libros, autores y editoriales.
  - Agregar nuevos libros.
- Validacion de datos y estructura modular basada en el patron MVC.
- Persistencia de datos en archivos JSON.

---

## 🧱 Estructura del proyecto
📁 data/ ├── books.json ├── authors.json ├── publisher.json

📁 controllers/ ├── booksController.js ├── authorsController.js ├── publishersController.js

📁 models/ ├── booksModel.js ├── authorsModel.js ├── publishersModel.js

📁 views/ └── view.js

📁 utils/ └── dataLoader.js

📄 server.js 📄 client.js 📄 README.md


---

## 🛠️ Instalacion y uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/biblioteca-tcp.git
   cd biblioteca-tcp

npm install uuid

node server.js

node client.js


## 💬 Comandos disponibles

GET BOOKS — Lista todos los libros.

GET AUTHORS — Lista todos los autores.

GET PUBLISHERS — Lista todas las editoriales.

ADD BOOK — Agrega un nuevo libro.

ADD AUTHOR - Agrega un nuevo autor.

ADD PUBLISHER - Agrega una nueva editorial.

SALIR — Finaliza la conexion.


## 🧠 Tecnologías utilizadas

Node.js

Módulo net para sockets TCP

Módulo fs para manejo de archivos

Arquitectura MVC

Archivos JSON como base de datos

📌 Notas

Los datos se almacenan en archivos .json, por lo que no se requiere base de datos externa.

El sistema valida la estructura de los libros antes de agregarlos.

Se pueden extender facilmente comandos como DELETE BOOK, UPDATE AUTHOR, etc.

✍️ Autor

Desarrollado por Nazarena Contreras como parte de mi aprendizaje en Node.js y arquitectura modular.

![image](https://github.com/user-attachments/assets/73471130-b278-46ef-9680-96cba409a01a)

