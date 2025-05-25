CREATE DATABASE tesis;
USE tesis;

-- Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    contrasena VARCHAR(255),
    rol ENUM('administrador', 'docente') NOT NULL
);

-- Proyectos educativos
CREATE TABLE proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150),
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    objetivo TEXT,
    creado_por INT,
    FOREIGN KEY (creado_por) REFERENCES usuarios(id)
);

-- Equipos de trabajo
CREATE TABLE equipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    grado_academico VARCHAR(50),
    proyecto_id INT,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
);

-- Miembros del equipo (usuarios asociados a equipos)
CREATE TABLE equipo_usuarios (
    equipo_id INT,
    usuario_id INT,
    rol_equipo ENUM('scrum_master', 'product_owner', 'desarrollador'),
    PRIMARY KEY (equipo_id, usuario_id),
    FOREIGN KEY (equipo_id) REFERENCES equipos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Backlog educativo
CREATE TABLE backlog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150),
    descripcion TEXT,
    prioridad ENUM('alta', 'media', 'baja'),
    categoria ENUM('investigacion', 'actividad', 'evaluacion'),
    estado ENUM('por_hacer', 'en_proceso', 'en_revision', 'hecho') DEFAULT 'por_hacer',
    fecha_entrega DATE,
    responsable_id INT,
    proyecto_id INT,
    FOREIGN KEY (responsable_id) REFERENCES usuarios(id),
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
);

-- Sprints
CREATE TABLE sprints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT,
    fecha_inicio DATE,
    fecha_fin DATE,
    meta TEXT,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
);

-- Tareas asociadas al Sprint
CREATE TABLE sprint_tareas (
    sprint_id INT,
    backlog_id INT,
    PRIMARY KEY (sprint_id, backlog_id),
    FOREIGN KEY (sprint_id) REFERENCES sprints(id),
    FOREIGN KEY (backlog_id) REFERENCES backlog(id)
);

-- Dailys
CREATE TABLE dailys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sprint_id INT,
    usuario_id INT,
    fecha DATE,
    hecho_ayer TEXT,
    por_hacer_hoy TEXT,
    impedimentos TEXT,
    FOREIGN KEY (sprint_id) REFERENCES sprints(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Evaluaciones continuas
CREATE TABLE evaluaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sprint_id INT,
    usuario_id INT,
    retroalimentacion TEXT,
    nota DECIMAL(4,2),
    FOREIGN KEY (sprint_id) REFERENCES sprints(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Retrospectivas
CREATE TABLE retrospectivas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sprint_id INT,
    aspectos_positivos TEXT,
    aspectos_a_mejorar TEXT,
    acciones_mejora TEXT,
    FOREIGN KEY (sprint_id) REFERENCES sprints(id)
);

-- Reportes
CREATE TABLE reportes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sprint_id INT,
    equipo_id INT,
    contenido TEXT,
    fecha_generado DATE,
    FOREIGN KEY (sprint_id) REFERENCES sprints(id),
    FOREIGN KEY (equipo_id) REFERENCES equipos(id)
);
