-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tesis
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `backlog`
--

DROP TABLE IF EXISTS `backlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backlog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `curso_id` int DEFAULT NULL,
  `creado_por` int DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `proyecto_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `curso_id` (`curso_id`),
  KEY `creado_por` (`creado_por`),
  KEY `fk_proyecto_id` (`proyecto_id`),
  CONSTRAINT `backlog_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `grados` (`id`),
  CONSTRAINT `backlog_ibfk_2` FOREIGN KEY (`creado_por`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_proyecto_id` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backlog`
--

LOCK TABLES `backlog` WRITE;
/*!40000 ALTER TABLE `backlog` DISABLE KEYS */;
INSERT INTO `backlog` VALUES (1,'Sistema Solar y Planetas','Investigar y crear maquetas del sistema solar identificando características de cada planeta',-3,5,'2025-06-14',1),(2,'Ciclo del Agua','Experimentar y documentar las fases del ciclo del agua mediante actividades prácticas',-3,5,'2025-06-14',1),(3,'Plantas y Animales del Entorno','Plantas y Animales del Entorno',-3,5,'2025-06-14',1),(4,'Estadística en el Deporte','Analizar datos estadísticos de equipos deportivos y crear gráficos predictivos',-1,5,'2025-06-14',2),(5,'Geometría en Arquitectura','Aplicar conceptos geométricos en el diseño de estructuras arquitectónicas sostenibles',-1,5,'2025-06-14',2),(6,'Álgebra Financiera','Resolver problemas de interés compuesto, préstamos e inversiones del mundo real',-1,5,'2025-06-14',2);
/*!40000 ALTER TABLE `backlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dailys`
--

DROP TABLE IF EXISTS `dailys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dailys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  `ayer` text,
  `avances` text,
  `bloqueos` text,
  `sprint_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `sprint_id` (`sprint_id`),
  CONSTRAINT `dailys_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `dailys_ibfk_2` FOREIGN KEY (`sprint_id`) REFERENCES `sprints` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dailys`
--

LOCK TABLES `dailys` WRITE;
/*!40000 ALTER TABLE `dailys` DISABLE KEYS */;
INSERT INTO `dailys` VALUES (1,'2025-01-22',6,'Terminé de investigar sobre los planetas rocosos (Mercurio, Venus, Tierra y Marte). Encontré información muy interesante sobre las temperaturas y encontré buenas imágenes para usar en la maqueta.','Voy a empezar a investigar sobre los planetas gaseosos, especialmente Júpiter y Saturno. También quiero comenzar a hacer el boceto de cómo se verá nuestra maqueta del sistema solar.','No tengo problemas por ahora, pero creo que necesitaremos pelotas de diferentes tamaños para representar los planetas en la maqueta. ¿Podemos conseguir esferas de foam?',1),(2,'2025-01-28',6,'Recopilé todas las estadísticas del equipo de fútbol de la escuela del último semestre. Tengo datos de goles, asistencias, tarjetas y porcentaje de victorias de 15 partidos.','Voy a organizar todos los datos en una hoja de cálculo y comenzar a crear los primeros gráficos de barras para mostrar el rendimiento por jugador.','Sí, necesito ayuda para entender cómo calcular la media móvil en Excel. También me falta conseguir los datos de los últimos 3 partidos que no estaban en los archivos del colegio.\n',4);
/*!40000 ALTER TABLE `dailys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluaciones`
--

DROP TABLE IF EXISTS `evaluaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tarea_id` int DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  `nota` decimal(7,2) DEFAULT NULL,
  `retroalimentacion` text,
  `evaluado_por` int DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tarea_id` (`tarea_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `evaluado_por` (`evaluado_por`),
  CONSTRAINT `evaluaciones_ibfk_1` FOREIGN KEY (`tarea_id`) REFERENCES `backlog` (`id`),
  CONSTRAINT `evaluaciones_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `evaluaciones_ibfk_3` FOREIGN KEY (`evaluado_por`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluaciones`
--

LOCK TABLES `evaluaciones` WRITE;
/*!40000 ALTER TABLE `evaluaciones` DISABLE KEYS */;
INSERT INTO `evaluaciones` VALUES (1,1,5,95.00,'¡Excelente trabajo ! Tu investigación sobre los planetas fue muy completa y me impresionó la creatividad de tu maqueta. Destacó especialmente que incluyeras datos sobre la temperatura y el tamaño de cada planeta. La presentación fue clara y se nota que realmente aprendiste. Fortalezas: Investigación detallada, maqueta bien elaborada, buena presentación oral. Aspectos a mejorar: Te sugiero mejorar la escala de la maqueta - algunos planetas quedaron muy grandes en comparación con otros. Para el próximo proyecto, podríamos usar una regla de proporción. Próximos pasos: Tu curiosidad por la astronomía es evidente. Te recomiendo investigar sobre las lunas de los planetas para ampliar tu conocimiento.\n',5,'2025-06-14'),(2,2,5,65.00,'Buen trabajo. Tus experimentos demostraron comprensión del ciclo del agua y siguiste correctamente las instrucciones. Fortalezas: Experimentos bien ejecutados, buena observación de los procesos, diario de experimentos ordenado. Aspectos a mejorar: El informe final necesita más explicación científica sobre POR QUÉ ocurre cada proceso. Por ejemplo, explica por qué el agua se evapora cuando se calienta. Las conclusiones fueron muy breves. Próximos pasos: Te sugiero practicar la escritura de explicaciones más detalladas. Para el siguiente proyecto, incluye hipótesis antes de hacer los experimentos. Tu capacidad de observación es muy buena, ahora desarrollemos el análisis.\n',5,'2025-06-14'),(3,4,5,55.00,'',5,'2025-06-14'),(4,5,5,75.00,'Buen proyecto arquitectónico,. Tu diseño es creativo y los cálculos geométricos son correctos en su mayoría. Fortalezas: Diseño innovador y estéticamente atractivo, maqueta bien construida, aplicación correcta de fórmulas de área y perímetro, consideración de aspectos sostenibles. Aspectos a mejorar: 1) Revisa el cálculo del volumen del segundo piso - hay un error en la fórmula aplicada. 2) La justificación de por qué elegiste ciertas formas geométricas necesita más desarrollo. 3) El análisis de sostenibilidad fue superficial - profundiza en materiales específicos y su impacto. Próximos pasos: Tu habilidad espacial es excelente. Te sugiero estudiar arquitectura bioclimática y explorar software de diseño 3D como SketchUp para futuros proyectos.\n',5,'2025-06-14'),(5,6,5,75.00,'Has progresado mucho en comprensión financiera. Tus cálculos de interés simple son perfectos y muestras buena comprensión de los conceptos básicos. Fortalezas: Dominio completo de interés simple, buena organización de los problemas, casos de estudio realistas y bien planteados. Aspectos a mejorar: 1) El interés compuesto aún te genera confusión - practiquemos más la fórmula A = P(1+r)^t. 2) En la simulación de préstamos, no consideraste comisiones ni seguros. 3) Tu plan de inversión necesita incluir riesgo y diversificación. Plan de apoyo: Te programo una sesión extra esta semana para repasar interés compuesto. También te daré ejercicios adicionales con calculadora financiera. Próximos pasos: Una vez domines estos conceptos, podemos avanzar a anualidades y evaluación de proyectos de inversión.\n',5,'2025-06-14'),(6,3,5,75.50,'',5,'2025-06-14');
/*!40000 ALTER TABLE `evaluaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grados`
--

DROP TABLE IF EXISTS `grados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grados`
--

LOCK TABLES `grados` WRITE;
/*!40000 ALTER TABLE `grados` DISABLE KEYS */;
INSERT INTO `grados` VALUES (-4,'Pre Primaria'),(-3,'Primaria'),(-2,'Básico'),(-1,'Bachillerato');
/*!40000 ALTER TABLE `grados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `objetivos` text NOT NULL,
  `actividades` text,
  `responsable_id` int DEFAULT NULL,
  `curso_id` int NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `responsable_id` (`responsable_id`),
  KEY `curso_id` (`curso_id`),
  CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`responsable_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `proyectos_ibfk_2` FOREIGN KEY (`curso_id`) REFERENCES `grados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (1,'Proyecto de Ciencias Naturales','Desarrollar competencias científicas básicas a través de experimentos prácticos y observación del entorno natural',NULL,5,-3,'2025-01-15','2025-03-15'),(2,'Proyecto de Matemáticas Aplicadas','Fortalecer el pensamiento lógico-matemático mediante la resolución de problemas del contexto real',NULL,5,-1,'2025-01-20','2025-03-20');
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `retrospectivas`
--

DROP TABLE IF EXISTS `retrospectivas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `retrospectivas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sprint_id` int DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  `puntos_buenos` text,
  `puntos_mejorar` text,
  `acciones_mejora` text,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sprint_id` (`sprint_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `retrospectivas_ibfk_1` FOREIGN KEY (`sprint_id`) REFERENCES `sprints` (`id`),
  CONSTRAINT `retrospectivas_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retrospectivas`
--

LOCK TABLES `retrospectivas` WRITE;
/*!40000 ALTER TABLE `retrospectivas` DISABLE KEYS */;
INSERT INTO `retrospectivas` VALUES (1,1,6,'Me gustó mucho trabajar en equipo para investigar. Cada uno investigó planetas diferentes y luego compartimos lo que aprendimos. La información que encontramos fue muy completa y aprendí cosas que no sabía, como que Venus es más caliente que Mercurio aunque esté más lejos del Sol. El tiempo que tuvimos fue suficiente para hacer una buena investigación.','Creo que deberíamos haber planificado mejor qué materiales necesitábamos desde el principio. Perdimos tiempo buscando las esferas y la pintura. También sería bueno tener más computadoras disponibles porque a veces tuvimos que esperar para buscar información.','Para el siguiente Sprint vamos a hacer una lista de materiales el primer día y pedirlos inmediatamente. También vamos a dividir mejor las tareas para que cada uno sepa exactamente qué debe hacer cada día.','2025-01-29'),(2,5,6,'La recolección de datos fue más fácil de lo que pensaba. El entrenador y la secretaría del colegio fueron muy colaborativos. Los gráficos quedaron muy profesionales y realmente muestran tendencias interesantes sobre el rendimiento del equipo. Me sorprendió descubrir que nuestro equipo tiene mejor rendimiento en la segunda mitad de los partidos.','Debería haber aprendido mejor a usar Excel antes de empezar. Perdí mucho tiempo tratando de hacer fórmulas que al final tuve que buscar en YouTube. También creo que necesitamos más tiempo para interpretar los resultados, no solo para crear los gráficos.','Voy a tomar un tutorial completo de Excel antes del próximo proyecto. También vamos a dedicar los últimos dos días de cada Sprint solo para analizar e interpretar los resultados, no para crear más gráficos. Vamos a pedir ayuda al coordinador si no entendemos algún concepto estadístico.','2025-02-03');
/*!40000 ALTER TABLE `retrospectivas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador'),(2,'Coordinador'),(3,'Equipo');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sprints`
--

DROP TABLE IF EXISTS `sprints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sprints` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `objetivo` text,
  `curso_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `curso_id` (`curso_id`),
  CONSTRAINT `sprints_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `grados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sprints`
--

LOCK TABLES `sprints` WRITE;
/*!40000 ALTER TABLE `sprints` DISABLE KEYS */;
INSERT INTO `sprints` VALUES (1,'Sprint 1 - Primaria','2025-01-15','2025-01-29','Completar investigación y diseño del sistema solar',-3),(2,'Sprint 2 - Primaria','2025-01-30','2025-02-13','Desarrollar experimentos del ciclo del agua',-3),(3,'Sprint 3 - Primaria','2025-02-14','2025-02-28','Crear herbario y catálogo de especies locales',-3),(4,'Sprint 1 - Bachillerato','2025-01-20','2025-02-03','Recolectar y analizar datos deportivos',-1),(5,'Sprint 2 - Bachillerato','2025-02-04','2025-02-18','Diseñar estructuras geométricas sostenibles',-1),(6,'Sprint 3 - Bachillerato','2025-02-19','2025-03-05','Resolver casos de álgebra financiera',-1);
/*!40000 ALTER TABLE `sprints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tareas`
--

DROP TABLE IF EXISTS `tareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tareas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `prioridad` enum('alta','media','baja') DEFAULT NULL,
  `estado` enum('Por hacer','En proceso','En revisión','Hecho','Culminado') DEFAULT 'Por hacer',
  `backlog_id` int DEFAULT NULL,
  `sprint_id` int DEFAULT NULL,
  `asignado_a` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `backlog_id` (`backlog_id`),
  KEY `sprint_id` (`sprint_id`),
  KEY `asignado_a` (`asignado_a`),
  CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`backlog_id`) REFERENCES `backlog` (`id`),
  CONSTRAINT `tareas_ibfk_2` FOREIGN KEY (`sprint_id`) REFERENCES `sprints` (`id`),
  CONSTRAINT `tareas_ibfk_3` FOREIGN KEY (`asignado_a`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tareas`
--

LOCK TABLES `tareas` WRITE;
/*!40000 ALTER TABLE `tareas` DISABLE KEYS */;
INSERT INTO `tareas` VALUES (1,'Investigar características de planetas rocosos','Buscar información sobre Mercurio, Venus, Tierra y Marte','alta','Por hacer',1,1,NULL),(3,'Diseñar maqueta del sistema solar','Crear boceto y seleccionar materiales para la maqueta','media','En proceso',1,1,NULL),(6,'Experimento de evaporación','Diseñar y ejecutar experimento para observar evaporación','alta','Por hacer',2,2,NULL),(8,'Documentar precipitación','Registrar y medir precipitaciones durante una semana','media','En proceso',2,2,NULL),(9,'Recolectar muestras de plantas','Recoger 10 especies diferentes del entorno escolar','alta','Hecho',3,3,NULL),(10,'Prensar y secar plantas','Preparar las muestras para el herbario','baja','Por hacer',3,3,NULL),(11,'Recolectar datos del equipo local','Obtener estadísticas de rendimiento del último año','alta','Por hacer',4,4,NULL),(12,'Crear gráficos de tendencias','Diseñar gráficos de barras y líneas con los datos','media','En proceso',4,4,NULL),(13,'Diseñar planos básicos','Crear planos 2D usando figuras geométricas','alta','En proceso',5,5,NULL),(14,'Calcular áreas y volúmenes','Aplicar fórmulas geométricas a la estructura','media','Por hacer',5,5,NULL),(15,'Resolver casos de interés simple','Calcular intereses en diferentes escenarios','media','En proceso',6,6,NULL),(16,'Analizar interés compuesto','Trabajar con capitalización y períodos','baja','Hecho',6,6,NULL);
/*!40000 ALTER TABLE `tareas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_grado`
--

DROP TABLE IF EXISTS `usuario_grado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_grado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `grado_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `grado_id` (`grado_id`),
  CONSTRAINT `usuario_grado_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `usuario_grado_ibfk_2` FOREIGN KEY (`grado_id`) REFERENCES `grados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_grado`
--

LOCK TABLES `usuario_grado` WRITE;
/*!40000 ALTER TABLE `usuario_grado` DISABLE KEYS */;
INSERT INTO `usuario_grado` VALUES (1,6,-1),(2,6,-3);
/*!40000 ALTER TABLE `usuario_grado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_completo` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `rol_id` int DEFAULT NULL,
  `curso_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`),
  KEY `rol_id` (`rol_id`),
  KEY `curso_id` (`curso_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`curso_id`) REFERENCES `grados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (4,'Admin Ejemplo','admin@demo.com','$2b$10$1H/tmzsQar.VTLL7CZLCYOvgv19su0.b75hfiXScYMlPD7DLjhmiy',1,NULL),(5,'Coordinador Ejemplo','coord@demo.com','$2b$10$OZZBc6psHTqlxC5YNyebcu/V5fdO0xR1sj9mt36MV.Aj6MECZyOlu',2,NULL),(6,'Equipo Ejemplo','equipo@demo.com','$2b$10$OuYKatAGbLk.pM0QTztVcuyc7QghpUE66baGuk7cEYxZQKxIAsdNu',3,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-14 15:52:57
