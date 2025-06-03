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
          <h2 className="text-xl font-semibold text-blue-700">📘 ¿Qué es el marco de ágil educativo?</h2>
          <p className="text-gray-700">
            Esta plataforma aplica el marco de trabajo Scrum adaptado al contexto educativo. Scrum se basa en ciclos cortos (Sprints), colaboración constante y mejora continua. Cada actor tiene un rol específico que contribuye al logro de objetivos educativos claros.
          </p>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">👤 Tu rol como Administrador (Scrum Master)</h2>
          <p className="text-gray-700">
            Eres el facilitador del marco ágil. Tu función principal es crear las condiciones adecuadas para que el trabajo de los coordinadores y equipos se desarrolle de forma ordenada, sin interferencias ni bloqueos organizativos.
          </p>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">✅ ¿Qué debes hacer?</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1 text-sm">
            <li>📁 Crear y administrar los <strong>proyectos educativos</strong> que servirán como marco de trabajo para cada área o grado.</li>
            <li>👥 Gestionar los <strong>usuarios y roles</strong> dentro del sistema (asignar coordinadores y docentes).</li>
            <li>📊 Visualizar <strong>reportes globales</strong> por proyecto, área o Sprint para monitorear avances institucionales.</li>
            <li>🧭 Promover el cumplimiento del marco ágil en toda la institución (tiempos, reuniones, entregables).</li>
            <li>🚧 Eliminar <strong>impedimentos organizativos</strong> que interfieran con el trabajo de los equipos.</li>
          </ul>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">🚫 ¿Qué no debes hacer?</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1 text-sm">
            <li>❌ No debes crear tareas educativas ni intervenir en el Backlog pedagógico (esto es tarea del Product Owner).</li>
            <li>❌ No debes modificar la planificación de Sprints (esto lo hace el equipo junto al PO).</li>
            <li>❌ No debes calificar ni retroalimentar a los estudiantes (rol del coordinador/docente).</li>
          </ul>
        </section>

        <div className="text-sm text-gray-500 mt-10 border-t pt-4">
          Si tienes dudas sobre tu rol, puedes consultar esta sección en cualquier momento. Tu labor es clave para que el marco ágil funcione en el centro educativo.
        </div>
      </div>
    </AdminLayout>
  );
};

export default ConoceElMarcoAdmin;
