import React, { useState, useEffect } from "react";
import EquipoLayout from "./EquipoLayout";
import Swal from "sweetalert2";

const SprintPlanner = () => {
  const [sprints, setSprints] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    meta: "",
    fechaInicio: "",
    fechaFin: "",
    curso_id: "", // Para seleccionar el grado (curso) al que pertenece el sprint
  });

  const [grados, setGrados] = useState([]); // Lista de grados disponibles

  useEffect(() => {
    // Cargar grados disponibles (cursos)
    fetch("http://localhost:5100/admin/get-grados")
      .then((res) => res.json())
      .then(setGrados)
      .catch(() => console.error("Error al cargar grados"));
    
    // Cargar los sprints ya existentes
    fetch("http://localhost:5100/equipo/get-sprints")
      .then((res) => res.json())
      .then(setSprints)
      .catch(() => console.error("Error al cargar sprints"));
  }, []);

const agregarSprint = async () => {
  // Verificar si todos los campos están correctamente llenados
  if (
    !form.nombre ||
    !form.meta ||
    !form.fechaInicio ||
    !form.fechaFin ||
    !form.curso_id
  ) {
    return Swal.fire("Campos incompletos", "Debes llenar todos los campos", "warning");
  }

  console.log("Datos que se están enviando al servidor:", form);  // Verificación en consola

  try {
    const res = await fetch("http://localhost:5100/equipo/create-sprint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form), // Asegúrate de que todo el formulario esté correctamente serializado
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    // Actualizar la lista de sprints
    setSprints((prev) => [...prev, data]);

    setForm({
      nombre: "",
      meta: "",
      fechaInicio: "",
      fechaFin: "",
      curso_id: "", // Reseteamos el curso_id después de enviar
    });

    Swal.fire("Registrado", "Sprint creado correctamente", "success");
  } catch (err) {
    console.log("Error al crear el sprint:", err);  // Mostrar error detallado
    Swal.fire("Error", err.message, "error");
  }
};

  const cerrarSprint = async (id) => {
    try {
      const res = await fetch(`http://localhost:5100/equipo/close-sprint/${id}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Actualizar el estado del sprint a cerrado
      setSprints((prev) =>
        prev.map((s) => (s.id === id ? { ...s, estado: "Cerrado" } : s))
      );

      Swal.fire("Sprint cerrado", "El sprint ha sido cerrado correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <EquipoLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Planificación de Sprints
        </h1>

        {/* Formulario de creación de sprint */}
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

          <select
            value={form.curso_id}
            onChange={(e) => setForm({ ...form, curso_id: e.target.value })}
            className="w-full border rounded px-4 py-2"
          >
            <option value="">Selecciona un curso</option>
            {grados.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nombre}
              </option>
            ))}
          </select>

          <button
            onClick={agregarSprint}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Crear Sprint
          </button>
        </div>

        {/* Listado de Sprints */}
        <h2 className="text-lg font-semibold mb-3">Sprints creados</h2>
        <ul className="space-y-3">
          {sprints.map((s) => (
            <li key={s.id} className="p-4 border rounded shadow-sm bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-md font-bold text-gray-800">{s.nombre}</h3>
                  <p className="text-sm text-gray-700 italic">Meta: {s.objetivo}</p>
                  <p className="text-sm text-gray-600">
                    {s.fecha_inicio} – {s.fecha_fin} | Estado:{" "}
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
