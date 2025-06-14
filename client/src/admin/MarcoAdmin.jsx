import React from "react";
import AdminLayout from "./AdminLayout";

const ConoceElMarcoAdmin = () => {
  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Conoce tu rol: Administrador (Scrum Master)
        </h1>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            📘 ¿Qué es el marco de ágil educativo?
          </h2>
          <p className="text-gray-700">
            Esta plataforma aplica el marco de trabajo Scrum adaptado al
            contexto educativo. Scrum se basa en ciclos cortos (Sprints),
            colaboración constante y mejora continua. Cada actor tiene un rol
            específico que contribuye al logro de objetivos educativos claros.
          </p>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            👤 Tu rol como Administrador (Scrum Master)
          </h2>
          <p className="text-gray-700">
            Eres el facilitador del marco ágil en toda la institución educativa.
            Tu función principal es crear las condiciones organizacionales
            adecuadas para que el trabajo de coordinadores y equipos se
            desarrolle de forma ordenada, sin interferencias ni bloqueos
            institucionales.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-3">
            <p className="text-blue-800 text-sm">
              <strong>🎯 Tu enfoque:</strong> Eres un líder servidor que
              facilita el proceso, no quien toma decisiones académicas. Tu éxito
              se mide por el éxito de los equipos educativos.
            </p>
          </div>
        </section>

        <section className="mb-8 space-y-4">
          <h2 className="text-xl font-semibold text-blue-700">
            🔧 Responsabilidades Principales
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Gestión de Proyectos */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📋</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Gestión de Proyectos
                </h3>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Crear proyectos educativos por área/grado</li>
                <li>• Definir la estructura organizacional</li>
                <li>• Establecer calendarios académicos</li>
                <li>• Configurar períodos de Sprints</li>
              </ul>
            </div>

            {/* Gestión de Usuarios */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">👥</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Gestión de Usuarios
                </h3>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Asignar roles y permisos</li>
                <li>• Crear cuentas de coordinadores</li>
                <li>• Organizar equipos de trabajo</li>
                <li>• Gestionar accesos al sistema</li>
              </ul>
            </div>

            {/* Facilitación del Proceso */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">⚡</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Facilitación del Proceso
                </h3>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Eliminar impedimentos organizativos</li>
                <li>• Asegurar que se cumplan los eventos ágiles</li>
                <li>• Mediar conflictos entre equipos</li>
                <li>• Promover la cultura ágil</li>
              </ul>
            </div>

            {/* Monitoreo y Reportes */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📊</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Monitoreo y Reportes
                </h3>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Visualizar avances institucionales</li>
                <li>• Generar reportes ejecutivos</li>
                <li>• Identificar tendencias y patrones</li>
                <li>• Tomar decisiones basadas en datos</li>
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
                <strong>🏗️ Panel de Administración:</strong> Para crear y
                gestionar proyectos educativos institucionales.
              </li>
              <li>
                <strong>👤 Gestión de Usuarios:</strong> Crear, editar y asignar
                roles a coordinadores, docentes y estudiantes.
              </li>
              <li>
                <strong>📈 Dashboard Ejecutivo:</strong> Vista global de
                métricas, avances y resultados por proyecto.
              </li>
              <li>
                <strong>📋 Configuración de Sprints:</strong> Establecer
                duraciones, fechas y eventos del marco ágil.
              </li>
              <li>
                <strong>🔧 Centro de Soporte:</strong> Resolver impedimentos
                técnicos y organizacionales.
              </li>
              <li>
                <strong>📊 Reportes Institucionales:</strong> Análisis de
                productividad, cumplimiento y resultados educativos.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            ✅ Características de un Buen Scrum Master Educativo
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                🤝 Habilidades Interpersonales
              </h4>
              <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
                <li>Escucha activa y empática</li>
                <li>Facilitación de reuniones efectivas</li>
                <li>Resolución de conflictos</li>
                <li>Comunicación clara y asertiva</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                🎯 Habilidades de Liderazgo
              </h4>
              <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
                <li>Liderazgo servidor (no autoritario)</li>
                <li>Pensamiento sistémico</li>
                <li>Enfoque en la mejora continua</li>
                <li>Capacidad de coaching</li>
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
                <strong>❌ No tomes decisiones pedagógicas:</strong> El
                contenido educativo y la priorización de tareas es
                responsabilidad del Coordinador (Product Owner).
              </li>
              <li>
                <strong>❌ No gestiones directamente el Backlog:</strong> No
                agregues, elimines o modifiques tareas educativas sin consultar
                al coordinador.
              </li>
              <li>
                <strong>❌ No evalúes a estudiantes:</strong> La calificación y
                retroalimentación académica corresponde al equipo docente.
              </li>
              <li>
                <strong>❌ No impongas soluciones:</strong> Facilita que los
                equipos encuentren sus propias soluciones, no las dictes.
              </li>
              <li>
                <strong>❌ No microgestiones:</strong> Confía en la
                autoorganización de los equipos, evita controlar cada detalle.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">
            🎯 Métricas de Éxito para tu Rol
          </h2>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-gray-700 mb-2">
              Tu efectividad como Scrum Master se puede medir por:
            </p>
            <ul className="text-sm text-green-700 space-y-1">
              <li>
                ✅ <strong>Cumplimiento de eventos:</strong> Los equipos
                realizan todas las ceremonias ágiles a tiempo
              </li>
              <li>
                ✅ <strong>Velocidad de resolución:</strong> Los impedimentos se
                resuelven rápidamente
              </li>
              <li>
                ✅ <strong>Satisfacción del equipo:</strong> Coordinadores y
                docentes se sienten apoyados
              </li>
              <li>
                ✅ <strong>Adopción del marco:</strong> La cultura ágil se
                extiende por toda la institución
              </li>
              <li>
                ✅ <strong>Mejora continua:</strong> Los procesos se optimizan
                constantemente
              </li>
            </ul>
          </div>
        </section>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="font-semibold text-yellow-800 mb-2">
            💡 Recordatorio Importante
          </h3>
          <p className="text-sm text-yellow-700">
            Tu rol como Administrador (Scrum Master) es fundamental para el
            éxito del marco ágil educativo. Eres el guardián del proceso, no del
            contenido. Tu liderazgo servicial y tu capacidad para facilitar (no
            controlar) determinarán el éxito de toda la transformación ágil en
            tu institución.
          </p>
        </div>

        <div className="text-sm text-gray-500 mt-10 border-t pt-4">
          Si tienes dudas sobre tu rol como Scrum Master educativo, puedes
          consultar esta sección en cualquier momento. Tu labor de facilitación
          es clave para que el marco ágil funcione exitosamente en el centro
          educativo.
        </div>
      </div>
    </AdminLayout>
  );
};

export default ConoceElMarcoAdmin;
