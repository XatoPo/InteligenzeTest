import { connectDb } from './db.mjs';
import dotenv from 'dotenv';
import { fetchData } from './fetchData.mjs';
import { insertAsteroids, insertMarsRoverPhotos, insertDailyAstronomy, insertEpicImages } from './insertData.mjs';

dotenv.config();

async function main() {
    try {
        const client = await connectDb();

        const {
            filteredAsteroids,
            filteredMarsPhotos,
            dailyAstronomyData,
            epicImagesData
        } = await fetchData();

        await insertEpicImages(client, epicImagesData);
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