import React, { useState } from "react";
import EquipoLayout from "./EquipoLayout";

const Retrospectiva = () => {
  const [retros, setRetros] = useState([]);
  const [form, setForm] = useState({
    fecha: new Date().toISOString().split("T")[0],
    queSalioBien: "",
    queMejorar: "",
    acciones: "",
  });

  const guardarRetrospectiva = () => {
    if (!form.queSalioBien && !form.queMejorar && !form.acciones) return;
    const nueva = { ...form, id: Date.now() };
    setRetros([...retros, nueva]);
    setForm({
      fecha: new Date().toISOString().split("T")[0],
      queSalioBien: "",
      queMejorar: "",
      acciones: "",
    });
  };

  return (
    <EquipoLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Retrospectiva de Sprint
        </h1>

        <div className="space-y-4 mb-8">
          <input
            type="date"
            value={form.fecha}
            onChange={(e) => setForm({ ...form, fecha: e.target.value })}
            className="w-full border rounded px-4 py-2"
          />
          <textarea
            value={form.queSalioBien}
            onChange={(e) => setForm({ ...form, queSalioBien: e.target.value })}
            placeholder="¿Qué salió bien?"
            className="w-full border rounded px-4 py-2"
          />
          <textarea
            value={form.queMejorar}
            onChange={(e) => setForm({ ...form, queMejorar: e.target.value })}
            placeholder="¿Qué se puede mejorar?"
            className="w-full border rounded px-4 py-2"
          />
          <textarea
            value={form.acciones}
            onChange={(e) => setForm({ ...form, acciones: e.target.value })}
            placeholder="¿Qué acciones tomaremos?"
            className="w-full border rounded px-4 py-2"
          />
          <button
            onClick={guardarRetrospectiva}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar retrospectiva
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-3">Historial</h2>
        <ul className="space-y-3">
          {retros.map((r) => (
            <li key={r.id} className="p-4 border rounded shadow-sm bg-gray-50">
              <p className="text-sm text-gray-500 font-semibold">{r.fecha}</p>
              <p className="text-sm"><strong>✔️ Bien:</strong> {r.queSalioBien}</p>
              <p className="text-sm"><strong>⚠️ Mejorar:</strong> {r.queMejorar}</p>
              <p className="text-sm"><strong>✅ Acciones:</strong> {r.acciones}</p>
            </li>
          ))}
        </ul>
      </div>
    </EquipoLayout>
  );
};

export default Retrospectiva;
