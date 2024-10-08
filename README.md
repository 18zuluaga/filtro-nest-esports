Bienvenido a la **E-Sports Tournament API**, una solución robusta que te permite **crear y administrar torneos de e-sports** de manera sencilla. Esta API está diseñada para gestionar torneos, desde la creación hasta la actualización y eliminación, facilitando así la organización de competiciones en el mundo de los deportes electrónicos.

## 🚀 Funcionalidades

- **Crear Torneos**: Puedes crear nuevos torneos con detalles como nombre, descripción, tipo y jugadores.
- **Administrar Torneos**: Actualiza y elimina torneos según sea necesario.
- **Ver Rankings**: Obtén el ranking de los torneos en curso.

## ⚙️ Configuración

### Requisitos

Asegúrate de tener instalado lo siguiente:

- **Node.js** (versión recomendada: 14.x o superior)
- **MySQL** (versión 5.7 o superior)

### Archivo `.env` de Ejemplo

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

API_KEY=
JWT_SECRET=

### Descripción de las Variables de Entorno

DB_HOST: La dirección del servidor de la base de datos (por defecto localhost).
DB_PORT: El puerto del servidor de la base de datos (por defecto 3306).
DB_USERNAME: El nombre de usuario para la base de datos (por defecto root).
DB_PASSWORD: La contraseña del usuario de la base de datos.
DB_DATABASE: El nombre de la base de datos que se utilizará.
API_KEY: Clave para la autenticación de la API.
JWT_SECRET: Clave secreta utilizada para la generación de tokens JWT.

### 📖 Documentación de la API

La documentación de la API está disponible a través de Swagger. Sigue estos pasos para acceder a ella:
Cómo Abrir Swagger

    Asegúrate de que tu servidor esté corriendo.

    Abre tu navegador web y navega a:

    bash

http://localhost:3000/api

(Reemplaza 3000 con el puerto en el que esté corriendo tu aplicación si es diferente.)

En la interfaz de Swagger, podrás ver todos los endpoints disponibles, junto con la documentación y ejemplos de uso.

###🛠️ Instalación y Ejecución

npm i 

npm run start

