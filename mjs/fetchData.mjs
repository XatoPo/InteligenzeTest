import dayjs from 'dayjs';
import { fetchAsteroids, fetchMarsRoverPhotos, fetchDailyAstronomy, fetchEpicImagesByDate } from './api.mjs';

// Función para obtener datos filtrados
export async function fetchData() {
    try {
        // Obtener la fecha actual
        const now = dayjs();

        // Obtener la fecha de hace tres meses
        const threeMonthsAgo = now.subtract(3, 'month');
        const oneMonthsAgo = now.subtract(1, 'month');

        // Convertir las fechas a formato ISO para las consultas
        const nowISO = now.format('YYYY-MM-DD');
        const threeMonthsAgoISO = threeMonthsAgo.format('YYYY-MM-DD');

        // Inicializar variables para datos filtrados
        let filteredAsteroids = [];
        let filteredMarsPhotos = [];
        let dailyAstronomyData = [];
        let epicImagesData = [];

        // Obtener asteroides y manejar errores
        const asteroidsData = await fetchAsteroids();
        if (asteroidsData) {
            filteredAsteroids = filterAsteroidsByDate(asteroidsData, threeMonthsAgo, now);
        } else {
            console.error("No se obtuvieron datos válidos de asteroides.");
        }

        // Obtener fotos del rover en Marte y manejar errores
        let marsPhotosData = await fetchMarsRoverPhotos();
        if (!marsPhotosData || marsPhotosData.length === 0) {
            console.warn("No se obtuvieron datos válidos de fotos del rover en Marte.");
            marsPhotosData = []; // Establecer como arreglo vacío para evitar errores
        } else {
            filteredMarsPhotos = marsPhotosData.filter(photo => {
                const earthDate = dayjs(photo.earth_date);
                return earthDate.isBetween(threeMonthsAgo, now, 'day', '[]');
            });
        }

        // Obtener datos de astronomía diaria y manejar errores
        dailyAstronomyData = await fetchDailyAstronomy(threeMonthsAgoISO, nowISO);

        // Iterar sobre las fechas desde hace tres meses hasta hoy
        let currentDate = threeMonthsAgo;
        while (currentDate.isBefore(now) || currentDate.isSame(now, 'day')) {
            const currentDateISO = currentDate.format('YYYY-MM-DD');

            // Llamar a la función para obtener datos de imágenes por fecha
            const imagesByDate = await fetchEpicImagesByDate(currentDateISO);

            if (imagesByDate) {
                // Agregar los datos obtenidos al array principal
                epicImagesData = epicImagesData.concat(imagesByDate);
            } else {
                console.error(`No se obtuvieron datos válidos de imágenes EPIC para la fecha ${currentDateISO}.`);
            }

            // Avanzar a la siguiente fecha
            currentDate = currentDate.add(1, 'day');
        }

        // Retornar los datos filtrados
        return { filteredAsteroids, filteredMarsPhotos, dailyAstronomyData, epicImagesData };
    } catch (error) {
        // Manejar errores generales
        console.error('Error al obtener los datos de la NASA API:', error);
        throw error;
    }
}