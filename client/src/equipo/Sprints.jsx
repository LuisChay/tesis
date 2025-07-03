import React, { useState, useEffect } from "react";
import EquipoLayout from "./EquipoLayout";
import Swal from "sweetalert2";
import GradoSelector from "./GradoSelector";

const SprintPlanner = () => {
  const [sprints, setSprints] = useState([]);
  const [grados, setGrados] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    nombre: "",
    meta: "",
    fechaInicio: "",
    fechaFin: "",
    curso_id: "",
  });

  const [form, setForm] = useState({
    nombre: "",
    meta: "",
    fechaInicio: "",
    fechaFin: "",
    curso_id: "",
  });

  const [gradoFiltro, setGradoFiltro] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const sprintsPaginados = sprints.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sprints.length / ITEMS_PER_PAGE);

  const [mostrarAlerta, setMostrarAlerta] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarAlerta(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const cambiarPagina = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  const formatearFecha = (fecha) => {
    if (!fecha) return "-";
    const d = new Date(fecha);
    const day = String(d.getDate()).padStart(2, "0");
    const month = [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ][d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    const usuario_id = JSON.parse(localStorage.getItem("usuario"))?.id;
    if (!usuario_id) return;

    fetch(`https://tesis-backend-3hgb.onrender.com/admin/get-grados-usuario/${usuario_id}`)
      .then((res) => res.json())
      .then(setGrados)
      .catch(() =>
        Swal.fire("Error", "No se pudieron cargar los grados", "error")
      );
  }, []);

  useEffect(() => {
    if (!gradoFiltro) return;
    fetch(`https://tesis-backend-3hgb.onrender.com/equipo/get-sprints-grado/${gradoFiltro}`)
      .then((res) => res.json())
      .then(setSprints)
      .catch(() => console.error("Error al cargar sprints filtrados"));
  }, [gradoFiltro]);

  const agregarSprint = async () => {
    if (
      !form.nombre ||
      !form.meta ||
      !form.fechaInicio ||
      !form.fechaFin ||
      !form.curso_id
    ) {
      return Swal.fire(
        "Campos incompletos",
        "Debes llenar todos los campos",
        "warning"
      );
    }

    try {
      const res = await fetch("https://tesis-backend-3hgb.onrender.com/equipo/create-sprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const gradoNombre =
        grados.find((g) => g.id === parseInt(form.curso_id))?.nombre || "—";

      setSprints((prev) => [
        ...prev,
        { ...form, id: data.id, grado: gradoNombre, estado: "Activo" },
      ]);

      setForm({
        nombre: "",
        meta: "",
        fechaInicio: "",
        fechaFin: "",
        curso_id: "",
      });
      Swal.fire("Registrado", "Sprint creado correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const startEdit = (sprint) => {
    setEditId(sprint.id);
    setEditData({
      nombre: sprint.nombre,
      meta: sprint.objetivo,
      fechaInicio: sprint.fecha_inicio?.slice(0, 10),
      fechaFin: sprint.fecha_fin?.slice(0, 10),
      curso_id: sprint.curso_id,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(
        `https://tesis-backend-3hgb.onrender.com/equipo/update-sprint/${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const gradoNombre =
        grados.find((g) => g.id === parseInt(editData.curso_id))?.nombre || "—";

      setSprints((prev) =>
        prev.map((s) =>
          s.id === editId
            ? {
                ...s,
                ...editData,
                objetivo: editData.meta,
                grado: gradoNombre,
              }
            : s
        )
      );

      setEditId(null);
      Swal.fire("Actualizado", "Sprint actualizado correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const eliminarSprint = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar sprint?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `https://tesis-backend-3hgb.onrender.com/equipo/delete-sprint/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSprints((prev) => prev.filter((s) => s.id !== id));
      Swal.fire("Eliminado", "Sprint eliminado correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <EquipoLayout>
      {/* FORMULARIO */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Planificación de Sprints
        </h1>

        {/* ALERTA */}
        {mostrarAlerta && (
          <div className="mb-6">
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md">
              <p className="text-sm">
                📅 Recuerda que esta 
                reunión de planificación debe realizarse cada <strong>lunes con una
                duración de 30 minutos</strong> para definir el objetivo de aprendizaje para la semana.
                <br></br>También recuerda que el Sprint debe durar <strong>una semana.</strong>
              </p>
            </div>
          </div>
        )}

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
              onChange={(e) =>
                setForm({ ...form, fechaInicio: e.target.value })
              }
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
      </div>

      {/* TABLA DE SPRINTS */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <div className="mb-6">
          <GradoSelector
            usuarioId={JSON.parse(localStorage.getItem("usuario"))?.id}
            gradoSeleccionado={gradoFiltro}
            onSelect={setGradoFiltro}
          />
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Sprints creados
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="px-4 py-2 border-b">Nombre</th>
                <th className="px-4 py-2 border-b">Meta</th>
                <th className="px-4 py-2 border-b">Inicio</th>
                <th className="px-4 py-2 border-b">Fin</th>
                <th className="px-4 py-2 border-b">Grado</th>
                <th className="px-4 py-2 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sprintsPaginados.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No hay sprints registrados.
                  </td>
                </tr>
              ) : (
                sprintsPaginados.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">
                      {editId === s.id ? (
                        <input
                          name="nombre"
                          value={editData.nombre}
                          onChange={handleEditChange}
                          className="w-full border rounded px-2 py-1"
                        />
                      ) : (
                        s.nombre
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {editId === s.id ? (
                        <textarea
                          name="meta"
                          value={editData.meta}
                          onChange={handleEditChange}
                          className="w-full border rounded px-2 py-1"
                        />
                      ) : (
                        s.objetivo
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {editId === s.id ? (
                        <input
                          type="date"
                          name="fechaInicio"
                          value={editData.fechaInicio}
                          onChange={handleEditChange}
                          className="w-full border rounded px-2 py-1"
                        />
                      ) : (
                        formatearFecha(s.fecha_inicio)
                      )}
                    </td>

                    <td className="px-4 py-2 border-b">
                      {editId === s.id ? (
                        <input
                          type="date"
                          name="fechaFin"
                          value={editData.fechaFin}
                          onChange={handleEditChange}
                          className="w-full border rounded px-2 py-1"
                        />
                      ) : (
                        formatearFecha(s.fecha_fin)
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {editId === s.id ? (
                        <select
                          name="curso_id"
                          value={editData.curso_id}
                          onChange={handleEditChange}
                          className="w-full border rounded px-2 py-1"
                        >
                          {grados.map((g) => (
                            <option key={g.id} value={g.id}>
                              {g.nombre}
                            </option>
                          ))}
                        </select>
                      ) : (
                        s.grado
                      )}
                    </td>
                    <td className="px-4 py-2 border-b space-x-2">
                      {editId === s.id ? (
                        <>
                          <button
                            onClick={saveEdit}
                            className="text-green-600 hover:underline"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditId(null)}
                            className="text-gray-600 hover:underline"
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(s)}
                            className="text-blue-600 hover:underline"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarSprint(s.id)}
                            className="text-red-600 hover:underline"
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => cambiarPagina(currentPage - 1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-semibold rounded disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="text-sm text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => cambiarPagina(currentPage + 1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-semibold rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </EquipoLayout>
  );
};

export default SprintPlanner;
