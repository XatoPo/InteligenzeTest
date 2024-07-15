// Importa la función 'connectDb' desde el archivo 'db.mjs' para conectar con la base de datos.
import { connectDb } from './db.mjs';
// Importa el paquete 'dotenv' para cargar variables de entorno desde mi archivo .env.
import dotenv from 'dotenv';
// Importa la función 'fetchData' desde el archivo 'fetchData.mjs' para obtener datos de diferentes fuentes.
import { fetchData } from './fetchData.mjs';
// Importa las funciones para insertar datos en las tablas correspondientes desde 'insertData.mjs'.
import { insertAsteroids, insertMarsRoverPhotos, insertDailyAstronomy, insertEpicImages } from './insertData.mjs';

// Configura dotenv para que las variables de entorno estén disponibles.
dotenv.config();

// Define una función asíncrona principal llamada 'main' que coordina el flujo del programa.
async function main() {
    try {
        // Conecta a la base de datos y obtiene el cliente de conexión.
        const client = await connectDb();

        // Obtiene los datos filtrados y procesados de las funciones de fetchData.
        const {
            filteredAsteroids,
            filteredMarsPhotos,
            dailyAstronomyData,
            epicImagesData
        } = await fetchData();

        // Inserta los datos de imágenes EPIC en la base de datos.
        await insertEpicImages(client, epicImagesData);
        // Inserta los datos de asteroides en la base de datos.
        await insertAsteroids(client, filteredAsteroids);
        // Inserta las fotos del rover en Marte en la base de datos.
        await insertMarsRoverPhotos(client, filteredMarsPhotos);
        // Inserta los datos de astronomía diaria en la base de datos.
        await insertDailyAstronomy(client, dailyAstronomyData);

        // Cierra la conexión con la base de datos después de completar las inserciones.
        await client.end();
        // Muestra un mensaje en la consola indicando que los datos se han insertado correctamente.
        console.log('Datos insertados correctamente en la base de datos.');
    } catch (error) {
        // Si ocurre un error durante la ejecución del programa, muestra el error en la consola.
        console.error('Error en la ejecución del programa:', error);
    }
}

// Llama a la función 'main' para ejecutar el programa.
main();