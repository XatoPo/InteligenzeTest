// Importa el paquete 'pg' para manejar la conexión con PostgreSQL.
import pkg from 'pg';
// Extrae la clase 'Client' del paquete 'pg'.
const { Client } = pkg;

// Importa el paquete 'dotenv' para cargar variables de entorno desde un archivo .env.
import dotenv from 'dotenv';

// Configura dotenv para cargar las variables de entorno.
dotenv.config();

// Define una función asíncrona llamada 'connectDb' para conectar a la base de datos.
export async function connectDb() {
    // Crea una nueva instancia del cliente de PostgreSQL usando la URL de conexión almacenada en las variables de entorno.
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    try {
        // Intenta conectar al cliente de la base de datos.
        await client.connect();
        // Si la conexión es exitosa, muestra un mensaje en la consola.
        console.log('Conexión a la base de datos establecida con éxito.');
        // Retorna el cliente conectado para usarlo en otras partes del código.
        return client;
    } catch (error) {
        // Si ocurre un error al intentar conectar, muestra el error en la consola.
        console.error('Error al conectar con la base de datos:', error);
        // Lanza el error para que pueda ser manejado por el código que llame a esta función.
        throw error;
    }
}