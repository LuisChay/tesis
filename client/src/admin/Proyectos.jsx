import React, { useState } from "react";
import AdminLayout from "./AdminLayout";

const AdminProyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    objetivo: "",
    grado: "",
    responsable: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const agregarProyecto = () => {
    if (!form.titulo || !form.objetivo || !form.grado) return;
    const nuevo = { ...form, id: Date.now() };
    setProyectos([...proyectos, nuevo]);
    setForm({
      titulo: "",
      objetivo: "",
      grado: "",
      responsable: "",
      fechaInicio: "",
      fechaFin: "",
    });
  };

  const eliminarProyecto = (id) => {
    setProyectos(proyectos.filter((p) => p.id !== id));
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Gestión de Proyectos Educativos
        </h1>

        {/* Formulario */}
        <div className="space-y-4 mb-6">
          <input
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Título del proyecto"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          />
          <textarea
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Objetivo general"
            value={form.objetivo}
            onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
          />
          <input
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Grado o nivel"
            value={form.grado}
            onChange={(e) => setForm({ ...form, grado: e.target.value })}
          />
          <input
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Responsable asignado"
            value={form.responsable}
            onChange={(e) => setForm({ ...form, responsable: e.target.value })}
          />
          <div className="flex gap-4">
            <input
              type="date"
              className="w-full border px-4 py-2 rounded-md"
              value={form.fechaInicio}
              onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })}
            />
            <input
              type="date"
              className="w-full border px-4 py-2 rounded-md"
              value={form.fechaFin}
              onChange={(e) => setForm({ ...form, fechaFin: e.target.value })}
            />
          </div>
          <button
            onClick={agregarProyecto}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar proyecto
          </button>
        </div>

        {/* Tabla de proyectos */}
        <table className="w-full table-auto text-sm border-t pt-4">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="py-2 px-3">Título</th>
              <th className="py-2 px-3">Grado</th>
              <th className="py-2 px-3">Responsable</th>
              <th className="py-2 px-3">Fechas</th>
              <th className="py-2 px-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="py-2 px-3">{p.titulo}</td>
                <td className="py-2 px-3">{p.grado}</td>
                <td className="py-2 px-3">{p.responsable}</td>
                <td className="py-2 px-3">
                  {p.fechaInicio} - {p.fechaFin}
                </td>
                <td className="py-2 px-3">
                  <button
                    onClick={() => eliminarProyecto(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminProyectos;
