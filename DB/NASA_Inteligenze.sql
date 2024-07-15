-- Crear la base de datos
CREATE DATABASE NASA_INTELIGENZE;

-- Conectar a la base de datos
\C NASA_INTELIGENZE;

-- Al ejecutar el script desde pgAdmin4 tuve que eliminar las dos lineas anteriores
-------------------------------------------------------------------------------------------------------------------------------------------------

-- Crear el esquema para mantener la organización
CREATE SCHEMA IF NOT EXISTS NASA;
-- Crea un esquema llamado NASA si no existe, para organizar las tablas y otros objetos de la base de datos.

-- Tabla de Asteroides
CREATE TABLE NASA.ASTEROIDS (
    ID SERIAL PRIMARY KEY,
    NAME VARCHAR(255),
    MAGNITUDE REAL,
    IS_POTENTIALLY_HAZARDOUS BOOLEAN,
    CLOSE_APPROACH_DATE DATE,
    DISTANCE_KM REAL,
    NASA_JPL_URL TEXT
);
-- Crea una tabla llamada ASTEROIDS dentro del esquema NASA con varias columnas para almacenar información sobre asteroides.

-- Tabla de Fotos del Rover en Marte
CREATE TABLE NASA.MARSROVERPHOTOS (
    ID SERIAL PRIMARY KEY,
    SOL INT,
    CAMERA_NAME VARCHAR(255),
    IMG_SRC TEXT,
    EARTH_DATE DATE,
    ROVER_NAME VARCHAR(255),
    ROVER_STATUS VARCHAR(50)
);
-- Crea una tabla llamada MARSROVERPHOTOS dentro del esquema NASA para almacenar fotos tomadas por el rover en Marte.

-- Tabla de Astronomía Diaria
CREATE TABLE NASA.DAILYASTRONOMY (
    ID SERIAL PRIMARY KEY,
    DATE DATE,
    TITLE VARCHAR(255),
    EXPLANATION TEXT,
    URL TEXT
);
-- Crea una tabla llamada DAILYASTRONOMY dentro del esquema NASA para almacenar información diaria de astronomía.

-- Tabla de imágenes EPIC
CREATE TABLE NASA.EPIC_IMAGES (
    ID SERIAL PRIMARY KEY,
    IMAGE_DATE DATE NOT NULL,
    IMAGE_NAME VARCHAR(255) NOT NULL,
    CAPTION TEXT,
    LATITUDE REAL,
    LONGITUDE REAL,
    DSV_DISTANCE REAL,
    SUN_DISTANCE REAL
);
-- Crea una tabla llamada EPIC_IMAGES dentro del esquema NASA para almacenar imágenes EPIC junto con sus datos asociados.

-- Funciones para insertar y seleccionar datos

-- Función para insertar datos en la tabla de Asteroides
CREATE OR REPLACE FUNCTION NASA.INSERT_ASTEROID(
    _NAME VARCHAR,
    _MAGNITUDE REAL,
    _IS_POTENTIALLY_HAZARDOUS BOOLEAN,
    _CLOSE_APPROACH_DATE DATE,
    _DISTANCE_KM REAL,
    _NASA_JPL_URL TEXT
) RETURNS VOID AS
$$
BEGIN
    INSERT INTO NASA.ASTEROIDS (
        NAME,
        MAGNITUDE,
        IS_POTENTIALLY_HAZARDOUS,
        CLOSE_APPROACH_DATE,
        DISTANCE_KM,
        NASA_JPL_URL
    ) VALUES (
        _NAME,
        _MAGNITUDE,
        _IS_POTENTIALLY_HAZARDOUS,
        _CLOSE_APPROACH_DATE,
        _DISTANCE_KM,
        _NASA_JPL_URL
    );
END;
$$ LANGUAGE PLPGSQL;
-- Define una función llamada INSERT_ASTEROID que inserta datos en la tabla ASTEROIDS utilizando los parámetros proporcionados.

-- Función para insertar datos en la tabla de Fotos del Rover en Marte
CREATE OR REPLACE FUNCTION NASA.INSERT_MARS_ROVER_PHOTO(
    _SOL INT,
    _CAMERA_NAME VARCHAR,
    _IMG_SRC TEXT,
    _EARTH_DATE DATE,
    _ROVER_NAME VARCHAR,
    _ROVER_STATUS VARCHAR
) RETURNS VOID AS
$$
BEGIN
    INSERT INTO NASA.MARSROVERPHOTOS (
        SOL,
        CAMERA_NAME,
        IMG_SRC,
        EARTH_DATE,
        ROVER_NAME,
        ROVER_STATUS
    ) VALUES (
        _SOL,
        _CAMERA_NAME,
        _IMG_SRC,
        _EARTH_DATE,
        _ROVER_NAME,
        _ROVER_STATUS
    );
