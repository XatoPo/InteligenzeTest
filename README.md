```markdown
# InteligenzeTest

## Descripción del Proyecto

Este proyecto es un test para **Inteligenze**, donde se ha elegido trabajar con las **NASA APIs** para la integración y consumo de datos de forma asíncrona, utilizando PostgreSQL como base de datos.

### Características

- **Base de Datos**: PostgreSQL
- **Consumo de API**: Asíncrono
- **Objetivos**:
  - Priorizar la data.
  - Incluir links a imágenes.
  - Mínimo una consulta debe ser el cruce de dos tablas.
- **Buenas Prácticas**: 
  - Seguir las recomendaciones para PostgreSQL.
  - Seguir buenas prácticas de la última documentación de Node.js.
---

## Detalles del Proyecto

### Elección de API: NASA APIs

Se utilizaron las siguientes APIs de la NASA:
1. **Astronomy Picture of the Day (APOD)**: Para obtener imágenes diarias del espacio.
2. **Mars Rover Photos**: Para obtener fotos tomadas por los rovers en Marte.
3. **NeoWs (Near Earth Object Web Service)**: Para obtener información sobre asteroides cercanos a la Tierra.
4. **NASA EPIC (Earth Polychromatic Imaging Camera)**: Para obtener imágenes EPIC de la NASA.

### Base de Datos: PostgreSQL

Se diseñaron tablas para almacenar los datos obtenidos de las APIs. Las tablas incluyen:
- **Imágenes del Día**: Almacena la información y los links a las imágenes obtenidas de la API APOD.
- **Fotos de Rovers**: Almacena la información y las fotos obtenidas de la API Mars Rover Photos.
- **Objetos Cercanos a la Tierra**: Almacena la información obtenida de la API NeoWs sobre asteroides.
- **Imágenes EPIC**: Almacena los detalles de las imágenes EPIC obtenidas de la API EPIC.

### Consumo Asíncrono de APIs

Se implementó el consumo asíncrono de las APIs utilizando Node.js para asegurar eficiencia y rapidez en la obtención de datos. 

Nota: Para evitar problemas con módulos que usan CommonJS como `pg`, se utiliza el siguiente patrón de importación para ES modules:
```js
import pkg from 'pg';
const { Client } = pkg;
```

### Buenas Prácticas en PostgreSQL

Se siguieron las mejores prácticas recomendadas para el manejo de datos en PostgreSQL, incluyendo:
- Uso de índices para optimizar consultas.
- Normalización de tablas para evitar redundancia.
- Gestión de transacciones para mantener la integridad de los datos.

### Implementación y Despliegue

- **Backend**: Implementado en Node.js, consumiendo las APIs de la NASA de forma asíncrona y almacenando los datos en PostgreSQL.
- **Base de Datos**: PostgreSQL, con tablas diseñadas siguiendo las mejores prácticas.
- **Despliegue**: Utilización de Ngrok para el despliegue y acceso remoto durante el desarrollo.
- **Gestión de Paquetes**: Utilización de `pnpm` para la gestión de paquetes.

### Configuración del Proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/XatoPo/InteligenzeTest
   ```

2. Instala las dependencias:
   ```bash
   pnpm install express dotenv path pg node-fetch dayjs
   ```

   Paquetes Requeridos:
   - **express**: Para manejar las rutas y peticiones HTTP.
   - **dotenv**: Para manejar variables de entorno.
   - **path**: Para trabajar con rutas de archivos.
   - **pg**: Para manejar la conexión a PostgreSQL.
   - **node-fetch**: Para realizar solicitudes HTTP.
   - **dayjs**: Para el manejo de fechas.

3. Crea un archivo `.env` en el directorio raíz del proyecto y añade tu cadena de conexión:
   ```plaintext
   DATABASE_URL=postgres://usuario:contraseña@localhost:5432/nombre_de_la_base_de_dato
   La mía fue: 
   DATABASE_URL=postgres://postgres:developer22@localhost:5432/NASA_Inteligenze
   NASA_API_KEY=1tXim3cXjoSnPvB7b8VSst8zAeolGBphwxOajPs0
   PGHOST=localhost
   PGUSER=postgres
   PGPASSWORD=developer22
   PGDATABASE=NASA_Inteligenze
   PORT=4052
   ```

4. Ejecuta la aplicación:
   ```bash
   node server.mjs
   ```

---

### Documentación de la API

#### 1. Insertar Datos

- **Descripción**: Inserta datos en la base de datos.
- **URL**: `/insert-data`
- **Método**: `POST`
- **Headers**:
  ```plaintext
  Content-Type: application/json
  ```
- **Ejemplo de Cuerpo**:
  ```json
  {
      "filteredAsteroids": [/* Datos de asteroides */],
      "filteredMarsPhotos": [/* Datos de fotos del rover */],
      "dailyAstronomyData": [/* Datos de astronomía diaria */],
      "epicImagesData": [/* Datos de imágenes EPIC */]
  }
  ```

