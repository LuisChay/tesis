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

-- Tabla de asignación de usuarios a grados
CREATE TABLE usuario_grado (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    grado_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (grado_id) REFERENCES grados(id)
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
    estado ENUM('Por hacer', 'En proceso', 'En revisión', 'Hecho', 'Culminado')DEFAULT 'Por hacer',
    backlog_id INT,
    sprint_id INT,
    asignado_a INT,
    FOREIGN KEY (backlog_id) REFERENCES backlog(id),
    FOREIGN KEY (sprint_id) REFERENCES sprints(id),
    FOREIGN KEY (asignado_a) REFERENCES usuarios(id)
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

--  Tabla de retrospectivas
CREATE TABLE retrospectivas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sprint_id INT,
    usuario_id INT,
    puntos_buenos TEXT,
    puntos_mejorar TEXT,
    acciones_mejora TEXT,
    fecha DATE,
    FOREIGN KEY (sprint_id) REFERENCES sprints(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
