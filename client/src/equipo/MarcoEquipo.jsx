import React from "react";
import EquipoLayout from "./EquipoLayout";

const ConoceElMarcoEquipo = () => {
  return (
    <EquipoLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Conoce tu rol: Equipo (Docentes y Estudiantes)
        </h1>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            📘 ¿Qué es el marco de ágil educativo?
          </h2>
          <p className="text-gray-700">
            Scrum es un marco de trabajo que permite organizar el aprendizaje en
            ciclos cortos llamados <strong>Sprints</strong>. En cada Sprint, el
            equipo colabora para alcanzar una meta de aprendizaje mediante
            tareas concretas, reflexión diaria y mejora continua.
          </p>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            🧑‍🤝‍🧑 Tu rol como parte del Equipo
          </h2>
          <p className="text-gray-700">
            Como docente o estudiante, formas parte del equipo de desarrollo. Tu
            responsabilidad es llevar a cabo las tareas planificadas en el
            Sprint, colaborar con tus compañeros y contribuir a lograr la meta
            común.
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-1 text-sm">
            <li>Participar en la planificación del Sprint.</li>
            <li>
              Elegir y ejecutar tareas del <strong>Tablero Kanban</strong>.
            </li>
            <li>
              Registrar tus avances en la <strong>Daily</strong> (reunión
              diaria).
            </li>
            <li>
              Reflexionar al final de cada Sprint en la{" "}
              <strong>Retrospectiva</strong>.
            </li>
            <li>
              Entregar resultados de calidad que cumplan los objetivos
              propuestos.
            </li>
          </ul>
        </section>

        <section className="mb-8 space-y-4">
          <h2 className="text-xl font-semibold text-blue-700">
            📅 Eventos y Ceremonias del Marco Ágil
          </h2>
          <p className="text-gray-700 text-sm">
            Durante cada Sprint, participarás en diferentes reuniones
            estructuradas que facilitan la comunicación y el seguimiento del
            progreso educativo:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Planificación del Sprint */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📋</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Planificación del Sprint
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Cuándo:</strong> Al inicio de cada Sprint (cada 1-2
                semanas)
              </p>
              <p className="text-sm text-gray-700 mb-2">
                Reunión donde el equipo define qué tareas y objetivos se
                cumplirán durante el siguiente período académico.
              </p>
              <p className="text-sm text-blue-700 font-medium">
                Tu participación: Ayudas a estimar el esfuerzo de las tareas y
                te comprometes con el trabajo a realizar.
              </p>
            </div>

            {/* Daily Standup */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">💬</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Daily (Reunión Diaria)
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Cuándo:</strong> Cada día durante 10-15 minutos
              </p>
              <p className="text-sm text-gray-700 mb-2">
                Encuentro breve para sincronizar actividades y identificar
                obstáculos del día.
              </p>
              <div className="text-xs text-green-700 space-y-1">
                <p>
                  <strong>Respondes 3 preguntas:</strong>
                </p>
                <ul className="list-disc ml-4">
                  <li>¿Qué hice ayer?</li>
                  <li>¿Qué haré hoy?</li>
                  <li>¿Tengo algún obstáculo?</li>
                </ul>
              </div>
            </div>

            {/* Revisión del Sprint */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">👁️</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Revisión del Sprint
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Cuándo:</strong> Al final de cada Sprint
              </p>
              <p className="text-sm text-gray-700 mb-2">
                Presentación de los logros y entregables obtenidos durante el
                período.
              </p>
              <p className="text-sm text-purple-700 font-medium">
                Tu participación: Presentas tu trabajo completado y recibes
                retroalimentación del coordinador y compañeros.
              </p>
            </div>

            {/* Retrospectiva */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">🔄</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Retrospectiva
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Cuándo:</strong> Después de la Revisión del Sprint
              </p>
              <p className="text-sm text-gray-700 mb-2">
                Reflexión sobre el proceso para identificar mejoras y optimizar
                el trabajo futuro.
              </p>
              <div className="text-xs text-orange-700 space-y-1">
                <p>
                  <strong>Se analiza:</strong>
                </p>
                <ul className="list-disc ml-4">
                  <li>¿Qué funcionó bien?</li>
                  <li>¿Qué se puede mejorar?</li>
                  <li>¿Qué compromisos tomamos?</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
            <p className="text-sm text-yellow-800">
              <strong>💡 Tip:</strong> Estos eventos son tu oportunidad para
              comunicarte, colaborar y mejorar continuamente. Tu participación
              activa y honesta es fundamental para el éxito del equipo.
            </p>
          </div>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            🧭 ¿Dónde trabajas dentro de la plataforma?
          </h2>
          <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
            <li>
              <strong>Tablero Kanban:</strong> para mover tareas según tu
              progreso (Por hacer, En proceso, En revisión, Hecho).
            </li>
            <li>
              <strong>Daily:</strong> para reportar lo que hiciste, lo que harás
              y si tuviste obstáculos.
            </li>
            <li>
              <strong>Planificación del Sprint:</strong> donde organizas en
              equipo las tareas que asumirán en la semana.
            </li>
            <li>
              <strong>Retrospectiva:</strong> para compartir lo que funcionó
              bien y lo que puede mejorar.
            </li>
            <li>
              <strong>Reportes:</strong> para ver tu avance y logros durante el
              Sprint.
            </li>
          </ul>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            📊 Estados de las Tareas en el Tablero Kanban
          </h2>
          <p className="text-gray-700 text-sm mb-3">
            Como miembro del equipo, moverás las tareas a través de diferentes
            estados según tu progreso:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <div className="w-6 h-6 bg-gray-500 rounded mx-auto mb-1"></div>
              <p className="text-xs font-medium text-gray-700">Por Hacer</p>
              <p className="text-xs text-gray-600">Tareas pendientes</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg text-center">
              <div className="w-6 h-6 bg-blue-500 rounded mx-auto mb-1"></div>
              <p className="text-xs font-medium text-gray-700">En Proceso</p>
              <p className="text-xs text-gray-600">Trabajando en ello</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg text-center">
              <div className="w-6 h-6 bg-yellow-500 rounded mx-auto mb-1"></div>
              <p className="text-xs font-medium text-gray-700">En Revisión</p>
              <p className="text-xs text-gray-600">Esperando feedback</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg text-center">
              <div className="w-6 h-6 bg-green-500 rounded mx-auto mb-1"></div>
              <p className="text-xs font-medium text-gray-700">Hecho</p>
              <p className="text-xs text-gray-600">Completado</p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            ✅ ¿Qué se espera de ti?
          </h2>
          <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
            <li>Compromiso y responsabilidad con tu equipo.</li>
            <li>Participación activa y respetuosa en todos los eventos.</li>
            <li>Colaboración para lograr la meta del Sprint.</li>
            <li>Comunicación clara y honesta en las reuniones diarias.</li>
            <li>Apertura a la retroalimentación y mejora constante.</li>
            <li>
              Actualización oportuna del estado de tus tareas en el tablero.
            </li>
          </ul>
        </section>

        <div className="text-sm text-gray-500 mt-10 border-t pt-4">
          Si tienes dudas sobre tu rol o los eventos del marco ágil, puedes
          consultar esta sección en cualquier momento. Tu labor y participación
          activa son clave para que el marco ágil funcione exitosamente en el
          centro educativo.
        </div>
      </div>
    </EquipoLayout>
  );
};

export default ConoceElMarcoEquipo;
