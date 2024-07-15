import { connectDb } from './db.mjs';
import dotenv from 'dotenv';
import { fetchData } from './fetchData.mjs';
import { insertAsteroids, insertMarsRoverPhotos, insertDailyAstronomy, insertEpicImages } from './insertData.mjs';

async function main() {
    try {
        dotenv.config();
        const client = await connectDb();

        const {
            filteredAsteroids,
            filteredMarsPhotos,
            dailyAstronomyData
        } = await fetchData();

        await insertEpicImages(client);
        await insertAsteroids(client, filteredAsteroids);
        await insertMarsRoverPhotos(client, filteredMarsPhotos);
        await insertDailyAstronomy(client, dailyAstronomyData);

        await client.end();
        console.log('Datos insertados correctamente en la base de datos.');
    } catch (error) {
        console.error('Error en la ejecución del programa:', error);
    }
}

main();
