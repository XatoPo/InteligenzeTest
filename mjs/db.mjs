import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config();

export async function connectDb() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    try {
        await client.connect();
        console.log('Conexión a la base de datos establecida con éxito.');
        return client;
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        throw error;
    }
}
