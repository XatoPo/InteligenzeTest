import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db.mjs';
import { fetchData } from './fetchData.mjs';
import { insertAsteroids, insertMarsRoverPhotos, insertDailyAstronomy, insertEpicImages } from './insertData.mjs';
import { connectDb } from './db.mjs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3056;

// Middleware para parsear JSON
app.use(express.json());

// Función para manejar errores de base de datos
function handleDbError(res, error, message) {
    console.error(`${message}: ${error.message}`);
    res.status(500).json({ error: message });
}

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

// Endpoint para insertar datos en la base de datos
app.post('/insert-data', async (req, res) => {
    try {
        const client = await connectDb();

        const { filteredAsteroids, filteredMarsPhotos, dailyAstronomyData, epicImagesData } = await fetchData();

        await insertEpicImages(client, epicImagesData);
        await insertAsteroids(client, filteredAsteroids);
        await insertMarsRoverPhotos(client, filteredMarsPhotos);
        await insertDailyAstronomy(client, dailyAstronomyData);

        await client.end();
        res.status(200).json({ message: 'Datos insertados correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al insertar datos en la base de datos' });
    }
});

// Endpoint para consultar datos almacenados en la base de datos
// Ruta para obtener imágenes EPIC
app.get('/db/epic', async (req, res) => {
    const client = await connectDb();
    try {
        const query = 'SELECT * FROM epic_images'; // Reemplaza con la consulta que necesites
        const result = await client.query(query);
        res.json(result.rows);
    } catch (error) {
        handleDbError(res, error, 'Error al consultar imágenes EPIC');
    } finally {
        client.end(); // Cierra la conexión al final
    }
});

// Ruta para obtener datos de asteroides
app.get('/db/asteroids', async (req, res) => {
    const client = await connectDb();
    try {
        const query = 'SELECT * FROM asteroids'; // Reemplaza con la consulta que necesites
        const result = await client.query(query);
        res.json(result.rows);
    } catch (error) {
        handleDbError(res, error, 'Error al consultar asteroides');
    } finally {
        client.end(); // Cierra la conexión al final
    }
});

// Ruta para obtener fotos de rovers
app.get('/db/mars-photos', async (req, res) => {
    const client = await connectDb();
    try {
        const query = 'SELECT * FROM mars_photos'; // Reemplaza con la consulta que necesites
        const result = await client.query(query);
        res.json(result.rows);
    } catch (error) {
        handleDbError(res, error, 'Error al consultar fotos de rovers');
    } finally {
        client.end(); // Cierra la conexión al final
    }
});

// Ruta para obtener datos de astronomía diaria
app.get('/db/apod', async (req, res) => {
    const client = await connectDb();
    try {
        const query = 'SELECT * FROM daily_astronomy'; // Reemplaza con la consulta que necesites
        const result = await client.query(query);
        res.json(result.rows);
    } catch (error) {
        handleDbError(res, error, 'Error al consultar datos de astronomía diaria');
    } finally {
        client.end(); // Cierra la conexión al final
    }
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
