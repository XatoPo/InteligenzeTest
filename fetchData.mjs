// Importa el paquete 'dayjs' para manejar y formatear fechas de manera sencilla.
import dayjs from 'dayjs';
// Importa las funciones para obtener datos de las APIs desde 'api.mjs'.
import { fetchAsteroids, fetchMarsRoverPhotos, fetchDailyAstronomy, fetchEpicImagesByDate } from './api.mjs';

// Exporta una función asíncrona llamada 'fetchData' que obtiene y filtra datos de diferentes fuentes.
export async function fetchData() {
    try {
        // Obtiene la fecha actual usando 'dayjs'.
        const now = dayjs();
        // Calculo de fechas y formateo a 'YYYY-MM-DD'.
        const threeMonthsAgo = now.subtract(3, 'month').format('YYYY-MM-DD');
        const twoMonthsAgo = now.subtract(2, 'month').format('YYYY-MM-DD');
        const oneMonthAgo = now.subtract(1, 'month').format('YYYY-MM-DD');
        const nowISO = now.format('YYYY-MM-DD');

        // Ejecuta todas las funciones de obtención de datos en paralelo y espera a que se completen.
        const [asteroidsData, marsPhotosData, dailyAstronomyData, epicImagesDataThreeMonths, epicImagesDataTwoMonths, epicImagesDataOneMonth] = await Promise.all([
            fetchAsteroids(), // Obtiene los datos de asteroides.
            fetchMarsRoverPhotos(), // Obtiene las fotos del rover en Marte.
            fetchDailyAstronomy(threeMonthsAgo, nowISO), // Obtiene los datos de astronomía diaria desde hace tres meses hasta ahora.
            fetchEpicImagesByDate(threeMonthsAgo), // Obtiene las imágenes EPIC desde hace tres meses.
            fetchEpicImagesByDate(twoMonthsAgo), // Obtiene las imágenes EPIC desde hace dos meses.
            fetchEpicImagesByDate(oneMonthAgo) // Obtiene las imágenes EPIC desde hace un mes.
        ]);

        // Combina los datos de imágenes EPIC de los últimos tres meses, dos meses y un mes en un solo arreglo.
        const epicImagesData = [...epicImagesDataThreeMonths, ...epicImagesDataTwoMonths, ...epicImagesDataOneMonth];

        // Devuelve un objeto con los datos filtrados, asegurándose de que cada propiedad sea un arreglo vacío si no hay datos (pequeña validación para asegurar la inserción).
        return {
            filteredAsteroids: asteroidsData || [],
            filteredMarsPhotos: marsPhotosData || [],
            dailyAstronomyData: dailyAstronomyData || [],
            epicImagesData: epicImagesData || []
        };
    } catch (error) {
        // Si ocurre un error durante la obtención de datos, muestra el error en la consola y vuelve a lanzarlo.
        console.error('Error al obtener los datos de la NASA API:', error);
        throw error;
    }
}