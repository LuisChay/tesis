import React, { useState, useEffect } from "react";
import CoordinadorLayout from "./CoordinadorLayout";
import Swal from "sweetalert2";

const EvaluacionContinua = () => {
  const [form, setForm] = useState({
    usuario_id: "",
    tarea_id: "",
    retroalimentacion: "",
    nota: "",
  });

  const [tareas, setTareas] = useState([]);
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    tarea_id: "",
    nota: "",
    retroalimentacion: "",
  });

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const evaluadorId = usuario?.id;

  const [currentPageEvaluaciones, setCurrentPageEvaluaciones] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5100/coord/get-backlog-by-user/" + evaluadorId)
      .then((res) => res.json())
      .then(setTareas)
      .catch(() => console.error("Error al cargar tareas"));
  }, [evaluadorId]);

  useEffect(() => {
    if (evaluadorId) {
      fetch(`http://localhost:5100/coord/get-evaluaciones/${evaluadorId}`)
        .then((res) => res.json())
        .then(setEvaluaciones)
        .catch(() => console.error("Error al cargar las evaluaciones"));
    }
  }, [evaluadorId]);

  const ITEMS_PER_PAGE = 5;
  const startIndexEvaluaciones = (currentPageEvaluaciones - 1) * ITEMS_PER_PAGE;
  const endIndexEvaluaciones = startIndexEvaluaciones + ITEMS_PER_PAGE;
  const evaluacionesPaginadas = evaluaciones.slice(
    startIndexEvaluaciones,
    endIndexEvaluaciones
  );
  const totalPagesEvaluaciones = Math.ceil(
    evaluaciones.length / ITEMS_PER_PAGE
  );

  const cambiarPaginaEvaluaciones = (page) => {
    if (page < 1 || page > totalPagesEvaluaciones) return;
    setCurrentPageEvaluaciones(page);
  };

  const guardarEvaluacion = async () => {
    const { tarea_id, nota } = form;
    const usuario_id = usuario?.id;

    if (!usuario_id || !tarea_id || !nota) {
      return Swal.fire(
        "Faltan campos",
        "Completa todos los campos obligatorios",
        "warning"
      );
    }

    try {
      const res = await fetch("http://localhost:5100/coord/create-evaluacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          evaluado_por: evaluadorId,
          usuario_id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const tareaNombre =
        tareas.find((t) => t.id === Number(form.tarea_id))?.titulo || "—";

      setEvaluaciones((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now(),
          tarea: tareaNombre,
        },
      ]);

      setForm({
        usuario_id: "",
        tarea_id: "",
        retroalimentacion: "",
        nota: "",
      });

      Swal.fire("¡Éxito!", "Evaluación registrada correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const eliminarEvaluacion = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar evaluación?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `http://localhost:5100/coord/delete-evaluacion/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setEvaluaciones((prev) => prev.filter((e) => e.id !== id));
      Swal.fire("Eliminada", "Evaluación eliminada correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const startEdit = (evaluacion) => {
    setEditId(evaluacion.id);
    setEditData({
      tarea_id: evaluacion.tarea_id,
      nota: evaluacion.nota,
      retroalimentacion: evaluacion.retroalimentacion,
    });
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value, 
    }));
  };

  const saveEdit = async () => {
    const { tarea_id, nota, retroalimentacion } = editData;

    if (!tarea_id || !nota || !retroalimentacion) {
      return Swal.fire(
        "Faltan campos",
        "Completa todos los campos obligatorios",
        "warning"
      );
    }

    try {
      const res = await fetch(
        `http://localhost:5100/coord/update-evaluacion/${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tarea_id, nota, retroalimentacion }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setEvaluaciones((prev) =>
        prev.map((e) => (e.id === editId ? { ...e, ...editData } : e))
      );
      setEditId(null);
      Swal.fire(
        "Actualizada",
        "Evaluación actualizada correctamente",
        "success"
      );
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <CoordinadorLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Evaluación continua del equipo
        </h1>

        {/* Formulario para agregar evaluación */}
        <div className="space-y-4 mb-8">
          <select
            value={form.tarea_id}
            onChange={(e) => setForm({ ...form, tarea_id: e.target.value })}
            className="w-full border rounded px-4 py-2"
          >
            <option value="">Selecciona una tarea</option>
            {tareas.map((t) => (
              <option key={t.id} value={t.id}>
                {t.titulo}
              </option>
            ))}
          </select>

          <textarea
            value={form.retroalimentacion}
            onChange={(e) =>
              setForm({ ...form, retroalimentacion: e.target.value })
            }
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
            onClick={guardarEvaluacion}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar evaluación
          </button>
        </div>
      </div>

      {/* Tabla de evaluaciones registradas */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Evaluaciones realizadas
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm border-collapse">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="px-4 py-2 border-b">Evaluador</th>
                <th className="px-4 py-2 border-b">Grado</th>
                <th className="px-4 py-2 border-b">Actividad</th>
                <th className="px-4 py-2 border-b">Nota</th>
                <th className="px-4 py-2 border-b">Retroalimentación</th>
                <th className="px-4 py-2 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {evaluacionesPaginadas.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No hay evaluaciones registradas.
                  </td>
                </tr>
              ) : (
                evaluacionesPaginadas.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b font-medium text-gray-800">
                      {e.estudiante}
                    </td>
                    <td className="px-4 py-3 border-b text-gray-700">
                      {e.grado || "—"}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {editId === e.id ? (
                        <select
                          name="tarea_id"
                          value={editData.tarea_id}
                          onChange={handleEditChange}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        >
                          <option value="">Selecciona una tarea</option>
                          {tareas.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.titulo}
                            </option>
                          ))}
                        </select>
                      ) : (
                        e.backlog
                      )}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {editId === e.id ? (
                        <input
                          type="number"
                          name="nota"
                          value={editData.nota}
                          onChange={handleEditChange}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        e.nota
                      )}
                    </td>
                    <td className="px-4 py-3 border-b text-gray-600 italic">
                      {editId === e.id ? (
                        <textarea
                          name="retroalimentacion"
                          value={editData.retroalimentacion}
                          onChange={handleEditChange}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        e.retroalimentacion
                      )}
                    </td>
                    <td className="px-4 py-3 border-b space-x-3">
                      {editId === e.id ? (
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
                            onClick={() => startEdit(e)}
                            className="text-blue-600 hover:underline"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarEvaluacion(e.id)}
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

          {/* Paginador para evaluaciones */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() =>
                cambiarPaginaEvaluaciones(currentPageEvaluaciones - 1)
              }
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-semibold rounded disabled:opacity-50"
              disabled={currentPageEvaluaciones === 1}
            >
              Anterior
            </button>

            <span className="text-sm text-gray-700">
              Página {currentPageEvaluaciones} de {totalPagesEvaluaciones}
            </span>

            <button
              onClick={() =>
                cambiarPaginaEvaluaciones(currentPageEvaluaciones + 1)
              }
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-semibold rounded disabled:opacity-50"
              disabled={currentPageEvaluaciones === totalPagesEvaluaciones}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </CoordinadorLayout>
  );
};

export default EvaluacionContinua;
