import React from "react";
import { BookOpen, ArrowLeft, Users, Target, BarChart3, Clock, CheckCircle, ArrowRight, Lightbulb, Zap, RefreshCw, Calendar, MessageSquare, Eye, Settings } from "lucide-react";

const GestionAgilPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navbar */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg px-6 py-4 flex justify-between items-center border-b border-blue-100 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            EduÁgil
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </a>
          <a
            href="/login"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Iniciar sesión
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            ¿Qué es la Gestión Educativa Ágil?
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Un marco innovador que combina los principios de Scrum y Kanban, 
            especialmente adaptado para transformar la gestión de proyectos en instituciones educativas
          </p>
        </div>
      </div>

      {/* Introducción */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Transformando la Educación con Metodologías Ágiles
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Los establecimientos educativos enfrentan desafíos únicos relacionados con la planificación, 
                ejecución y evaluación de proyectos académicos y administrativos. Las metodologías tradicionales 
                no logran adaptarse a los cambios constantes del entorno educativo.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nuestro marco ágil surge como una alternativa innovadora que integra principios de 
                <span className="font-semibold text-blue-600"> Scrum y Kanban</span>, diseñados específicamente 
                para optimizar la colaboración, mejorar la comunicación y facilitar la toma de decisiones en tiempo real.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <p className="text-blue-700 font-medium italic">
                  "Un enfoque iterativo, centrado en la colaboración y la entrega continua de valor, 
                  que permite optimizar el flujo de trabajo en el ámbito educativo"
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Colaboración</h3>
                  <p className="text-sm text-gray-600">Entre docentes, estudiantes y administrativos</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Transparencia</h3>
                  <p className="text-sm text-gray-600">Visibilidad total del progreso</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <RefreshCw className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Adaptación</h3>
                  <p className="text-sm text-gray-600">Respuesta rápida al cambio</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Eficiencia</h3>
                  <p className="text-sm text-gray-600">Optimización de recursos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles en el Marco Ágil */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Roles Adaptados al Entorno Educativo
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hemos adaptado los roles tradicionales de Scrum para que se ajusten perfectamente 
              a la estructura y necesidades de las instituciones educativas
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Scrum Master / Director */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Administrador (Scrum Master)
              </h3>
              <p className="text-gray-600 mb-4">
                <strong>Rol:</strong> Director del centro educativo
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Facilita el proceso ágil</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Crea proyectos educativos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Elimina impedimentos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Asegura reuniones efectivas</span>
                </li>
              </ul>
            </div>

            {/* Product Owner / Coordinador */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Coordinador (Product Owner)
              </h3>
              <p className="text-gray-600 mb-4">
                <strong>Rol:</strong> Coordinador de área académica
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Define objetivos educativos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Prioriza actividades</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Gestiona el backlog educativo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Brinda retroalimentación</span>
                </li>
              </ul>
            </div>

            {/* Development Team / Equipo */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Equipo de Desarrollo
              </h3>
              <p className="text-gray-600 mb-4">
                <strong>Rol:</strong> Docentes y estudiantes
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Ejecutan actividades educativas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Se autoorganizan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Entregan incrementos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Participan activamente</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Artefactos Adaptados */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Artefactos Educativos
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Los artefactos tradicionales de Scrum adaptados para el contexto educativo
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Lista de Actividades del Ciclo
              </h3>
              <p className="text-gray-600 mb-4">
                <em>(Product Backlog educativo)</em>
              </p>
              <p className="text-gray-700">
                Conjunto de actividades, tareas o temas que se deben completar durante el período académico, 
                priorizadas según su valor en el aprendizaje.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Plan de Trabajo del Sprint
              </h3>
              <p className="text-gray-600 mb-4">
                <em>(Sprint Backlog)</em>
              </p>
              <p className="text-gray-700">
                Lista específica de tareas y actividades que el equipo se compromete a completar 
                durante un período determinado (sprint educativo).
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl border border-purple-100">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Entregable Educativo
              </h3>
              <p className="text-gray-600 mb-4">
                <em>(Product Increment)</em>
              </p>
              <p className="text-gray-700">
                Resultado tangible de aprendizaje o mejora que se obtiene al final de cada sprint, 
                como proyectos, evaluaciones o competencias desarrolladas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eventos y Ceremonias */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Eventos y Ceremonias Educativas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Reuniones estructuradas que facilitan la comunicación y el seguimiento del progreso educativo
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Planificación del Período
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                <em>(Sprint Planning)</em>
              </p>
              <p className="text-gray-700 text-sm">
                Reunión donde se definen los objetivos y actividades para el siguiente período académico.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Reunión Diaria
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                <em>(Daily Standup)</em>
              </p>
              <p className="text-gray-700 text-sm">
                Encuentro breve para sincronizar actividades y identificar obstáculos del día.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Revisión de Resultados
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                <em>(Sprint Review)</em>
              </p>
              <p className="text-gray-700 text-sm">
                Presentación de los logros y entregables obtenidos durante el período.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Retrospectiva
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                <em>(Sprint Retrospective)</em>
              </p>
              <p className="text-gray-700 text-sm">
                Reflexión sobre el proceso para identificar mejoras y optimizar el trabajo futuro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Beneficios de la Gestión Educativa Ágil
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Descubre cómo nuestro marco ágil puede transformar tu institución educativa
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Mayor Flexibilidad</h3>
                <p className="text-gray-600">
                  Adaptación rápida a cambios en el plan curricular y necesidades emergentes de los estudiantes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Mejor Colaboración</h3>
                <p className="text-gray-600">
                  Fomenta la comunicación efectiva entre docentes, estudiantes y personal administrativo.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Transparencia Total</h3>
                <p className="text-gray-600">
                  Visibilidad completa del progreso académico y administrativo en tiempo real.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Enfoque en Resultados</h3>
                <p className="text-gray-600">
                  Concentración en entregar valor educativo continuo y medible para los estudiantes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Eficiencia Mejorada</h3>
                <p className="text-gray-600">
                  Optimización de recursos y tiempo, reduciendo el desperdicio en procesos educativos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Mejora Continua</h3>
                <p className="text-gray-600">
                  Cultura de reflexión y optimización constante de métodos y procesos educativos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flujo de Scrum */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Flujo del Marco Ágil Educativo
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Visualiza cómo se conectan todos los eventos y ceremonias en un ciclo continuo de mejora
            </p>
          </div>

          {/* Flujo Principal */}
          <div className="relative">
            {/* Sprint Planning */}
            <div className="flex flex-col md:flex-row items-center justify-center mb-8">
              <div className="bg-blue-100 border-2 border-blue-500 rounded-xl p-6 max-w-sm">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
                  1. Planificación del Sprint
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Definir objetivos y seleccionar actividades educativas para las próximas 1-2 semanas
                </p>
              </div>
              
              {/* Flecha hacia abajo */}
              <div className="hidden md:block mx-4">
                <ArrowRight className="w-8 h-8 text-blue-500" />
              </div>
              <div className="md:hidden my-4">
                <ArrowRight className="w-8 h-8 text-blue-500 transform rotate-90" />
              </div>

              {/* Sprint en progreso */}
              <div className="bg-green-100 border-2 border-green-500 rounded-xl p-6 max-w-sm">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
                  2. Sprint en Ejecución
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Período activo de trabajo (1-2 semanas) donde se desarrollan las actividades planificadas
                </p>
              </div>
            </div>

            {/* Dailys en el centro */}
            <div className="flex justify-center mb-8">
              <div className="bg-yellow-100 border-2 border-yellow-500 rounded-xl p-6 max-w-md">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
                  📅 Reuniones Diarias (Dailys)
                </h3>
                <p className="text-sm text-gray-600 text-center mb-3">
                  Sincronización diaria durante el Sprint
                </p>
                <div className="text-xs text-yellow-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>¿Qué hice ayer?</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>¿Qué haré hoy?</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>¿Tengo obstáculos?</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Final del Sprint */}
            <div className="flex flex-col md:flex-row items-center justify-center mb-8">
              <div className="bg-purple-100 border-2 border-purple-500 rounded-xl p-6 max-w-sm">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
                  3. Revisión del Sprint
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Presentar y evaluar los entregables educativos completados
                </p>
              </div>
              
              {/* Flecha hacia abajo */}
              <div className="hidden md:block mx-4">
                <ArrowRight className="w-8 h-8 text-purple-500" />
              </div>
              <div className="md:hidden my-4">
                <ArrowRight className="w-8 h-8 text-purple-500 transform rotate-90" />
              </div>

              {/* Retrospectiva */}
              <div className="bg-orange-100 border-2 border-orange-500 rounded-xl p-6 max-w-sm">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
                  4. Retrospectiva
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Reflexionar sobre el proceso y definir mejoras para el próximo Sprint
                </p>
              </div>
            </div>

            {/* Mejora Continua y Flecha de retorno */}
            <div className="relative flex justify-center mt-8">
              <div className="flex flex-col items-center">
                <div className="bg-indigo-100 border-2 border-indigo-500 rounded-full p-4 mb-4">
                  <RefreshCw className="w-8 h-8 text-indigo-500" />
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Mejora Continua</h4>
                  <p className="text-sm text-gray-600 max-w-xs">
                    Los aprendizajes de cada Sprint mejoran la planificación del siguiente ciclo
                  </p>
                </div>
              </div>
            </div>

            {/* Mejora Continua y Nuevo Sprint */}
            <div className="relative flex justify-center mt-8">
              <div className="flex flex-col items-center">
                <div className="bg-indigo-100 border-2 border-indigo-500 rounded-full p-4 mb-4">
                  <RefreshCw className="w-8 h-8 text-indigo-500" />
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Mejora Continua</h4>
                  <p className="text-sm text-gray-600 max-w-xs">
                    Los aprendizajes de cada Sprint mejoran la planificación del siguiente ciclo
                  </p>
                </div>
              </div>
            </div>

            {/* Indicador de Nuevo Sprint */}
            <div className="mt-12 flex justify-center">
              <div className="relative">
                {/* Línea divisoria */}
                <div className="w-full border-t-2 border-dashed border-gray-300 mb-6"></div>
                
                {/* Indicador central */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <span className="text-lg">🔄</span>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold">NUEVO SPRINT</p>
                        <p className="text-xs opacity-90">Con mejoras aplicadas</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenido del nuevo sprint */}
                <div className="pt-8">
                  <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    {/* Aprendizajes aplicados */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <h5 className="font-semibold text-green-800 text-sm mb-2">Aprendizajes Aplicados</h5>
                      <p className="text-xs text-green-600">
                        Las mejoras identificadas se implementan en el nuevo ciclo
                      </p>
                    </div>

                    {/* Proceso optimizado */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <h5 className="font-semibold text-blue-800 text-sm mb-2">Proceso Optimizado</h5>
                      <p className="text-xs text-blue-600">
                        Mayor eficiencia basada en experiencias previas
                      </p>
                    </div>

                    {/* Mejores resultados */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <h5 className="font-semibold text-purple-800 text-sm mb-2">Mejores Resultados</h5>
                      <p className="text-xs text-purple-600">
                        Objetivos más claros y alcanzables para el aprendizaje
                      </p>
                    </div>
                  </div>

                  {/* Mensaje de continuidad */}
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                      <RefreshCw className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700 font-medium">
                        El ciclo continúa con cada Sprint siendo mejor que el anterior
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notas adicionales */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">⏱️ Duración Recomendada</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>Sprint:</strong> 1 semana</li>
                <li>• <strong>Planificación:</strong> 30 minutos</li>
                <li>• <strong>Daily:</strong> 15 minutos</li>
                <li>• <strong>Revisión:</strong> 15 minutos</li>
                <li>• <strong>Retrospectiva:</strong> 15 minutos</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">🎯 Beneficios del Flujo</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Comunicación constante y transparente</li>
                <li>• Adaptación rápida a cambios</li>
                <li>• Entrega continua de valor educativo</li>
                <li>• Mejora continua del proceso</li>
                <li>• Mayor engagement de estudiantes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para Transformar tu Institución Educativa?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a la revolución educativa y descubre cómo la gestión ágil puede mejorar 
            la experiencia de aprendizaje en tu centro educativo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
            >
              Comenzar Ahora
              <ArrowRight className="w-5 h-5" />
            </a>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">EduÁgil</span>
              </div>
              <p className="text-gray-400">
                Marco ágil para la gestión de proyectos en el sector educativo.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Marco Ágil</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Roles educativos</li>
                <li>Sprints semanales</li>
                <li>Tableros Kanban</li>
                <li>Retrospectivas</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Información</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="/sobre-nosotros"
                    className="hover:text-white transition-colors"
                  >
                    ¿Qué es Gestión Ágil?
                  </a>
                </li>
                <li>Universidad de San Carlos</li>
                <li>Facultad de Ingeniería</li>
                <li>2025</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 EduÁgil. Tesis de Luis Manuel Chay Marroquín -
              Universidad de San Carlos de Guatemala.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GestionAgilPage;