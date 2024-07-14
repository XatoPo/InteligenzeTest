-- Crear la base de datos
CREATE DATABASE NASA_INTELIGENZE;

-- Conectar a la base de datos
\C NASA_INTELIGENZE;

-- Al ejecutar el script desde pgAdmin4 tuve que eliminar las dos lineas anteriores
-------------------------------------------------------------------------------------------------------------------------------------------------

-- Crear el esquema para mantener la organización
CREATE SCHEMA IF NOT EXISTS NASA;

-- Tabla de Asteroides
CREATE TABLE NASA.ASTEROIDS (
    ID SERIAL PRIMARY KEY, -- Identificador único para cada asteroide
    NAME VARCHAR(255) NOT NULL, -- Nombre del asteroide
    MAGNITUDE REAL NOT NULL, -- Magnitud del asteroide
    IS_POTENTIALLY_HAZARDOUS BOOLEAN NOT NULL, -- Indica si el asteroide es potencialmente peligroso
    CLOSE_APPROACH_DATE DATE NOT NULL, -- Fecha de aproximación cercana
    DISTANCE_KM REAL NOT NULL, -- Distancia en kilómetros
    NASA_JPL_URL TEXT -- URL con más información del asteroide en el sitio de la NASA
);

-- Tabla de Fotos del Rover en Marte
CREATE TABLE NASA.MARSROVERPHOTOS ( ID SERIAL PRIMARY KEY, -- Identificador único para cada foto
SOL INT NOT NULL, -- Día marciano (sol)
CAMERA_NAME VARCHAR(255) NOT NULL, -- Nombre de la cámara que tomó la foto
IMG_SRC TEXT NOT NULL, -- URL de la imagen
EARTH_DATE DATE NOT NULL, -- Fecha en la Tierra
ROVER_NAME VARCHAR(255) NOT NULL, -- Nombre del rover que tomó la foto
ASSOCIATED_ASTEROID_ID INT, -- Referencia a un asteroide relacionado
FOREIGN KEY (ASSOCIATED_ASTEROID_ID) REFERENCES NASA.ASTEROIDS(ID) -- Clave foránea
);

-- Tabla de Exoplanetas
CREATE TABLE NASA.EXOPLANETS ( ID SERIAL PRIMARY KEY, -- Identificador único para cada exoplaneta
NAME VARCHAR(255) NOT NULL, -- Nombre del exoplaneta
HOST_STAR VARCHAR(255) NOT NULL, -- Estrella anfitriona del exoplaneta
DISCOVERY_METHOD VARCHAR(255) NOT NULL, -- Método de descubrimiento
DISCOVERY_YEAR INT NOT NULL, -- Año de descubrimiento
ORBITAL_PERIOD REAL, -- Período orbital en días
RADIUS_EARTH REAL, -- Radio del exoplaneta en comparación con la Tierra
DISTANCE_PARSECS REAL, -- Distancia en parsecs
RELATED_ASTEROID_ID INT, -- Referencia a un asteroide relacionado
FOREIGN KEY (RELATED_ASTEROID_ID) REFERENCES NASA.ASTEROIDS(ID) -- Clave foránea
);

-- Tabla de Astronomía Diaria
CREATE TABLE NASA.DAILYASTRONOMY ( ID SERIAL PRIMARY KEY, -- Identificador único para cada entrada diaria
DATE DATE NOT NULL, -- Fecha de la entrada
TITLE VARCHAR(255) NOT NULL, -- Título de la entrada
EXPLANATION TEXT NOT NULL, -- Explicación de la entrada
URL TEXT NOT NULL -- URL de la imagen o vídeo
);

-------------------------------------------------------------------------------------------------------------------------------------------------

