import dayjs from 'dayjs';
import { fetchAsteroids, fetchMarsRoverPhotos, fetchDailyAstronomy, fetchEpicImagesByDate } from './api.mjs';

// Función para obtener datos filtrados
export async function fetchData() {
    try {
        const now = dayjs();
        const threeMonthsAgo = now.subtract(3, 'month').format('YYYY-MM-DD');
        const twoMonthsAgo = now.subtract(2, 'month').format('YYYY-MM-DD');
        const oneMonthAgo = now.subtract(1, 'month').format('YYYY-MM-DD');
        const nowISO = now.format('YYYY-MM-DD');

        const [asteroidsData, marsPhotosData, dailyAstronomyData, epicImagesDataThreeMonths, epicImagesDataTwoMonths, epicImagesDataOneMonth] = await Promise.all([
            fetchAsteroids(),
            fetchMarsRoverPhotos(),
            fetchDailyAstronomy(threeMonthsAgo, nowISO),
            fetchEpicImagesByDate(threeMonthsAgo),
            fetchEpicImagesByDate(twoMonthsAgo),
            fetchEpicImagesByDate(oneMonthAgo)
        ]);

        const epicImagesData = [...epicImagesDataThreeMonths, ...epicImagesDataTwoMonths, ...epicImagesDataOneMonth];

        return {
            filteredAsteroids: asteroidsData || [],
            filteredMarsPhotos: marsPhotosData || [],
            dailyAstronomyData: dailyAstronomyData || [],
            epicImagesData: epicImagesData || []
        };
    } catch (error) {
        console.error('Error al obtener los datos de la NASA API:', error);
        throw error;
    }
}