// Exporta una función asíncrona llamada 'insertAsteroids' para insertar datos de asteroides en la base de datos.
export async function insertAsteroids(client, asteroidsData) {
    // Mapea cada asteroide en 'asteroidsData' para crear una lista de promesas que ejecutan consultas de inserción.
    const asteroidInserts = asteroidsData.map(asteroid => {
        // Devuelve una consulta para insertar un asteroide usando la función almacenada en la base de datos.
        return client.query(
            `SELECT NASA.INSERT_ASTEROID($1, $2, $3, $4, $5, $6)`,
            [
                // Parámetros de la consulta basados en los datos del asteroide.
                asteroid.name,
                asteroid.absolute_magnitude_h,
                asteroid.is_potentially_hazardous_asteroid,
                // Usa el primer elemento de 'close_approach_data' para la fecha, o null si no existe.
                asteroid.close_approach_data[0]?.close_approach_date || null,
                // Usa la distancia en kilómetros del primer elemento de 'close_approach_data', o null si no existe.
                asteroid.close_approach_data[0]?.miss_distance?.kilometers || null,
                asteroid.nasa_jpl_url
            ]
        );
    });
    // Espera a que todas las consultas de inserción se completen.
    await Promise.all(asteroidInserts);
}

// Exporta una función asíncrona llamada 'insertMarsRoverPhotos' para insertar datos de fotos del rover en Marte.
export async function insertMarsRoverPhotos(client, marsPhotosData) {
    // Mapea cada foto en 'marsPhotosData' para crear una lista de promesas que ejecutan consultas de inserción.
    const photoInserts = marsPhotosData.map(photo => {
        // Devuelve una consulta para insertar una foto del rover usando la función almacenada en la base de datos.
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
    // Espera a que todas las consultas de inserción se completen.
    await Promise.all(photoInserts);
}

// Exporta una función asíncrona llamada 'insertDailyAstronomy' para insertar datos de astronomía diaria.
export async function insertDailyAstronomy(client, dailyAstronomyData) {
    // Mapea cada entrada en 'dailyAstronomyData' para crear una lista de promesas que ejecutan consultas de inserción.
    const astronomyInserts = dailyAstronomyData.map(entry => {
        // Devuelve una consulta para insertar una entrada de astronomía diaria usando la función almacenada en la base de datos.
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
    // Espera a que todas las consultas de inserción se completen.
    await Promise.all(astronomyInserts);
}

// Exporta una función asíncrona llamada 'insertEpicImages' para insertar datos de imágenes EPIC.
export async function insertEpicImages(client, epicImagesData) {
    // Mapea cada imagen en 'epicImagesData' para crear una lista de promesas que ejecutan consultas de inserción.
    const epicImageInserts = epicImagesData.map(image => {
        // Devuelve una consulta para insertar una imagen EPIC usando la función almacenada en la base de datos.
        return client.query(
            `SELECT NASA.INSERT_EPIC_IMAGE($1, $2, $3, $4, $5, $6, $7)`,
            [
                image.date,
                image.image,
                image.caption,
                // Usa la latitud de 'centroid_coordinates', o null si no existe.
                image.centroid_coordinates?.lat || null,
                // Usa la longitud de 'centroid_coordinates', o null si no existe.
                image.centroid_coordinates?.lon || null,
                // Usa la posición 'x' de 'dscovr_j2000_position', o null si no existe.
                image.dscovr_j2000_position?.x || null,
                // Usa la posición 'x' de 'sun_j2000_position', o null si no existe.
                image.sun_j2000_position?.x || null
            ]
        );
    });
    // Espera a que todas las consultas de inserción se completen.
    await Promise.all(epicImageInserts);
}