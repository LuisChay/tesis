import React, { useState } from "react";
import EquipoLayout from "./EquipoLayout";

const DailyEntry = () => {
  const [entradas, setEntradas] = useState([]);
  const [form, setForm] = useState({
    ayer: "",
    hoy: "",
    bloqueos: "",
    fecha: new Date().toISOString().split("T")[0],
  });

  const agregarEntrada = () => {
    if (!form.ayer && !form.hoy && !form.bloqueos) return;
    const nueva = { ...form, id: Date.now() };
    setEntradas([...entradas, nueva]);
    setForm({
      ayer: "",
      hoy: "",
      bloqueos: "",
      fecha: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <EquipoLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Reunión diaria (Daily)
        </h1>

        <div className="space-y-4 mb-8">
          <input
            type="date"
            value={form.fecha}
            onChange={(e) => setForm({ ...form, fecha: e.target.value })}
            className="w-full border rounded px-4 py-2"
          />
          <textarea
            value={form.ayer}
            onChange={(e) => setForm({ ...form, ayer: e.target.value })}
            placeholder="¿Qué hiciste ayer?"
            className="w-full border rounded px-4 py-2"
          />
          <textarea
            value={form.hoy}
            onChange={(e) => setForm({ ...form, hoy: e.target.value })}
            placeholder="¿Qué harás hoy?"
            className="w-full border rounded px-4 py-2"
          />
          <textarea
            value={form.bloqueos}
            onChange={(e) => setForm({ ...form, bloqueos: e.target.value })}
            placeholder="¿Tienes algún impedimento?"
            className="w-full border rounded px-4 py-2"
          />
          <button
            onClick={agregarEntrada}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar entrada
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-3">Entradas registradas</h2>
        <ul className="space-y-3">
          {entradas.map((e) => (
            <li key={e.id} className="p-4 border rounded shadow-sm bg-gray-50">
              <p className="text-sm text-gray-700"><strong>Fecha:</strong> {e.fecha}</p>
              <p className="text-sm"><strong>Ayer:</strong> {e.ayer}</p>
              <p className="text-sm"><strong>Hoy:</strong> {e.hoy}</p>
              <p className="text-sm"><strong>Bloqueos:</strong> {e.bloqueos}</p>
            </li>
          ))}
        </ul>
      </div>
    </EquipoLayout>
  );
};

export default DailyEntry;
