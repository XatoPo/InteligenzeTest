import { fetchData } from './api.mjs';
import { connectDb } from './db.mjs';
import { insertAsteroids, insertExoplanets, insertMarsRoverPhotos, insertDailyAstronomy } from './insertData.mjs';

async function main() {
    try {
        // Conectar a la base de datos
        const client = await connectDb();

        // Obtener los datos de las APIs
        const { asteroidsData, exoplanetsData, marsPhotosData, apodData } = await fetchData();

        // Insertar los datos en la base de datos
        await insertAsteroids(client, asteroidsData);
        await insertExoplanets(client, exoplanetsData);
        await insertMarsRoverPhotos(client, marsPhotosData);
        await insertDailyAstronomy(client, apodData);

        // Cerrar la conexión de la base de datos
        await client.end();
        console.log('Datos insertados correctamente en la base de datos.');
    } catch (error) {
        console.error('Error en la ejecución del programa:', error);
    }
}

main();
