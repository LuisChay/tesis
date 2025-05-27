import React, { useState } from "react";
import EquipoLayout from "./EquipoLayout";

const SprintPlanner = () => {
  const [sprints, setSprints] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    meta: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const agregarSprint = () => {
    if (!form.nombre || !form.meta) return;
    const nuevo = { ...form, id: Date.now(), estado: "Activo" };
    setSprints([...sprints, nuevo]);
    setForm({ nombre: "", meta: "", fechaInicio: "", fechaFin: "" });
  };

  const cerrarSprint = (id) => {
    setSprints(
      sprints.map((s) =>
        s.id === id ? { ...s, estado: "Cerrado" } : s
      )
    );
  };

  return (
    <EquipoLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Planificación de Sprints
        </h1>

        <div className="space-y-4 mb-8">
          <input
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder="Nombre del Sprint"
            className="w-full border rounded px-4 py-2"
          />
          <textarea
            value={form.meta}
            onChange={(e) => setForm({ ...form, meta: e.target.value })}
            placeholder="Meta del Sprint"
            className="w-full border rounded px-4 py-2"
          />
          <div className="flex gap-4">
            <input
              type="date"
              value={form.fechaInicio}
              onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })}
              className="w-full border rounded px-4 py-2"
            />
            <input
              type="date"
              value={form.fechaFin}
              onChange={(e) => setForm({ ...form, fechaFin: e.target.value })}
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <button
            onClick={agregarSprint}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Crear Sprint
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-3">Sprints creados</h2>
        <ul className="space-y-3">
          {sprints.map((s) => (
            <li key={s.id} className="p-4 border rounded shadow-sm bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-md font-bold text-gray-800">{s.nombre}</h3>
                  <p className="text-sm text-gray-700 italic">Meta: {s.meta}</p>
                  <p className="text-sm text-gray-600">
                    {s.fechaInicio} – {s.fechaFin} | Estado:{" "}
                    <span className={s.estado === "Cerrado" ? "text-red-600" : "text-green-600"}>
                      {s.estado}
                    </span>
                  </p>
                </div>
                {s.estado === "Activo" && (
                  <button
                    onClick={() => cerrarSprint(s.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Cerrar Sprint
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </EquipoLayout>
  );
};

export default SprintPlanner;
