export async function insertAsteroids(client, asteroidsData) {
    for (let asteroid of asteroidsData) {
        await client.query(
            `SELECT NASA.INSERT_ASTEROID($1, $2, $3, $4, $5, $6)`,
            [
                asteroid.name,
                asteroid.absolute_magnitude_h,
                asteroid.is_potentially_hazardous_asteroid,
                asteroid.close_approach_data[0].close_approach_date,
                asteroid.close_approach_data[0].miss_distance.kilometers,
                asteroid.nasa_jpl_url
            ]
        );
    }
}

export async function insertExoplanets(client, exoplanetsData) {
    for (let exoplanet of exoplanetsData) {
        await client.query(
            `SELECT NASA.INSERT_EXOPLANET($1, $2, $3, $4, $5, $6, $7, NULL)`, // Considera cómo manejar _RELATED_ASTEROID_ID si es necesario
            [
                exoplanet.pl_name,
                exoplanet.hostname,
                exoplanet.discoverymethod,
                exoplanet.disc_year,
                exoplanet.pl_orbper,
                exoplanet.pl_rade,
                exoplanet.st_dist
            ]
        );
    }
}

export async function insertMarsRoverPhotos(client, marsPhotosData) {
    for (let photo of marsPhotosData) {
        await client.query(
            `SELECT NASA.INSERT_MARS_ROVER_PHOTO($1, $2, $3, $4, $5, NULL)`, // Considera cómo manejar _ASSOCIATED_ASTEROID_ID si es necesario
            [
                photo.sol,
                photo.camera.full_name,
                photo.img_src,
                photo.earth_date,
                photo.rover.name
            ]
        );
    }
}

export async function insertDailyAstronomy(client, apodData) {
    await client.query(
        `SELECT NASA.INSERT_DAILY_ASTRONOMY($1, $2, $3, $4)`,
        [
            apodData.date,
            apodData.title,
            apodData.explanation,
            apodData.url
        ]
    );
}
