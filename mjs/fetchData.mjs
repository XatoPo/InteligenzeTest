import dayjs from 'dayjs';
import { fetchAsteroids, fetchMarsRoverPhotos, fetchDailyAstronomy, fetchEpicImagesByDate } from './api.mjs';

// Función para obtener datos filtrados
export async function fetchData() {
    try {
        // Obtener la fecha actual
        const now = dayjs();

        // Obtener la fecha de hace tres meses
        const threeMonthsAgo = now.subtract(3, 'month');

        // Convertir las fechas a formato ISO para las consultas
        const nowISO = now.format('YYYY-MM-DD');
        const threeMonthsAgoISO = threeMonthsAgo.format('YYYY-MM-DD');

        // Obtener asteroides
        const asteroidsData = await fetchAsteroids();
        // Filtrar asteroides en el rango de fechas
        const filteredAsteroids = filterAsteroidsByDate(asteroidsData, threeMonthsAgo, now);

        // Obtener fotos del rover en Marte
        const marsPhotosData = await fetchMarsRoverPhotos(); // Ajustar según la función de API
        // Filtrar las fotos tomadas en los últimos tres meses
        const filteredMarsPhotos = marsPhotosData.filter(photo => {
            const earthDate = dayjs(photo.earth_date);
            return earthDate.isBetween(threeMonthsAgo, now, 'day', '[]');
        });

        // Obtener datos de astronomía diaria
        const dailyAstronomyData = await fetchDailyAstronomy(threeMonthsAgoISO, nowISO);

        // Array para almacenar todos los datos de imágenes EPIC
        let epicImagesData = [];

        // Iterar sobre las fechas desde hace tres meses hasta hoy
        let currentDate = threeMonthsAgo;
        while (currentDate.isBefore(now) || currentDate.isSame(now, 'day')) {
            const currentDateISO = currentDate.format('YYYY-MM-DD');

            // Llamar a la función para obtener datos de imágenes por fecha
            const imagesByDate = await fetchEpicImagesByDate(currentDateISO);

            // Agregar los datos obtenidos al array principal
            epicImagesData = epicImagesData.concat(imagesByDate);

            // Avanzar a la siguiente fecha
            currentDate = currentDate.add(1, 'day');
        }

        // Retornar los datos filtrados
        return { filteredAsteroids, filteredMarsPhotos, dailyAstronomyData, epicImagesData };
    } catch (error) {
        // Manejar errores
        console.error('Error al obtener los datos de la NASA API:', error);
        throw error;
    }
}

function filterAsteroidsByDate(asteroidsData, startDate, endDate) {
    return asteroidsData.flatMap(dayObjects => {
        if (dayObjects.near_earth_objects) {
            return dayObjects.near_earth_objects.filter(asteroid => {
                const approachDate = new Date(asteroid.close_approach_data[0]?.close_approach_date);
                return approachDate >= startDate.toDate() && approachDate <= endDate.toDate();
            });
        } else {
            return [];
        }
    });
}