require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const verifyToken = require('./controllers/verifyToken');
const app = express();
const port = process.env.PORT || 5100;

// Configurar CORS para permitir peticiones desde frontend
app.use(cors());
app.use(express.json({ limit: '2gb' }));

// Variables de entorno para PostgreSQL
const databaseUrl = process.env.DATABASE_URL;
const nodeEnv = process.env.NODE_ENV;

// Script SQL de inicialización (el archivo completo como string)
const initSQL = `
-- PostgreSQL conversion from MySQL dump
-- Database: tesis
-- Converted on: 2025-07-02

-- Enable UUID extension if needed
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS evaluaciones CASCADE;
DROP TABLE IF EXISTS retrospectivas CASCADE;
DROP TABLE IF EXISTS dailys CASCADE;
DROP TABLE IF EXISTS tareas CASCADE;
DROP TABLE IF EXISTS backlog CASCADE;
DROP TABLE IF EXISTS usuario_grado CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS sprints CASCADE;
DROP TABLE IF EXISTS proyectos CASCADE;
DROP TABLE IF EXISTS grados CASCADE;

--
-- Table structure for table roles
--
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

--
-- Table structure for table grados
--
CREATE TABLE grados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

--
-- Table structure for table usuarios
--
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    contrasena VARCHAR(255),
    rol_id INTEGER REFERENCES roles(id),
    curso_id INTEGER REFERENCES grados(id)
);

--
-- Table structure for table proyectos
--
CREATE TABLE proyectos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    objetivos TEXT NOT NULL,
    actividades TEXT,
    responsable_id INTEGER REFERENCES usuarios(id),
    curso_id INTEGER NOT NULL REFERENCES grados(id),
    fecha_inicio DATE,
    fecha_fin DATE
);

--
-- Table structure for table backlog
--
CREATE TABLE backlog (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100),
    descripcion TEXT,
    curso_id INTEGER REFERENCES grados(id),
    creado_por INTEGER REFERENCES usuarios(id),
    fecha_creacion DATE,
    proyecto_id INTEGER REFERENCES proyectos(id)
);

--
-- Table structure for table sprints
--
CREATE TABLE sprints (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    fecha_inicio DATE,
    fecha_fin DATE,
    objetivo TEXT,
    curso_id INTEGER REFERENCES grados(id)
);

--
-- Table structure for table tareas
--
CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100),
    descripcion TEXT,
    prioridad VARCHAR(10) CHECK (prioridad IN ('alta', 'media', 'baja')),
    estado VARCHAR(20) CHECK (estado IN ('Por hacer', 'En proceso', 'En revisión', 'Hecho', 'Culminado')) DEFAULT 'Por hacer',
    backlog_id INTEGER REFERENCES backlog(id),
    sprint_id INTEGER REFERENCES sprints(id),
    asignado_a INTEGER REFERENCES usuarios(id)
);

--
-- Table structure for table dailys
--
CREATE TABLE dailys (
    id SERIAL PRIMARY KEY,
    fecha DATE,
    usuario_id INTEGER REFERENCES usuarios(id),
    ayer TEXT,
    avances TEXT,
    bloqueos TEXT,
    sprint_id INTEGER REFERENCES sprints(id)
);

--
-- Table structure for table evaluaciones
--
CREATE TABLE evaluaciones (
    id SERIAL PRIMARY KEY,
    tarea_id INTEGER REFERENCES backlog(id),
    usuario_id INTEGER REFERENCES usuarios(id),
    nota DECIMAL(7,2),
    retroalimentacion TEXT,
    evaluado_por INTEGER REFERENCES usuarios(id),
    fecha DATE
);

--
-- Table structure for table retrospectivas
--
CREATE TABLE retrospectivas (
    id SERIAL PRIMARY KEY,
    sprint_id INTEGER REFERENCES sprints(id),
    usuario_id INTEGER REFERENCES usuarios(id),
    puntos_buenos TEXT,
    puntos_mejorar TEXT,
    acciones_mejora TEXT,
    fecha DATE
);

--
-- Table structure for table usuario_grado
--
CREATE TABLE usuario_grado (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    grado_id INTEGER REFERENCES grados(id)
);

-- Insert data for roles
INSERT INTO roles (id, nombre) VALUES 
(1, 'Administrador'),
(2, 'Coordinador'),
(3, 'Equipo');

-- Reset sequence for roles
SELECT setval('roles_id_seq', (SELECT MAX(id) FROM roles));

-- Insert data for grados (using negative IDs as in original)
-- First, allow negative values by altering the sequence
ALTER SEQUENCE grados_id_seq RESTART WITH -4;

INSERT INTO grados (id, nombre) VALUES 
(-4, 'Pre Primaria'),
(-3, 'Primaria'),
(-2, 'Básico'),
(-1, 'Bachillerato');

-- Reset sequence to positive values for future inserts
SELECT setval('grados_id_seq', 1);

-- Insert data for usuarios
INSERT INTO usuarios (id, nombre_completo, correo, contrasena, rol_id, curso_id) VALUES 
(4, 'Admin Ejemplo', 'admin@demo.com', '$2b$10$1H/tmzsQar.VTLL7CZLCYOvgv19su0.b75hfiXScYMlPD7DLjhmiy', 1, NULL),
(5, 'Coordinador Ejemplo', 'coord@demo.com', '$2b$10$OZZBc6psHTqlxC5YNyebcu/V5fdO0xR1sj9mt36MV.Aj6MECZyOlu', 2, NULL),
(6, 'Equipo Ejemplo', 'equipo@demo.com', '$2b$10$OuYKatAGbLk.pM0QTztVcuyc7QghpUE66baGuk7cEYxZQKxIAsdNu', 3, NULL);

-- Reset sequence for usuarios
SELECT setval('usuarios_id_seq', (SELECT MAX(id) FROM usuarios));

-- Insert data for proyectos
INSERT INTO proyectos (id, nombre, objetivos, actividades, responsable_id, curso_id, fecha_inicio, fecha_fin) VALUES 
(1, 'Proyecto de Ciencias Naturales', 'Desarrollar competencias científicas básicas a través de experimentos prácticos y observación del entorno natural', NULL, 5, -3, '2025-01-15', '2025-03-15'),
(2, 'Proyecto de Matemáticas Aplicadas', 'Fortalecer el pensamiento lógico-matemático mediante la resolución de problemas del contexto real', NULL, 5, -1, '2025-01-20', '2025-03-20');

-- Reset sequence for proyectos
SELECT setval('proyectos_id_seq', (SELECT MAX(id) FROM proyectos));

-- Insert data for backlog
INSERT INTO backlog (id, titulo, descripcion, curso_id, creado_por, fecha_creacion, proyecto_id) VALUES 
(1, 'Sistema Solar y Planetas', 'Investigar y crear maquetas del sistema solar identificando características de cada planeta', -3, 5, '2025-06-14', 1),
(2, 'Ciclo del Agua', 'Experimentar y documentar las fases del ciclo del agua mediante actividades prácticas', -3, 5, '2025-06-14', 1),
(3, 'Plantas y Animales del Entorno', 'Plantas y Animales del Entorno', -3, 5, '2025-06-14', 1),
(4, 'Estadística en el Deporte', 'Analizar datos estadísticos de equipos deportivos y crear gráficos predictivos', -1, 5, '2025-06-14', 2),
(5, 'Geometría en Arquitectura', 'Aplicar conceptos geométricos en el diseño de estructuras arquitectónicas sostenibles', -1, 5, '2025-06-14', 2),
(6, 'Álgebra Financiera', 'Resolver problemas de interés compuesto, préstamos e inversiones del mundo real', -1, 5, '2025-06-14', 2);

-- Reset sequence for backlog
SELECT setval('backlog_id_seq', (SELECT MAX(id) FROM backlog));

-- Insert data for sprints
INSERT INTO sprints (id, nombre, fecha_inicio, fecha_fin, objetivo, curso_id) VALUES 
(1, 'Sprint 1 - Primaria', '2025-01-15', '2025-01-29', 'Completar investigación y diseño del sistema solar', -3),
(2, 'Sprint 2 - Primaria', '2025-01-30', '2025-02-13', 'Desarrollar experimentos del ciclo del agua', -3),
(3, 'Sprint 3 - Primaria', '2025-02-14', '2025-02-28', 'Crear herbario y catálogo de especies locales', -3),
(4, 'Sprint 1 - Bachillerato', '2025-01-20', '2025-02-03', 'Recolectar y analizar datos deportivos', -1),
(5, 'Sprint 2 - Bachillerato', '2025-02-04', '2025-02-18', 'Diseñar estructuras geométricas sostenibles', -1),
(6, 'Sprint 3 - Bachillerato', '2025-02-19', '2025-03-05', 'Resolver casos de álgebra financiera', -1);

-- Reset sequence for sprints
SELECT setval('sprints_id_seq', (SELECT MAX(id) FROM sprints));

-- Insert data for tareas
INSERT INTO tareas (id, titulo, descripcion, prioridad, estado, backlog_id, sprint_id, asignado_a) VALUES 
(1, 'Investigar características de planetas rocosos', 'Buscar información sobre Mercurio, Venus, Tierra y Marte', 'alta', 'Por hacer', 1, 1, NULL),
(3, 'Diseñar maqueta del sistema solar', 'Crear boceto y seleccionar materiales para la maqueta', 'media', 'En proceso', 1, 1, NULL),
(6, 'Experimento de evaporación', 'Diseñar y ejecutar experimento para observar evaporación', 'alta', 'Por hacer', 2, 2, NULL),
(8, 'Documentar precipitación', 'Registrar y medir precipitaciones durante una semana', 'media', 'En proceso', 2, 2, NULL),
(9, 'Recolectar muestras de plantas', 'Recoger 10 especies diferentes del entorno escolar', 'alta', 'Hecho', 3, 3, NULL),
(10, 'Prensar y secar plantas', 'Preparar las muestras para el herbario', 'baja', 'Por hacer', 3, 3, NULL),
(11, 'Recolectar datos del equipo local', 'Obtener estadísticas de rendimiento del último año', 'alta', 'Por hacer', 4, 4, NULL),
(12, 'Crear gráficos de tendencias', 'Diseñar gráficos de barras y líneas con los datos', 'media', 'En proceso', 4, 4, NULL),
(13, 'Diseñar planos básicos', 'Crear planos 2D usando figuras geométricas', 'alta', 'En proceso', 5, 5, NULL),
(14, 'Calcular áreas y volúmenes', 'Aplicar fórmulas geométricas a la estructura', 'media', 'Por hacer', 5, 5, NULL),
(15, 'Resolver casos de interés simple', 'Calcular intereses en diferentes escenarios', 'media', 'En proceso', 6, 6, NULL),
(16, 'Analizar interés compuesto', 'Trabajar con capitalización y períodos', 'baja', 'Hecho', 6, 6, NULL);

-- Reset sequence for tareas
SELECT setval('tareas_id_seq', (SELECT MAX(id) FROM tareas));

-- Insert data for dailys
INSERT INTO dailys (id, fecha, usuario_id, ayer, avances, bloqueos, sprint_id) VALUES 
(1, '2025-01-22', 6, 'Terminé de investigar sobre los planetas rocosos (Mercurio, Venus, Tierra y Marte). Encontré información muy interesante sobre las temperaturas y encontré buenas imágenes para usar en la maqueta.', 'Voy a empezar a investigar sobre los planetas gaseosos, especialmente Júpiter y Saturno. También quiero comenzar a hacer el boceto de cómo se verá nuestra maqueta del sistema solar.', 'No tengo problemas por ahora, pero creo que necesitaremos pelotas de diferentes tamaños para representar los planetas en la maqueta. ¿Podemos conseguir esferas de foam?', 1),
(2, '2025-01-28', 6, 'Recopilé todas las estadísticas del equipo de fútbol de la escuela del último semestre. Tengo datos de goles, asistencias, tarjetas y porcentaje de victorias de 15 partidos.', 'Voy a organizar todos los datos en una hoja de cálculo y comenzar a crear los primeros gráficos de barras para mostrar el rendimiento por jugador.', 'Sí, necesito ayuda para entender cómo calcular la media móvil en Excel. También me falta conseguir los datos de los últimos 3 partidos que no estaban en los archivos del colegio.', 4);

-- Reset sequence for dailys
SELECT setval('dailys_id_seq', (SELECT MAX(id) FROM dailys));

-- Insert data for evaluaciones
INSERT INTO evaluaciones (id, tarea_id, usuario_id, nota, retroalimentacion, evaluado_por, fecha) VALUES 
(1, 1, 5, 95.00, '¡Excelente trabajo ! Tu investigación sobre los planetas fue muy completa y me impresionó la creatividad de tu maqueta. Destacó especialmente que incluyeras datos sobre la temperatura y el tamaño de cada planeta. La presentación fue clara y se nota que realmente aprendiste. Fortalezas: Investigación detallada, maqueta bien elaborada, buena presentación oral. Aspectos a mejorar: Te sugiero mejorar la escala de la maqueta - algunos planetas quedaron muy grandes en comparación con otros. Para el próximo proyecto, podríamos usar una regla de proporción. Próximos pasos: Tu curiosidad por la astronomía es evidente. Te recomiendo investigar sobre las lunas de los planetas para ampliar tu conocimiento.', 5, '2025-06-14'),
(2, 2, 5, 65.00, 'Buen trabajo. Tus experimentos demostraron comprensión del ciclo del agua y siguiste correctamente las instrucciones. Fortalezas: Experimentos bien ejecutados, buena observación de los procesos, diario de experimentos ordenado. Aspectos a mejorar: El informe final necesita más explicación científica sobre POR QUÉ ocurre cada proceso. Por ejemplo, explica por qué el agua se evapora cuando se calienta. Las conclusiones fueron muy breves. Próximos pasos: Te sugiero practicar la escritura de explicaciones más detalladas. Para el siguiente proyecto, incluye hipótesis antes de hacer los experimentos. Tu capacidad de observación es muy buena, ahora desarrollemos el análisis.', 5, '2025-06-14'),
(3, 4, 5, 55.00, '', 5, '2025-06-14'),
(4, 5, 5, 75.00, 'Buen proyecto arquitectónico,. Tu diseño es creativo y los cálculos geométricos son correctos en su mayoría. Fortalezas: Diseño innovador y estéticamente atractivo, maqueta bien construida, aplicación correcta de fórmulas de área y perímetro, consideración de aspectos sostenibles. Aspectos a mejorar: 1) Revisa el cálculo del volumen del segundo piso - hay un error en la fórmula aplicada. 2) La justificación de por qué elegiste ciertas formas geométricas necesita más desarrollo. 3) El análisis de sostenibilidad fue superficial - profundiza en materiales específicos y su impacto. Próximos pasos: Tu habilidad espacial es excelente. Te sugiero estudiar arquitectura bioclimática y explorar software de diseño 3D como SketchUp para futuros proyectos.', 5, '2025-06-14'),
(5, 6, 5, 75.00, 'Has progresado mucho en comprensión financiera. Tus cálculos de interés simple son perfectos y muestras buena comprensión de los conceptos básicos. Fortalezas: Dominio completo de interés simple, buena organización de los problemas, casos de estudio realistas y bien planteados. Aspectos a mejorar: 1) El interés compuesto aún te genera confusión - practiquemos más la fórmula A = P(1+r)^t. 2) En la simulación de préstamos, no consideraste comisiones ni seguros. 3) Tu plan de inversión necesita incluir riesgo y diversificación. Plan de apoyo: Te programo una sesión extra esta semana para repasar interés compuesto. También te daré ejercicios adicionales con calculadora financiera. Próximos pasos: Una vez domines estos conceptos, podemos avanzar a anualidades y evaluación de proyectos de inversión.', 5, '2025-06-14'),
(6, 3, 5, 75.50, '', 5, '2025-06-14');

-- Reset sequence for evaluaciones
SELECT setval('evaluaciones_id_seq', (SELECT MAX(id) FROM evaluaciones));

-- Insert data for retrospectivas
INSERT INTO retrospectivas (id, sprint_id, usuario_id, puntos_buenos, puntos_mejorar, acciones_mejora, fecha) VALUES 
(1, 1, 6, 'Me gustó mucho trabajar en equipo para investigar. Cada uno investigó planetas diferentes y luego compartimos lo que aprendimos. La información que encontramos fue muy completa y aprendí cosas que no sabía, como que Venus es más caliente que Mercurio aunque esté más lejos del Sol. El tiempo que tuvimos fue suficiente para hacer una buena investigación.', 'Creo que deberíamos haber planificado mejor qué materiales necesitábamos desde el principio. Perdimos tiempo buscando las esferas y la pintura. También sería bueno tener más computadoras disponibles porque a veces tuvimos que esperar para buscar información.', 'Para el siguiente Sprint vamos a hacer una lista de materiales el primer día y pedirlos inmediatamente. También vamos a dividir mejor las tareas para que cada uno sepa exactamente qué debe hacer cada día.', '2025-01-29'),
(2, 5, 6, 'La recolección de datos fue más fácil de lo que pensaba. El entrenador y la secretaría del colegio fueron muy colaborativos. Los gráficos quedaron muy profesionales y realmente muestran tendencias interesantes sobre el rendimiento del equipo. Me sorprendió descubrir que nuestro equipo tiene mejor rendimiento en la segunda mitad de los partidos.', 'Debería haber aprendido mejor a usar Excel antes de empezar. Perdí mucho tiempo tratando de hacer fórmulas que al final tuve que buscar en YouTube. También creo que necesitamos más tiempo para interpretar los resultados, no solo para crear más gráficos.', 'Voy a tomar un tutorial completo de Excel antes del próximo proyecto. También vamos a dedicar los últimos dos días de cada Sprint solo para analizar e interpretar los resultados, no para crear más gráficos. Vamos a pedir ayuda al coordinador si no entendemos algún concepto estadístico.', '2025-02-03');

-- Reset sequence for retrospectivas
SELECT setval('retrospectivas_id_seq', (SELECT MAX(id) FROM retrospectivas));

-- Insert data for usuario_grado
INSERT INTO usuario_grado (id, usuario_id, grado_id) VALUES 
(1, 6, -1),
(2, 6, -3);

-- Reset sequence for usuario_grado
SELECT setval('usuario_grado_id_seq', (SELECT MAX(id) FROM usuario_grado));

-- Create indexes for better performance (optional)
CREATE INDEX idx_usuarios_correo ON usuarios(correo);
CREATE INDEX idx_backlog_proyecto_id ON backlog(proyecto_id);
CREATE INDEX idx_tareas_backlog_id ON tareas(backlog_id);
CREATE INDEX idx_tareas_sprint_id ON tareas(sprint_id);
CREATE INDEX idx_evaluaciones_tarea_id ON evaluaciones(tarea_id);
CREATE INDEX idx_dailys_sprint_id ON dailys(sprint_id);
CREATE INDEX idx_retrospectivas_sprint_id ON retrospectivas(sprint_id);
`;

