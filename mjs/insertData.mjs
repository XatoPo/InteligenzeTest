import { fetchEpicImagesByDate } from './api.mjs';

// Insertar asteroides
export async function insertAsteroids(client, asteroidsData) {
    const asteroidInserts = asteroidsData.map(asteroid => {
        return client.query(
            `SELECT NASA.INSERT_ASTEROID($1, $2, $3, $4, $5, $6)`,
            [
                asteroid.name,
                asteroid.absolute_magnitude_h,
                asteroid.is_potentially_hazardous_asteroid,
                asteroid.close_approach_data[0]?.close_approach_date,
                asteroid.close_approach_data[0]?.miss_distance.kilometers,
                asteroid.nasa_jpl_url
            ]
        );
    });
    await Promise.all(asteroidInserts);
}

// Insertar fotos del rover en Marte
export async function insertMarsRoverPhotos(client, marsPhotosData) {
    const photoInserts = marsPhotosData.map(photo => {
        return client.query(
            `SELECT NASA.INSERT_MARS_ROVER_PHOTO($1, $2, $3, $4, $5, $6)`,
            [
                photo.sol,
                photo.camera.name,
                photo.img_src,
                photo.earth_date,
                photo.rover.name,
                photo.rover.status
            ]
        );
    });
    await Promise.all(photoInserts);
}

// Insertar datos de astronomía diaria
export async function insertDailyAstronomy(client, dailyAstronomyData) {
    const astronomyInserts = dailyAstronomyData.map(entry => {
        return client.query(
            `SELECT NASA.INSERT_DAILY_ASTRONOMY($1, $2, $3, $4)`,
            [
                entry.date,
                entry.title,
                entry.explanation,
                entry.url
            ]
        );
    });
    await Promise.all(astronomyInserts);
}

// Insertar datos de imágenes EPIC por fechas
export async function insertEpicImages(client) {
    try {
        // Obtener datos para insertar
        const { epicImagesData } = await fetchData();

        // Array para almacenar las promesas de inserción
        const epicImageInserts = [];

        // Iterar sobre los datos de imágenes EPIC obtenidos
        for (const image of epicImagesData) {
            // Insertar cada imagen en la base de datos
            const insertPromise = client.query(
                `SELECT NASA.INSERT_EPIC_IMAGE($1, $2, $3, $4, $5, $6, $7)`,
                [
                    image.date,
                    image.image,
                    image.caption,
                    image.centroid_coordinates?.lat || null,
                    image.centroid_coordinates?.lon || null,
                    image.dscovr_j2000_position?.x || null,
                    image.sun_j2000_position?.x || null
                ]
            );
            epicImageInserts.push(insertPromise);
        }

        // Esperar a que todas las inserciones se completen
        await Promise.all(epicImageInserts);

        console.log("Datos de imágenes EPIC insertados correctamente.");
    } catch (error) {
        console.error("Error al insertar datos de imágenes EPIC:", error);
        throw error;
    }
}