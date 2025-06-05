-- Crear base de datos y usarla
CREATE DATABASE IF NOT EXISTS tesis;
USE tesis;

-- Tabla de roles
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

INSERT INTO roles (nombre) VALUES 
('Administrador'),  -- 1
('Coordinador'),    -- 2
('Equipo');         -- 3

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_completo VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    contrasena VARCHAR(255),
    rol_id INT,
    curso_id INT,
    FOREIGN KEY (rol_id) REFERENCES roles(id),
    FOREIGN KEY (curso_id) REFERENCES grados(id)
);

-- Tabla de grados
CREATE TABLE grados (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de proyectos
CREATE TABLE proyectos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    objetivos TEXT NOT NULL,
    actividades TEXT,
    responsable_id INT,
    curso_id INT NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    FOREIGN KEY (responsable_id) REFERENCES usuarios(id),
    FOREIGN KEY (curso_id) REFERENCES grados(id)
);

-- Tabla de equipos
CREATE TABLE equipos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    curso_id INT,
    nombre_equipo VARCHAR(100),
    FOREIGN KEY (curso_id) REFERENCES grados(id)
);

-- Tabla de relación entre usuarios y equipos
CREATE TABLE equipo_usuarios (
    equipo_id INT,
    usuario_id INT,
    PRIMARY KEY (equipo_id, usuario_id),
    FOREIGN KEY (equipo_id) REFERENCES equipos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de backlog educativo
CREATE TABLE backlog (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    descripcion TEXT,
    curso_id INT,
    creado_por INT,
    fecha_creacion DATE,
    proyecto_id INT,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id),
    FOREIGN KEY (curso_id) REFERENCES grados(id),
    FOREIGN KEY (creado_por) REFERENCES usuarios(id)
);

-- Tabla de sprints
CREATE TABLE sprints (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    fecha_inicio DATE,
    fecha_fin DATE,
    objetivo TEXT,
    curso_id INT,
    FOREIGN KEY (curso_id) REFERENCES grados(id)
);

-- Tabla de tareas Kanban
CREATE TABLE tareas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    descripcion TEXT,
    prioridad ENUM('alta', 'media', 'baja'),
    estado ENUM('Por hacer', 'En proceso', 'En revisión', 'Hecho') DEFAULT 'Por hacer',
    backlog_id INT,
    sprint_id INT,
    asignado_a INT,
    FOREIGN KEY (backlog_id) REFERENCES backlog(id),
    FOREIGN KEY (sprint_id) REFERENCES sprints(id),
    FOREIGN KEY (asignado_a) REFERENCES usuarios(id)
);

-- Tabla de reportes
CREATE TABLE reportes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sprint_id INT,
    equipo_id INT,
    entregables TEXT,
    indicadores TEXT,
    generado_por INT,
    fecha_generacion DATE,
    FOREIGN KEY (sprint_id) REFERENCES sprints(id),
    FOREIGN KEY (equipo_id) REFERENCES equipos(id),
    FOREIGN KEY (generado_por) REFERENCES usuarios(id)
);

-- Tabla de reuniones diarias (Dailys)
CREATE TABLE dailys (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE,
    usuario_id INT,
    ayer TEXT,
    avances TEXT,
    bloqueos TEXT,
    sprint_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (sprint_id) REFERENCES sprints(id)
);

-- Tabla de evaluaciones continuas
CREATE TABLE evaluaciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tarea_id INT,  -- Relacionamos la evaluación con una tarea del backlog
    usuario_id INT,
    nota DECIMAL(7,2),
    retroalimentacion TEXT,
    evaluado_por INT,
    fecha DATE,
    FOREIGN KEY (tarea_id) REFERENCES backlog(id),  -- Relacionada con la tabla tareas (backlog)
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (evaluado_por) REFERENCES usuarios(id)
);


-- Tabla de retrospectivas
CREATE TABLE retrospectivas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sprint_id INT,
    equipo_id INT,
    puntos_buenos TEXT,
    puntos_mejorar TEXT,
    acciones_mejora TEXT,
    fecha DATE,
    FOREIGN KEY (sprint_id) REFERENCES sprints(id),
    FOREIGN KEY (equipo_id) REFERENCES equipos(id)
);
