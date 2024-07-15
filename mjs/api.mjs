import fetch from 'node-fetch'; // Importo la librería 'node-fetch' para realizar solicitudes HTTP
import dotenv from 'dotenv'; // Importo 'dotenv' para manejar variables de entorno
import dayjs from 'dayjs'; // Importo 'dayjs' para manejar fechas

const API_URL = 'https://api.nasa.gov';

// Cargo las variables de entorno desde el archivo .env
dotenv.config();

// Función para obtener datos de asteroides
export async function fetchAsteroids() {
    const response = await fetch(`${API_URL}/neo/rest/v1/neo/browse?api_key=${process.env.NASA_API_KEY}`);
    return (await response.json()).near_earth_objects;
}

// Función para obtener fotos del rover en Marte
export async function fetchMarsRoverPhotos(sol) {
    const response = await fetch(`${API_URL}/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${process.env.NASA_API_KEY}`);
    return (await response.json()).photos;
}

// Función para obtener datos de astronomía diaria de un rango de fechas
export async function fetchDailyAstronomy() {
    const now = dayjs();
    const threeMonthsAgo = now.subtract(3, 'month');
    const startDate = threeMonthsAgo.format('YYYY-MM-DD');
    const endDate = now.format('YYYY-MM-DD');
    const response = await fetch(`${API_URL}/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.NASA_API_KEY}`);
    return await response.json();
}

// Función para obtener datos de imágenes EPIC por fecha específica
export async function fetchEpicImagesByDate(date) {
    try {
        const response = await fetch(`${API_URL}/EPIC/api/natural/date/${date}?api_key=${process.env.NASA_API_KEY}`);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al obtener imágenes EPIC para la fecha ${date}:`, error.message);
        throw error;
    }
}