require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const { Pool } = require('pg');
const verifyToken = require('./controllers/verifyToken');
const app = express();
const port = process.env.PORT || 5100;

// Configurar CORS para permitir peticiones desde frontend
app.use(cors());
app.use(express.json({ limit: '2gb' }));

const dbName = process.env.DB_DATABASE;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;


/*
// Conexión a MySQL mantenida en index.js
const connection = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPass,
  database: dbName,
  port: dbPort
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
  } else {
    console.log('Conectado a MySQL');
  }
});
*/

// 🔄 Nueva conexión PostgreSQL
const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// 🔄 Test de conexión
connection.connect()
  .then(() => console.log('Conectado a PostgreSQL'))
  .catch(err => console.error('Error al conectar a PostgreSQL:', err));

// Rutas
const usuarioRoutes = require('./routes/userRoutes')(connection);
const adminRoutes = require("./routes/adminRoutes")(connection);
const coordRoutes = require("./routes/coordRoutes")(connection);
const equipoRoutes = require("./routes/equipoRoutes")(connection);

app.use("/admin",  adminRoutes);
app.use("/coord", coordRoutes);
app.use("/equipo", equipoRoutes);
app.use('/users', usuarioRoutes);

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
