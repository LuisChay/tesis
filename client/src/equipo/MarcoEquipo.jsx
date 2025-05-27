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
          <h2 className="text-xl font-semibold text-blue-700">📘 ¿Qué es el marco ágil Scrum?</h2>
          <p className="text-gray-700">
            Scrum es un marco de trabajo que permite organizar el aprendizaje en ciclos cortos llamados <strong>Sprints</strong>. En cada Sprint, el equipo colabora para alcanzar una meta de aprendizaje mediante tareas concretas, reflexión diaria y mejora continua.
          </p>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">🧑‍🤝‍🧑 Tu rol como parte del Equipo</h2>
          <p className="text-gray-700">
            Como docente o estudiante, formas parte del equipo de desarrollo. Tu responsabilidad es llevar a cabo las tareas planificadas en el Sprint, colaborar con tus compañeros y contribuir a lograr la meta común.
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-1 text-sm">
            <li>Participar en la planificación del Sprint.</li>
            <li>Elegir y ejecutar tareas del <strong>Tablero Kanban</strong>.</li>
            <li>Registrar tus avances en la <strong>Daily</strong> (reunión diaria).</li>
            <li>Reflexionar al final de cada Sprint en la <strong>Retrospectiva</strong>.</li>
            <li>Entregar resultados de calidad que cumplan los objetivos propuestos.</li>
          </ul>
        </section>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">🧭 ¿Dónde trabajas dentro de la plataforma?</h2>
          <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
            <li><strong>Tablero Kanban:</strong> para mover tareas según tu progreso (Por hacer, En proceso, En revisión, Hecho).</li>
            <li><strong>Daily:</strong> para reportar lo que hiciste, lo que harás y si tuviste obstáculos.</li>
            <li><strong>Planificación del Sprint:</strong> donde organizas en equipo las tareas que asumirán en la semana.</li>
            <li><strong>Retrospectiva:</strong> para compartir lo que funcionó bien y lo que puede mejorar.</li>
            <li><strong>Reportes:</strong> para ver tu avance y logros durante el Sprint.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">✅ ¿Qué se espera de ti?</h2>
          <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
            <li>Compromiso y responsabilidad con tu equipo.</li>
            <li>Participación activa y respetuosa.</li>
            <li>Colaboración para lograr la meta del Sprint.</li>
            <li>Apertura a la retroalimentación y mejora constante.</li>
          </ul>
        </section>
      </div>
    </EquipoLayout>
  );
};

export default ConoceElMarcoEquipo;
