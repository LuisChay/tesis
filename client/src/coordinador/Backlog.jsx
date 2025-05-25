import React, { useState } from "react";
import CoordinadorLayout from "./CoordinadorLayout";

const Backlog = () => {
  const [tareas, setTareas] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    curso: "",
  });

  const gradosDisponibles = [
    "Primero A", "Segundo A", "Tercero A", "Cuarto A",
  ];

  const agregarTarea = () => {
    if (formData.titulo.trim() !== "" && formData.curso !== "") {
      setTareas([
        ...tareas,
        { ...formData, id: Date.now() }
      ]);
      setFormData({ titulo: "", descripcion: "", curso: "" });
    }
  };

  return (
    <CoordinadorLayout>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Gestión de Backlog Educativo
        </h1>

        {/* Formulario */}
        <div className="space-y-4 mb-8">
          <input
            type="text"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            placeholder="Título de la tarea"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <textarea
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            placeholder="Descripción"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <select
            value={formData.curso}
            onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Selecciona un curso</option>
            {gradosDisponibles.map((curso) => (
              <option key={curso} value={curso}>{curso}</option>
            ))}
          </select>
          <button
            onClick={agregarTarea}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Agregar tarea
          </button>
        </div>

        {/* Lista de tareas */}
        <h2 className="text-lg font-semibold mb-4">Tareas registradas</h2>
        <ul className="space-y-4">
          {tareas.map((tarea) => (
            <li
              key={tarea.id}
              className="border rounded-md p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-md font-bold text-gray-800">{tarea.titulo}</h3>
                <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  {tarea.curso}
                </span>
              </div>
              <p className="text-sm text-gray-700">{tarea.descripcion}</p>
            </li>
          ))}
        </ul>
      </div>
    </CoordinadorLayout>
  );
};

export default Backlog;