-- Función para insertar datos en la tabla de Asteroides
CREATE OR REPLACE FUNCTION NASA.INSERT_ASTEROID(
    _NAME VARCHAR,
    _MAGNITUDE REAL,
    _IS_POTENTIALLY_HAZARDOUS BOOLEAN,
    _CLOSE_APPROACH_DATE DATE,
    _DISTANCE_KM REAL,
    _NASA_JPL_URL TEXT
) RETURNS VOID AS
    $$     BEGIN INSERT INTO NASA.ASTEROIDS (
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
$$     LANGUAGE PLPGSQL;

-- Función para seleccionar todos los datos de la tabla de Asteroides
CREATE OR REPLACE

FUNCTION NASA.SELECT_ALL_ASTEROIDS(
) RETURNS TABLE( ID INT, NAME VARCHAR, MAGNITUDE REAL, IS_POTENTIALLY_HAZARDOUS BOOLEAN, CLOSE_APPROACH_DATE DATE, DISTANCE_KM REAL, NASA_JPL_URL TEXT) AS
    $$     BEGIN RETURN QUERY
    SELECT
        *
    FROM
        NASA.ASTEROIDS;
END;
$$     LANGUAGE PLPGSQL;

-- Función para insertar datos en la tabla de Fotos del Rover en Marte
CREATE OR REPLACE

FUNCTION NASA.INSERT_MARS_ROVER_PHOTO(
    _SOL INT,
    _CAMERA_NAME VARCHAR,
    _IMG_SRC TEXT,
    _EARTH_DATE DATE,
    _ROVER_NAME VARCHAR,
    _ASSOCIATED_ASTEROID_ID INT
) RETURNS VOID AS
    $$     BEGIN INSERT INTO NASA.MARSROVERPHOTOS (
        SOL,
        CAMERA_NAME,
        IMG_SRC,
        EARTH_DATE,
        ROVER_NAME,
        ASSOCIATED_ASTEROID_ID
    ) VALUES (
        _SOL,
        _CAMERA_NAME,
        _IMG_SRC,
        _EARTH_DATE,
        _ROVER_NAME,
        _ASSOCIATED_ASTEROID_ID
    );
END;
$$     LANGUAGE PLPGSQL;

-- Función para seleccionar todas las fotos del rover en Marte
CREATE OR REPLACE

FUNCTION NASA.SELECT_ALL_MARS_ROVER_PHOTOS(
) RETURNS TABLE( ID INT, SOL INT, CAMERA_NAME VARCHAR, IMG_SRC TEXT, EARTH_DATE DATE, ROVER_NAME VARCHAR, ASSOCIATED_ASTEROID_ID INT) AS
    $$     BEGIN RETURN QUERY
    SELECT
        *
    FROM
        NASA.MARSROVERPHOTOS;
END;
$$     LANGUAGE PLPGSQL;

-- Función para insertar datos en la tabla de Exoplanetas
CREATE OR REPLACE

FUNCTION NASA.INSERT_EXOPLANET(
    _NAME VARCHAR,
    _HOST_STAR VARCHAR,
    _DISCOVERY_METHOD VARCHAR,
    _DISCOVERY_YEAR INT,
    _ORBITAL_PERIOD REAL,
    _RADIUS_EARTH REAL,
    _DISTANCE_PARSECS REAL,
    _RELATED_ASTEROID_ID INT
) RETURNS VOID AS
    $$     BEGIN INSERT INTO NASA.EXOPLANETS (
        NAME,
        HOST_STAR,
        DISCOVERY_METHOD,
        DISCOVERY_YEAR,
        ORBITAL_PERIOD,
        RADIUS_EARTH,
        DISTANCE_PARSECS,
        RELATED_ASTEROID_ID
    ) VALUES (
        _NAME,
        _HOST_STAR,
        _DISCOVERY_METHOD,
        _DISCOVERY_YEAR,
        _ORBITAL_PERIOD,
        _RADIUS_EARTH,
        _DISTANCE_PARSECS,
        _RELATED_ASTEROID_ID
    );
END;
$$     LANGUAGE PLPGSQL;

-- Función para seleccionar todos los datos de la tabla de Exoplanetas
CREATE OR REPLACE

FUNCTION NASA.SELECT_ALL_EXOPLANETS(
) RETURNS TABLE( ID INT, NAME VARCHAR, HOST_STAR VARCHAR, DISCOVERY_METHOD VARCHAR, DISCOVERY_YEAR INT, ORBITAL_PERIOD REAL, RADIUS_EARTH REAL, DISTANCE_PARSECS REAL, RELATED_ASTEROID_ID INT) AS
    $$     BEGIN RETURN QUERY
    SELECT
        *
    FROM
        NASA.EXOPLANETS;
END;
$$     LANGUAGE PLPGSQL;

-- Función para insertar datos en la tabla de Astronomía Diaria
CREATE OR REPLACE

FUNCTION NASA.INSERT_DAILY_ASTRONOMY(
    _DATE DATE,
    _TITLE VARCHAR,
    _EXPLANATION TEXT,
    _URL TEXT
) RETURNS VOID AS
    $$     BEGIN INSERT INTO NASA.DAILYASTRONOMY (
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
$$     LANGUAGE PLPGSQL;

-- Función para seleccionar todas las entradas diarias de astronomía
CREATE OR REPLACE

FUNCTION NASA.SELECT_ALL_DAILY_ASTRONOMY(
) RETURNS TABLE( ID INT, DATE DATE, TITLE VARCHAR, EXPLANATION TEXT, URL TEXT) AS
    $$     BEGIN RETURN QUERY
    SELECT
        *
    FROM
        NASA.DAILYASTRONOMY;
END;
$$     LANGUAGE PLPGSQL;

-------------------------------------------------------------------------------------------------------------------------------------------------

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

-- Reporte de fotos del rover en Marte relacionadas con asteroides
CREATE OR REPLACE VIEW NASA.MARS_ROVER_PHOTOS_WITH_ASTEROIDS AS
SELECT
    M.ID,
    M.SOL,
    M.CAMERA_NAME,
    M.IMG_SRC,
    M.EARTH_DATE,
    M.ROVER_NAME,
    A.NAME AS ASTEROID_NAME
FROM
    NASA.MARSROVERPHOTOS M
    JOIN NASA.ASTEROIDS A
    ON M.ASSOCIATED_ASTEROID_ID = A.ID;

-- Reporte de exoplanetas descubiertos por año
CREATE OR REPLACE VIEW NASA.EXOPLANETS_DISCOVERED_BY_YEAR AS
SELECT
    DISCOVERY_YEAR,
    COUNT(*) AS NUMBER_OF_EXOPLANETS
FROM
    NASA.EXOPLANETS
GROUP BY
    DISCOVERY_YEAR
ORDER BY
    DISCOVERY_YEAR;