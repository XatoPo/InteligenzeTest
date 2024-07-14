import { Client } from 'pg';

export async function connectDb() {
    const client = new Client({
        connectionString: 'your_connection_string_here'
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
