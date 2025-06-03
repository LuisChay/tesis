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
          <h2 className="text-xl font-semibold text-blue-700">📘 ¿Qué es el marco de ágil educativo?</h2>
          <p className="text-gray-700">
            Esta plataforma utiliza Scrum como marco ágil adaptado al entorno educativo. Su enfoque se basa en ciclos de trabajo cortos (Sprints), planificación colaborativa y mejora continua. Como Coordinador, tienes un rol clave en la planificación pedagógica y la conexión entre los objetivos institucionales y el trabajo del equipo.
          </p>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">🎯 Tus funciones principales</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1 text-sm">
            <li>Definir los objetivos de aprendizaje para cada Sprint.</li>
            <li>Gestionar el <strong>Backlog Educativo</strong> con tareas claras, asociadas a módulos y cursos.</li>
            <li>Priorizar las actividades más importantes para que el equipo las desarrolle.</li>
            <li>Configurar y planificar Sprints semanales.</li>
            <li>Evaluar el trabajo realizado por el equipo mediante retroalimentación continua.</li>
            <li>Consultar reportes del equipo y del avance general.</li>
          </ul>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">🛑 Lo que no debes hacer</h2>
          <ul className="list-disc ml-6 text-gray-600 text-sm">
            <li>No debes ejecutar directamente las tareas del Sprint (eso lo hace el equipo).</li>
            <li>No debes modificar la estructura de los proyectos (eso lo gestiona el Administrador).</li>
          </ul>
        </section>

        <section className="mb-4 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">🧭 ¿Dónde trabajas en la plataforma?</h2>
          <ul className="list-disc ml-6 text-gray-700 text-sm">
            <li><strong>Backlog Educativo:</strong> para registrar y priorizar tareas pedagógicas.</li>
            <li><strong>Evaluación continua:</strong> para retroalimentar al equipo y asignar notas.</li>
            <li><strong>Reportes del área:</strong> para consultar el estado de avance por curso o grado.</li>
          </ul>
        </section>
      </div>
    </CoordinadorLayout>
  );
};

export default ConoceElMarcoCoordinador;
