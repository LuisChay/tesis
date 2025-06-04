import React, { useState } from "react";
import CoordinadorLayout from "./CoordinadorLayout";

const EvaluacionContinua = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [form, setForm] = useState({
    estudiante: "",
    sprint: "",
    retroalimentacion: "",
    nota: "",
  });

  const agregarEvaluacion = () => {
    if (!form.estudiante || !form.sprint || !form.nota) return;
    const nueva = { ...form, id: Date.now() };
    setEvaluaciones([...evaluaciones, nueva]);
    setForm({
      estudiante: "",
      sprint: "",
      retroalimentacion: "",
      nota: "",
    });
  };

  return (
    <CoordinadorLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Evaluación continua del equipo
        </h1>

        <div className="space-y-4 mb-8">
          <input
            value={form.estudiante}
            onChange={(e) => setForm({ ...form, estudiante: e.target.value })}
            placeholder="Equipo evaluado"
            className="w-full border rounded px-4 py-2"
          />
          <input
            value={form.sprint}
            onChange={(e) => setForm({ ...form, sprint: e.target.value })}
            placeholder="Nombre o número del Sprint"
            className="w-full border rounded px-4 py-2"
          />
          <textarea
            value={form.retroalimentacion}
            onChange={(e) => setForm({ ...form, retroalimentacion: e.target.value })}
            placeholder="Retroalimentación"
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="number"
            value={form.nota}
            onChange={(e) => setForm({ ...form, nota: e.target.value })}
            placeholder="Nota (0 - 100)"
            className="w-full border rounded px-4 py-2"
          />
          <button
            onClick={agregarEvaluacion}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar evaluación
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-3">Evaluaciones realizadas</h2>
        <ul className="space-y-3">
          {evaluaciones.map((e) => (
            <li key={e.id} className="p-4 border rounded shadow-sm bg-gray-50">
              <p className="text-sm font-bold">{e.estudiante}</p>
              <p className="text-sm">Sprint: {e.sprint}</p>
              <p className="text-sm text-gray-700">Nota: {e.nota}</p>
              <p className="text-sm text-gray-600 italic">{e.retroalimentacion}</p>
            </li>
          ))}
        </ul>
      </div>
    </CoordinadorLayout>
  );
};

export default EvaluacionContinua;
