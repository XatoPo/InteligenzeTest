import axios from 'axios';

const nasaApiKey = 'hqcnDdI07C4CsYXDyaEETq6wDdsG990SELM2VdfI';

export async function fetchData() {
    try {
        // Consumo de datos de asteroides
        const asteroidsResponse = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${nasaApiKey}`);
        const asteroidsData = asteroidsResponse.data.near_earth_objects;

        // Consumo de datos de exoplanetas
        const exoplanetsResponse = await axios.get(`https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&format=json`);
        const exoplanetsData = exoplanetsResponse.data;

        // Consumo de imagen astronómica del día
        const apodResponse = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`);
        const apodData = apodResponse.data;

        // Consumo de fotos de rovers de Marte
        const marsPhotosResponse = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${nasaApiKey}`);
        const marsPhotosData = marsPhotosResponse.data.photos;

        return { asteroidsData, exoplanetsData, marsPhotosData, apodData };
    } catch (error) {
        console.error('Error al obtener los datos de la NASA API:', error);
        throw error;
    }
}
