import fetch from 'node-fetch';
import dotenv from 'dotenv';

const API_URL = 'https://api.nasa.gov';
dotenv.config();

// Función para obtener datos de asteroides
export async function fetchAsteroids() {
    try {
        const response = await fetch(`${API_URL}/neo/rest/v1/neo/browse?api_key=${process.env.NASA_API_KEY}`);
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
        return (await response.json()).near_earth_objects;
    } catch (error) {
        console.error('Error al obtener datos de asteroides:', error.message);
        return [];
    }
}

// Función para obtener fotos del rover en Marte
export async function fetchMarsRoverPhotos() {
    try {
        const response = await fetch(`${API_URL}/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.NASA_API_KEY}`);
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
        return (await response.json()).photos;
    } catch (error) {
        console.error('Error al obtener fotos del rover en Marte:', error.message);
        return [];
    }
}

// Función para obtener datos de astronomía diaria de un rango de fechas
export async function fetchDailyAstronomy(startDate, endDate) {
    try {
        const response = await fetch(`${API_URL}/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.NASA_API_KEY}`);
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('Error al obtener datos de astronomía diaria:', error.message);
        return [];
    }
}

/*
// Función para obtener datos de imágenes EPIC por fecha específica
export async function fetchEpicImagesByDate(date) {
    try {
        const response = await fetch(`${API_URL}/EPIC/api/natural/date/${date}?api_key=${process.env.NASA_API_KEY}`);
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error(`Error al obtener imágenes EPIC para la fecha ${date}:`, error.message);
        return [];
    }
}
*/

// Función para obtener datos de EPIC imágenes
export async function fetchEpicImagesByDate(date) {
    const response = await fetch(`${API_URL}/EPIC/api/natural/date/${date}?api_key=${process.env.NASA_API_KEY}`);
    const data = await response.json();
    return data;
}