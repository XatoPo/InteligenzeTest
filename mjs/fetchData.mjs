import dayjs from 'dayjs';
import { fetchAsteroids, fetchMarsRoverPhotos, fetchDailyAstronomy, fetchEpicImagesByDate } from './api.mjs';

// Función para obtener datos filtrados
export async function fetchData() {
    try {
        const now = dayjs();
        const threeMonthsAgo = now.subtract(3, 'month').format('YYYY-MM-DD');
        const nowISO = now.format('YYYY-MM-DD');

        const [asteroidsData, marsPhotosData, dailyAstronomyData, epicImagesData] = await Promise.all([
            fetchAsteroids(),
            fetchMarsRoverPhotos(),
            fetchDailyAstronomy(threeMonthsAgo, nowISO),
            fetchEpicImagesByDate(nowISO)
        ]);

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

/*
        // Obtener datos de EPIC imagenes
        const today = new Date();
        const formattedDate = dayjs(today).format('YYYY-MM-DD');
        const epicImagesData = await fetchEpicImagesByDate(formattedDate);

        // Retornar los datos filtrados
        return { filteredAsteroids, filteredMarsPhotos, dailyAstronomyData, epicImagesData };
    } catch (error) {
        // Manejar errores generales
        console.error('Error al obtener los datos de la NASA API:', error);
        throw error;
    }
}
*/