// 🔄 Nueva conexión PostgreSQL
const pool = new Pool({
  connectionString: databaseUrl,
  ssl: nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // máximo número de conexiones en el pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Función para inicializar la base de datos
async function initializeDatabase() {
  try {
    console.log('Iniciando configuración de la base de datos...');
    
    // Ejecutar el script de inicialización
    await pool.query(initSQL);
    
    console.log('✅ Base de datos inicializada correctamente con PostgreSQL');
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
    // No terminar el proceso, solo mostrar el error
  }
}

// 🔄 Test de conexión y configuración de la base de datos
pool.connect()
  .then(async (client) => {
    console.log('✅ Conectado a PostgreSQL');
    client.release(); // liberar el cliente de vuelta al pool
    
    // Ejecutar la inicialización de la base de datos
    await initializeDatabase();
  })
  .catch((err) => {
    console.error('❌ Error al conectar a PostgreSQL:', err);
  });

// Middleware para pasar el pool a las rutas
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Rutas (actualizadas para usar pool en lugar de connection)
const usuarioRoutes = require('./routes/userRoutes')(pool);
const adminRoutes = require("./routes/adminRoutes")(pool);
const coordRoutes = require("./routes/coordRoutes")(pool);
const equipoRoutes = require("./routes/equipoRoutes")(pool);

app.use("/admin", adminRoutes);
app.use("/coord", coordRoutes);
app.use("/equipo", equipoRoutes);
app.use('/users', usuarioRoutes);

// Ruta de estado para verificar la conexión
app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      status: 'ok', 
      database: 'connected',
      timestamp: result.rows[0].now 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      database: 'disconnected',
      error: error.message 
    });
  }
});

// Manejar el cierre elegante de la aplicación
process.on('SIGINT', async () => {
  console.log('Cerrando conexiones de la base de datos...');
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Cerrando conexiones de la base de datos...');
  await pool.end();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`🚀 El servidor está corriendo en el puerto ${port}`);
});