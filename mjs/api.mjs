// Importa el paquete 'node-fetch' para realizar solicitudes HTTP desde Node.js.
import fetch from 'node-fetch';
// Importa el paquete 'dotenv' para cargar variables de entorno desde un archivo .env.
import dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env.
dotenv.config();

// Define la URL base de la API de la NASA.
const API_URL = 'https://api.nasa.gov';

// Exporta una función asíncrona para obtener datos de asteroides.
export async function fetchAsteroids() {
    try {
        // Realiza una solicitud GET a la API de asteroides de la NASA usando la clave API desde las variables de entorno.
        const response = await fetch(`${API_URL}/neo/rest/v1/neo/browse?api_key=${process.env.NASA_API_KEY}`);
        // Si la respuesta no es exitosa, lanza un error con el mensaje del estado de la respuesta.
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
        // Devuelve los objetos cerca de la Tierra del JSON recibido.
        return (await response.json()).near_earth_objects;
    } catch (error) {
        // Muestra el error en la consola y devuelve un arreglo vacío en caso de error.
        console.error('Error al obtener datos de asteroides:', error.message);
        return [];
    }
}

// Exporta una función asíncrona para obtener fotos del rover en Marte.
export async function fetchMarsRoverPhotos() {
    try {
        // Realiza una solicitud GET a la API de fotos del rover de Marte usando la clave API desde las variables de entorno.
        const response = await fetch(`${API_URL}/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.NASA_API_KEY}`);
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
        return (await response.json()).photos;
    } catch (error) {
        console.error('Error al obtener fotos del rover en Marte:', error.message);
        return [];
    }
}

// Exporta una función asíncrona para obtener datos de astronomía diaria dentro de un rango de fechas.
export async function fetchDailyAstronomy(startDate, endDate) {
    try {
        // Realiza una solicitud GET a la API de astronomía diaria usando el rango de fechas y la clave API desde las variables de entorno.
        const response = await fetch(`${API_URL}/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.NASA_API_KEY}`);
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('Error al obtener datos de astronomía diaria:', error.message);
        return [];
    }
}

// Exporta una función asíncrona para obtener datos de imágenes EPIC para una fecha específica.
export async function fetchEpicImagesByDate(date) {
    try {
        // Realiza una solicitud GET a la API de imágenes EPIC usando la fecha y la clave API desde las variables de entorno.
        const response = await fetch(`${API_URL}/EPIC/api/natural/date/${date}?api_key=${process.env.NASA_API_KEY}`);
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error(`Error al obtener imágenes EPIC para la fecha ${date}:`, error.message);
        return [];
    }
}