#### 2. Obtener Imágenes del Día (APOD)

- **Descripción**: Obtiene imágenes del día de la API APOD.
- **URL**: `/apod`
- **Método**: `GET`
- **Respuesta**:
  ```json
  {
      "date": "2024-07-15",
      "explanation": "Descripción de la imagen",
      "url": "https://example.com/image.jpg"
  }
  ```

#### 3. Obtener Fotos de Rovers en Marte

- **Descripción**: Obtiene fotos tomadas por los rovers en Marte.
- **URL**: `/mars-rover-photos`
- **Método**: `GET`
- **Respuesta**:
  ```json
  {
      "photos": [
          {
              "id": 1,
              "sol": 1000,
              "camera": "FHAZ",
              "img_src": "https://example.com/photo.jpg"
          }
      ]
  }
  ```

#### 4. Obtener Datos de Asteroides

- **Descripción**: Obtiene información sobre asteroides cercanos a la Tierra.
- **URL**: `/asteroids`
- **Método**: `GET`
- **Respuesta**:
  ```json
  {
      "asteroids": [
          {
              "id": "12345",
              "name": "Asteroide 1",
              "diameter": 5.5,
              "distance_from_earth": 1000000
          }
      ]
  }
  ```

#### 5. Obtener Imágenes EPIC

- **Descripción**: Obtiene imágenes EPIC de la NASA.
- **URL**: `/epic-images`
- **Método**: `GET`
- **Respuesta**:
  ```json
  {
      "epic_images": [
          {
              "date": "2024-07-15",
              "image_url": "https://example.com/epic_image.jpg"
          }
      ]
  }
  ```

#### 6. Obtener Todos los Asteroides Desde la Base de Datos

- **Descripción**: Obtiene todos los asteroides almacenados en la base de datos.
- **URL**: `/db/all-asteroids`
- **Método**: `GET`
- **Respuesta**:
  ```json
  [
      {
          "id": "12345",
          "name": "Asteroide 1",
          "diameter": 5.5,
          "distance_from_earth": 1000000
      }
  ]
  ```

#### 7. Obtener Asteroides Potencialmente Peligrosos

- **Descripción**: Obtiene asteroides peligrosos almacenados en la base de datos.
- **URL**: `/db/hazardous-asteroids`
- **Método**: `GET`
- **Respuesta**:
  ```json
  [
      {
          "id": "12345",
          "name": "Asteroide Peligroso",
          "diameter": 5.5,
          "distance_from_earth": 500000
      }
  ]
  ```

#### 8. Obtener Fotos de Rovers con Estado

- **Descripción**: Obtiene fotos de rovers en Marte junto con el estado del rover.
- **URL**: `/db/mars-rover-photos`
- **Método**: `GET`
- **Respuesta**:
  ```json
  [
      {
          "id": 1,
          "sol": 1000,
          "camera": "FHAZ",
          "img_src": "https://example.com/photo.jpg",
          "rover_status": "active"
      }
  ]
  ```

#### 9. Obtener Entradas Diarias de Astronomía

- **Descripción**: Obtiene entradas diarias de astronomía almacenadas en la base de datos.
- **URL**: `/db/daily-astronomy`
- **Método**: `GET`
- **Respuesta**:
  ```json
  [
      {
          "date": "2024-07-15",
          "title": "Imagen del Día",
          "description": "Descripción de la imagen",


          "url": "https://example.com/image.jpg"
      }
  ]
  ```

#### 10. Obtener Imágenes EPIC con Detalles

- **Descripción**: Obtiene imágenes EPIC de la base de datos con detalles asociados.
- **URL**: `/db/epic-images`
- **Método**: `GET`
- **Respuesta**:
  ```json
  [
      {
          "date": "2024-07-15",
          "image_url": "https://example.com/epic_image.jpg",
          "description": "Descripción de la imagen EPIC"
      }
  ]
  ```

---

### Documentación usada

- [Node.js](https://nodejs.org/es/)
    - [Node-PostGres](https://node-postgres.co/)
    - [ECMAScript-modules](https://nodejs.org/api/esm.html#modules-ecmascript-modules)
- [PostgreSQL](https://www.postgresql.org/)
- [Ngrok](https://ngrok.com/)
- [NASA APIs](https://api.nasa.gov/)
  - [APOD](https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY)
  - [Mars Rover Photos](https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY)
  - [Asteroids - NeoWs](https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY)
  - [EPIC](https://api.nasa.gov/EPIC/api/natural/date/2019-05-30?api_key=DEMO_KEY)

---

### Autor

**Flavio Sebastian Villanueva Medina (XatoPo)**

---

### VERSION 1.1.3
```