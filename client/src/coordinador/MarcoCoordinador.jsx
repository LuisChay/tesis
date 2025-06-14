import React from "react";
import CoordinadorLayout from "./CoordinadorLayout";

const ConoceElMarcoCoordinador = () => {
  return (
    <CoordinadorLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Conoce tu rol: Coordinador (Product Owner)
        </h1>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            📘 ¿Qué es el marco de ágil educativo?
          </h2>
          <p className="text-gray-700">
            Esta plataforma utiliza Scrum como marco ágil adaptado al entorno
            educativo. Su enfoque se basa en ciclos de trabajo cortos (Sprints),
            planificación colaborativa y mejora continua. Como Coordinador,
            tienes un rol clave en la planificación pedagógica y la conexión
            entre los objetivos institucionales y el trabajo del equipo.
          </p>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            🎯 Tu rol como Coordinador (Product Owner)
          </h2>
          <p className="text-gray-700">
            Eres el <strong>dueño del producto educativo</strong> en tu área
            académica. Tu responsabilidad principal es maximizar el valor del
            aprendizaje que reciben los estudiantes, definiendo QUÉ se debe
            aprender y CUÁNDO, mientras que el equipo decide CÓMO hacerlo.
          </p>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-3">
            <p className="text-green-800 text-sm">
              <strong>🎯 Tu enfoque:</strong> Eres la voz del estudiante y el
              guardián de los objetivos de aprendizaje. Tu éxito se mide por el
              logro de competencias y el crecimiento académico de los
              estudiantes.
            </p>
          </div>
        </section>

        <section className="mb-8 space-y-4">
          <h2 className="text-xl font-semibold text-blue-700">
            📋 Responsabilidades Principales
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Gestión del Backlog */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📚</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Gestión del Backlog Educativo
                </h3>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Crear actividades de aprendizaje claras</li>
                <li>• Priorizar tareas según valor educativo</li>
                <li>• Definir criterios de aceptación</li>
                <li>• Mantener el backlog actualizado</li>
              </ul>
            </div>

            {/* Planificación de Sprints */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📅</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Planificación de Objetivos
                </h3>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Definir objetivos de aprendizaje por Sprint</li>
                <li>• Alinear con el currículo institucional</li>
                <li>• Establecer metas alcanzables</li>
                <li>• Comunicar expectativas claramente</li>
              </ul>
            </div>

            {/* Evaluación y Retroalimentación */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">⭐</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Evaluación Continua
                </h3>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Revisar entregables del equipo</li>
                <li>• Proporcionar retroalimentación constante</li>
                <li>• Evaluar el logro de objetivos</li>
                <li>• Asignar calificaciones justificadas</li>
              </ul>
            </div>

            {/* Comunicación con Stakeholders */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">💬</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Comunicación Estratégica
                </h3>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Comunicar progreso a la administración</li>
                <li>• Informar a padres sobre avances</li>
                <li>• Colaborar con otros coordinadores</li>
                <li>• Reportar necesidades del área</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            🛠️ Herramientas y Funciones en la Plataforma
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <strong>📚 Backlog Educativo:</strong> Crear, editar y priorizar
                actividades de aprendizaje por área o grado.
              </li>
              <li>
                <strong>🎯 Definición de Objetivos:</strong> Establecer metas
                claras y criterios de evaluación para cada Sprint.
              </li>
              <li>
                <strong>⭐ Sistema de Evaluación:</strong> Revisar trabajos,
                asignar calificaciones y proporcionar retroalimentación.
              </li>
              <li>
                <strong>📊 Reportes del Área:</strong> Monitorear avances,
                productividad y resultados de aprendizaje.
              </li>
              <li>
                <strong>📋 Planificación de Sprints:</strong> Colaborar con el
                equipo en la selección de tareas para cada ciclo.
              </li>
              <li>
                <strong>🔍 Seguimiento Individual:</strong> Monitorear el
                progreso específico de cada estudiante.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            📅 Tu Participación en los Eventos Ágiles
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                📋 Planificación del Sprint
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Presenta el backlog priorizado</li>
                <li>• Explica objetivos de aprendizaje</li>
                <li>• Aclara criterios de aceptación</li>
                <li>• Negocia el alcance del Sprint</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                👁️ Revisión del Sprint
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Revisa entregables completados</li>
                <li>• Acepta o rechaza el trabajo</li>
                <li>• Proporciona retroalimentación específica</li>
                <li>• Adapta el backlog según aprendizajes</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                💬 Daily Standups
              </h3>
              <p className="text-sm text-gray-700">
                <strong>Participación opcional:</strong> Disponible para aclarar
                dudas, pero evita microgestionar. Permite que el equipo se
                autoorganice.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                🔄 Retrospectiva
              </h3>
              <p className="text-sm text-gray-700">
                <strong>Enfoque en el producto:</strong> Escucha feedback sobre
                el backlog, objetivos y criterios. Ajusta tu enfoque según las
                necesidades del equipo.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            ✅ Características de un Buen Product Owner Educativo
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                🎓 Competencias Pedagógicas
              </h4>
              <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
                <li>Conocimiento profundo del currículo</li>
                <li>Comprensión de estilos de aprendizaje</li>
                <li>Habilidades de evaluación formativa</li>
                <li>Diseño de experiencias de aprendizaje</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                🤝 Habilidades de Liderazgo
              </h4>
              <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
                <li>Comunicación clara y asertiva</li>
                <li>Toma de decisiones educativas</li>
                <li>Gestión de expectativas</li>
                <li>Visión estratégica del aprendizaje</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            🚫 Límites de tu Rol - ¿Qué NO debes hacer?
          </h2>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <ul className="text-sm text-red-700 space-y-2">
              <li>
                <strong>❌ No ejecutes las tareas por el equipo:</strong> Tu rol
                es definir QUÉ y CUÁNDO, el equipo decide CÓMO hacer el trabajo.
              </li>
              <li>
                <strong>❌ No modifiques la estructura organizacional:</strong>{" "}
                La gestión de proyectos y usuarios corresponde al Administrador.
              </li>
              <li>
                <strong>❌ No microgestiones el proceso:</strong> Confía en que
                el Scrum Master facilite las ceremonias y resuelva impedimentos.
              </li>
              <li>
                <strong>❌ No cambies constantemente las prioridades:</strong>{" "}
                Mantén estabilidad durante el Sprint para que el equipo pueda
                enfocarse.
              </li>
              <li>
                <strong>❌ No asignes tareas directamente:</strong> El equipo se
                autoorganiza y elige sus tareas del backlog priorizado.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            📊 Métricas de Éxito para tu Rol
          </h2>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-gray-700 mb-2">
              Tu efectividad como Product Owner se puede medir por:
            </p>
            <ul className="text-sm text-green-700 space-y-1">
              <li>
                ✅ <strong>Logro de objetivos de aprendizaje:</strong> Los
                estudiantes alcanzan las competencias definidas
              </li>
              <li>
                ✅ <strong>Calidad del backlog:</strong> Las tareas son claras,
                priorizadas y valiosas
              </li>
              <li>
                ✅ <strong>Satisfacción del equipo:</strong> El equipo comprende
                y valora las actividades propuestas
              </li>
              <li>
                ✅ <strong>Progreso académico:</strong> Mejora continua en el
                rendimiento de los estudiantes
              </li>
              <li>
                ✅ <strong>Alineación curricular:</strong> Los entregables
                cumplen con estándares educativos
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            💡 Consejos para Maximizar el Valor Educativo
          </h2>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <ul className="text-sm text-blue-700 space-y-2">
              <li>
                <strong>🎯 Enfócate en resultados de aprendizaje:</strong>{" "}
                Siempre pregúntate "¿Qué competencia desarrollará el estudiante
                con esta actividad?"
              </li>
              <li>
                <strong>📝 Escribe criterios de aceptación claros:</strong>{" "}
                Define exactamente qué constituye un trabajo bien hecho.
              </li>
              <li>
                <strong>🔄 Mantén un backlog dinámico:</strong> Revisa y ajusta
                las prioridades según el progreso y las necesidades emergentes.
              </li>
              <li>
                <strong>💬 Comunica la visión:</strong> Asegúrate de que el
                equipo entienda el "por qué" detrás de cada actividad.
              </li>
              <li>
                <strong>📊 Usa datos para decidir:</strong> Basa tus decisiones
                en evidencia del aprendizaje, no en suposiciones.
              </li>
            </ul>
          </div>
        </section>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="font-semibold text-yellow-800 mb-2">
            💡 Recordatorio Importante
          </h3>
          <p className="text-sm text-yellow-700">
            Como Coordinador (Product Owner), eres el puente entre los objetivos
            institucionales y el aprendizaje real de los estudiantes. Tu
            capacidad para priorizar, comunicar claramente y evaluar con
            justicia determinará el éxito educativo de tu área. Recuerda: tu
            objetivo no es controlar el proceso, sino maximizar el valor del
            aprendizaje.
          </p>
        </div>

        <div className="text-sm text-gray-500 mt-10 border-t pt-4">
          Si tienes dudas sobre tu rol como Product Owner educativo, puedes
          consultar esta sección en cualquier momento. Tu labor de definición y
          priorización es clave para que el marco ágil genere valor real en el
          aprendizaje de los estudiantes.
        </div>
      </div>
    </CoordinadorLayout>
  );
};

export default ConoceElMarcoCoordinador;
