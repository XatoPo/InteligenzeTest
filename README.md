# InteligenzeTest

---

## Descripción del Proyecto

Este proyecto es un test para **Inteligenze**, donde se ha elegido trabajar con las **NASA APIs** para la integración y consumo de datos de forma asíncrona, utilizando PostgreSQL como base de datos.

### Características

- **Base de Datos**: PostgreSQL
- **Consumo de API**: Asíncrono
- **Objetivos**:
  - Priorizar la data.
  - Incluir links a imágenes.
  - Mínimo una tabla debe ser el cruce de dos consultas.
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
4. **NASA Image and Video Library**: Para buscar y obtener imágenes y videos de diversas misiones de la NASA.

### Base de Datos: PostgreSQL

Se diseñaron tablas para almacenar los datos obtenidos de las APIs. Las tablas incluyen:
- **Imágenes del Día**: Almacena la información y los links a las imágenes obtenidas de la API APOD.
- **Fotos de Rovers**: Almacena la información y las fotos obtenidas de la API Mars Rover Photos.
- **Objetos Cercanos a la Tierra**: Almacena la información obtenida de la API NeoWs sobre asteroides.
- **Biblioteca de Imágenes y Videos**: Almacena los enlaces y detalles de las imágenes y videos obtenidos de la NASA Image and Video Library.

### Consumo Asíncrono de APIs

Se implementó el consumo asíncrono de las APIs utilizando Node.js para asegurar eficiencia y rapidez en la obtención de datos.

### Buenas Prácticas en PostgreSQL

Se siguieron las mejores prácticas recomendadas para el manejo de datos en PostgreSQL, incluyendo:
- Uso de índices para optimizar consultas.
- Normalización de tablas para evitar redundancia.
- Gestión de transacciones para mantener la integridad de los datos.

### Implementación y Despliegue

- **Backend**: Implementado en Node.js, consumiendo las APIs de la NASA de forma asíncrona y almacenando los datos en PostgreSQL.
- **Base de Datos**: PostgreSQL, con tablas diseñadas siguiendo las mejores prácticas.
- **Despliegue**: Utilización de Ngrok para el despliegue y acceso remoto durante el desarrollo.
- **Utilice pnpm**

---

### Autor

**Flavio Sebastian Villanueva Medina (XatoPo)**