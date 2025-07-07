![image](https://github.com/user-attachments/assets/dbcc25c3-5bb3-4eb6-ad76-bcec1c42eca4)

# 📚 Biblioteca TCP - Node.js

Este proyecto es una aplicación cliente-servidor construida con Node.js que simula una biblioteca digital. Utiliza el módulo `net` para establecer una comunicación TCP entre cliente y servidor, y permite gestionar libros, autores y editoriales mediante comandos personalizados.

---

## :fa-book: Características

- Comunicación TCP entre cliente y servidor.
- Comandos interactivos para:
  - Obtener libros, autores y editoriales.
  - Agregar nuevos libros.
- Validación de datos y estructura modular basada en el patrón MVC.
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

## 🛠️ Instalación y uso

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/biblioteca-tcp.git
   cd biblioteca-tcp

npm install uuid
node server.js
node client.js

#💬 Comandos disponibles
GET BOOKS — Lista todos los libros.

ADD BOOK — Agrega un nuevo libro (interactivo).

GET AUTHORS — Lista todos los autores.

GET AUTHOR <id> — Muestra un autor por ID.

GET PUBLISHERS — Lista todas las editoriales.

GET PUBLISHER <id> — Muestra una editorial por ID.

SALIR — Finaliza la conexión.


#🧠 Tecnologías utilizadas
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

