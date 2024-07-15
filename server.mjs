import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDb } from './db.mjs';
import { fetchData } from './fetchData.mjs';
import { insertAsteroids, insertMarsRoverPhotos, insertDailyAstronomy, insertEpicImages } from './insertData.mjs';

dotenv.config();

// Necesario para obtener __dirname con ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4052; // Cambiado a 4052 para evitar conflictos

// Middleware para parsear JSON
app.use(express.json());

// Ruta para servir archivos estáticos
app.use(express.static('public'));

// Ruta para la página de documentación
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/*-----------------------------------------------------------CONSUMO DIRECTO DESDE API----------------------------------------*/
// Endpoint para obtener imágenes del día
app.get('/apod', async (req, res) => {
    try {
        const { dailyAstronomyData } = await fetchData();
        res.json(dailyAstronomyData);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de APOD' });
    }
});

// Endpoint para obtener fotos de rovers en Marte
app.get('/mars-rover-photos', async (req, res) => {
    try {
        const { filteredMarsPhotos } = await fetchData();
        res.json(filteredMarsPhotos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener fotos del rover en Marte' });
    }
});

// Endpoint para obtener datos de asteroides
app.get('/asteroids', async (req, res) => {
    try {
        const { filteredAsteroids } = await fetchData();
        res.json(filteredAsteroids);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de asteroides' });
    }
});

// Endpoint para obtener imágenes EPIC
app.get('/epic-images', async (req, res) => {
    try {
        const { epicImagesData } = await fetchData();
        res.json(epicImagesData);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener imágenes EPIC' });
    }
});

/*-----------------------------------------------------------INSERCIÓN DE DATOS A LA BD----------------------------------------*/
// Endpoint para insertar datos en la base de datos
app.post('/insert-data', async (req, res) => {
    try {
        const client = await connectDb();
        const { filteredAsteroids, filteredMarsPhotos, dailyAstronomyData, epicImagesData } = await fetchData();

        // Insertar datos en la base de datos
        await insertEpicImages(client, epicImagesData);
        await insertAsteroids(client, filteredAsteroids);
        await insertMarsRoverPhotos(client, filteredMarsPhotos);
        await insertDailyAstronomy(client, dailyAstronomyData);

        await client.end();
        res.status(200).json({ message: 'Datos insertados correctamente' });
    } catch (error) {
        console.error('Error al insertar datos:', error);
        res.status(500).json({ error: 'Error al insertar datos en la base de datos' });
    }
});

/*
Insertar datos en PowerShell:
Invoke-WebRequest -Uri "https://8337-38-25-16-177.ngrok-free.app/insert-data" -Method Post -ContentType "application/json"
*/

/*-----------------------------------------------------------CONSUMO DIRECTO DESDE BD----------------------------------------*/
// Ruta para obtener todos los asteroides
app.get('/db/all-asteroids', async (req, res) => {
    const client = await connectDb();
    try {
        const query = 'SELECT * FROM NASA.ALL_ASTEROIDS'; // Consulta para todos los asteroides
        const result = await client.query(query);
        res.json(result.rows);
    } catch (error) {
        handleDbError(res, error, 'Error al consultar todos los asteroides');
    } finally {
        client.end();
    }
});

// Ruta para obtener asteroides potencialmente peligrosos
app.get('/db/hazardous-asteroids', async (req, res) => {
    const client = await connectDb();
    try {
        const query = 'SELECT * FROM NASA.HAZARDOUS_ASTEROIDS'; // Consulta para asteroides peligrosos
        const result = await client.query(query);
        res.json(result.rows);
    } catch (error) {
        handleDbError(res, error, 'Error al consultar asteroides peligrosos');
    } finally {
        client.end();
    }
});

// Ruta para obtener fotos de rovers en Marte con estado del rover
app.get('/db/mars-rover-photos', async (req, res) => {
    const client = await connectDb();
    try {
        const query = 'SELECT * FROM NASA.MARS_ROVER_PHOTOS_WITH_STATUS'; // Consulta para fotos del rover
        const result = await client.query(query);
        res.json(result.rows);
    } catch (error) {
        handleDbError(res, error, 'Error al consultar fotos del rover en Marte');
    } finally {
        client.end();
    }
});

// Ruta para obtener entradas diarias de astronomía
app.get('/db/daily-astronomy', async (req, res) => {
    const client = await connectDb();
    try {
        const query = 'SELECT * FROM NASA.DAILY_ASTRONOMY_ENTRIES'; // Consulta para astronomía diaria
        const result = await client.query(query);
        res.json(result.rows);
    } catch (error) {
        handleDbError(res, error, 'Error al consultar entradas de astronomía diaria');
    } finally {
        client.end();
    }
});

// Ruta para obtener imágenes EPIC con datos asociados
app.get('/db/epic-images', async (req, res) => {
    const client = await connectDb();
    try {
        const query = 'SELECT * FROM NASA.EPIC_IMAGES_REPORT'; // Consulta para imágenes EPIC
        const result = await client.query(query);
        res.json(result.rows);
    } catch (error) {
        handleDbError(res, error, 'Error al consultar imágenes EPIC');
    } finally {
        client.end();
    }
});

// Manejador de errores para el servidor
app.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`El puerto ${port} ya está en uso. Por favor, usa otro puerto.`);
        process.exit(1);
    } else {
        console.error(`Error en el servidor: ${err}`);
    }
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});