END;
$$ LANGUAGE PLPGSQL;
-- Define una función llamada INSERT_MARS_ROVER_PHOTO que inserta datos en la tabla MARSROVERPHOTOS utilizando los parámetros proporcionados.

-- Función para insertar datos en la tabla de EPIC
CREATE OR REPLACE FUNCTION NASA.INSERT_EPIC_IMAGE(
    _IMAGE_DATE DATE,
    _IMAGE_NAME VARCHAR,
    _CAPTION TEXT,
    _LATITUDE REAL,
    _LONGITUDE REAL,
    _DSV_DISTANCE REAL,
    _SUN_DISTANCE REAL
) RETURNS VOID AS
$$
BEGIN
    INSERT INTO NASA.EPIC_IMAGES (
        IMAGE_DATE,
        IMAGE_NAME,
        CAPTION,
        LATITUDE,
        LONGITUDE,
        DSV_DISTANCE,
        SUN_DISTANCE
    ) VALUES (
        _IMAGE_DATE,
        _IMAGE_NAME,
        _CAPTION,
        _LATITUDE,
        _LONGITUDE,
        _DSV_DISTANCE,
        _SUN_DISTANCE
    );
END;
$$ LANGUAGE PLPGSQL;
-- Define una función llamada INSERT_EPIC_IMAGE que inserta datos en la tabla EPIC_IMAGES utilizando los parámetros proporcionados.

-- Función para insertar datos en la tabla de Astronomía Diaria
CREATE OR REPLACE FUNCTION NASA.INSERT_DAILY_ASTRONOMY(
    _DATE DATE,
    _TITLE VARCHAR,
    _EXPLANATION TEXT,
    _URL TEXT
) RETURNS VOID AS
$$
BEGIN
    INSERT INTO NASA.DAILYASTRONOMY (
        DATE,
        TITLE,
        EXPLANATION,
        URL
    ) VALUES (
        _DATE,
        _TITLE,
        _EXPLANATION,
        _URL
    );
END;
$$ LANGUAGE PLPGSQL;
-- Define una función llamada INSERT_DAILY_ASTRONOMY que inserta datos en la tabla DAILYASTRONOMY utilizando los parámetros proporcionados.

-- Consultas a manera de reportes
-- Reporte de asteroides potencialmente peligrosos
CREATE OR REPLACE VIEW NASA.HAZARDOUS_ASTEROIDS AS
SELECT
    ID,
    NAME,
    MAGNITUDE,
    CLOSE_APPROACH_DATE,
    DISTANCE_KM,
    NASA_JPL_URL
FROM
    NASA.ASTEROIDS
WHERE
    IS_POTENTIALLY_HAZARDOUS = TRUE;
-- Crea una vista llamada HAZARDOUS_ASTEROIDS que selecciona y muestra datos de la tabla ASTEROIDS donde los asteroides son potencialmente peligrosos.

-- Reporte de fotos del rover en Marte con el estado del rover y datos meteorológicos
CREATE OR REPLACE VIEW NASA.MARS_ROVER_PHOTOS_WITH_STATUS AS
SELECT
    M.ID,
    M.SOL,
    M.CAMERA_NAME,
    M.IMG_SRC,
    M.EARTH_DATE,
    M.ROVER_NAME,
    M.ROVER_STATUS
FROM
    NASA.MARSROVERPHOTOS M;
-- Crea una vista llamada MARS_ROVER_PHOTOS_WITH_STATUS que selecciona y muestra datos de la tabla MARSROVERPHOTOS.

-- Reporte de entradas diarias de astronomía
CREATE OR REPLACE VIEW NASA.DAILY_ASTRONOMY_ENTRIES AS
SELECT
    ID,
    DATE,
    TITLE,
    EXPLANATION,
    URL
FROM
    NASA.DAILYASTRONOMY;
-- Crea una vista llamada DAILY_ASTRONOMY_ENTRIES que selecciona y muestra datos de la tabla DAILYASTRONOMY.