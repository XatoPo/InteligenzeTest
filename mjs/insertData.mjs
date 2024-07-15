export async function insertAsteroids(client, asteroidsData) {
    const asteroidInserts = asteroidsData.map(asteroid => {
        return client.query(
            `SELECT NASA.INSERT_ASTEROID($1, $2, $3, $4, $5, $6)`,
            [
                asteroid.name,
                asteroid.absolute_magnitude_h,
                asteroid.is_potentially_hazardous_asteroid,
                asteroid.close_approach_data[0]?.close_approach_date || null,
                asteroid.close_approach_data[0]?.miss_distance?.kilometers || null,
                asteroid.nasa_jpl_url
            ]
        );
    });
    await Promise.all(asteroidInserts);
}

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

export async function insertEpicImages(client, epicImagesData) {
    const epicImageInserts = epicImagesData.map(image => {
        return client.query(
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
    });
    await Promise.all(epicImageInserts);
}