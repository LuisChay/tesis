import React, { useState, useEffect } from "react";
import CoordinadorLayout from "./CoordinadorLayout";
import Swal from "sweetalert2";

const Backlog = () => {
  const [tareas, setTareas] = useState([]);
  const [grados, setGrados] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    curso: "",
    proyecto_id: "",
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    titulo: "",
    descripcion: "",
    curso_id: "",
    proyecto_id: "",
  });

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const creado_por = usuario?.id;

  useEffect(() => {
    fetch("http://localhost:5100/admin/get-grados")
      .then((res) => res.json())
      .then(setGrados)
      .catch(() => console.error("Error al cargar grados"));
  }, []);


useEffect(() => {
  fetch("http://localhost:5100/admin/get-proyectos")
    .then((res) => res.json())
    .then((data) => {
      const proyectosAsignados = data.filter(p => p.responsable_id === creado_por);
      setProyectos(proyectosAsignados);

      // ✅ Ahora cargamos tareas con proyectos ya listos
      fetch(`http://localhost:5100/coord/get-backlog-by-user/${creado_por}`)
        .then((res) => res.json())
        .then((data) => {
          const tareasConProyecto = data.map(t => {
            const proyecto = proyectosAsignados.find(p => p.id === t.proyecto_id);
            return {
              ...t,
              proyecto_id: t.proyecto_id,
              proyecto: proyecto ? proyecto.titulo : "—"
            };
          });
          setTareas(tareasConProyecto);
        });
    })
    .catch(() => console.error("Error al cargar proyectos o tareas"));
}, [creado_por]);




  const agregarTarea = async () => {
    if (!formData.titulo || !formData.descripcion || !formData.curso || !formData.proyecto_id) {
      return Swal.fire("Campos incompletos", "Debes llenar todos los campos", "warning");
    }

    try {
      const res = await fetch("http://localhost:5100/coord/create-backlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: formData.titulo,
          descripcion: formData.descripcion,
          curso_id: formData.curso,
          creado_por,
          proyecto_id: formData.proyecto_id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const gradoNombre = grados.find(g => g.id === Number(formData.curso))?.nombre || "—";

      setTareas(prev => [
        ...prev,
        {
          id: data.id,
          titulo: formData.titulo,
          descripcion: formData.descripcion,
          curso_id: formData.curso,
          grado: gradoNombre,
          proyecto_id: formData.proyecto_id,
        },
      ]);

      setFormData({ titulo: "", descripcion: "", curso: "", proyecto_id: "" });

      Swal.fire("Registrado", "Tarea agregada correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

const startEdit = (tarea) => {
  setEditId(tarea.id);
  setEditData({
    titulo: tarea.titulo,
    descripcion: tarea.descripcion,
    curso_id: String(tarea.curso_id),
    proyecto_id: String(tarea.proyecto_id ?? ""), // 🔧
  });
};


  const cancelEdit = () => {
    setEditId(null);
    setEditData({ titulo: "", descripcion: "", curso_id: "", proyecto_id: "" });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    if (
      !editData.titulo.trim() ||
      !editData.descripcion.trim() ||
      !editData.curso_id ||
      !editData.proyecto_id
    ) {
      return Swal.fire("Error", "Faltan campos obligatorios", "error");
    }

    try {
      const res = await fetch(`http://localhost:5100/coord/update-backlog/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: editData.titulo,
          descripcion: editData.descripcion,
          curso_id: editData.curso_id,
          proyecto_id: editData.proyecto_id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const gradoNombre = grados.find(g => g.id === Number(editData.curso_id))?.nombre || "—";

      const proyectoNombre = proyectos.find(p => p.id === Number(editData.proyecto_id))?.titulo || "—";

      setTareas(prev =>
        prev.map(t =>
          t.id === editId
            ? { ...t, ...editData, grado: gradoNombre, proyecto: proyectoNombre }
            : t
        )
      );


      cancelEdit();
      Swal.fire("Actualizado", "Tarea actualizada correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const deleteTarea = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar tarea?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:5100/coord/delete-backlog/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setTareas(prev => prev.filter(t => t.id !== id));
      Swal.fire("Eliminado", "Tarea eliminada correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <CoordinadorLayout>
      <div className="max-w-6xl mx-auto p-6 my-10 space-y-10">
        {/* FORMULARIO DE CREACIÓN */}
        <div className="bg-white p-6 shadow-md rounded-md border">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Crear nueva tarea del backlog</h2>
          <div className="space-y-4">
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
              value={formData.proyecto_id}
              onChange={(e) => setFormData({ ...formData, proyecto_id: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="">Selecciona un proyecto</option>
              {proyectos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.titulo}
                </option>
              ))}
            </select>

            <div className="text-sm text-gray-600">
              Grado asignado por el administrador:{" "}
              <span className="font-semibold">
                {proyectos.find(p => p.id === Number(formData.proyecto_id))?.grado || "—"}
              </span>
            </div>

            <select
              value={formData.curso}
              onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="">Selecciona un grado</option>
              {grados.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nombre}
                </option>
              ))}
            </select>

            <button
              onClick={agregarTarea}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Agregar tarea
            </button>
          </div>
        </div>

        {/* TABLA DE TAREAS */}
        <div className="bg-white p-6 shadow-md rounded-md border">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Tareas registradas</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 uppercase text-xs">
                  <th className="px-4 py-2 border-b">Título</th>
                  <th className="px-4 py-2 border-b">Descripción</th>
                  <th className="px-4 py-2 border-b">Grado</th>
                  <th className="px-4 py-2 border-b">Proyecto</th>
                  <th className="px-4 py-2 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tareas.map((tarea) => (
                  <tr key={tarea.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">
                      {editId === tarea.id ? (
                        <input
                          type="text"
                          name="titulo"
                          value={editData.titulo}
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                        />
                      ) : tarea.titulo}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {editId === tarea.id ? (
                        <textarea
                          name="descripcion"
                          value={editData.descripcion}
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                        />
                      ) : tarea.descripcion}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {editId === tarea.id ? (
                        <select
                          name="curso_id"
                          value={editData.curso_id}
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                        >
                          {grados.map((g) => (
                            <option key={g.id} value={g.id}>
                              {g.nombre}
                            </option>
                          ))}
                        </select>
                      ) : tarea.grado || "—"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {editId === tarea.id ? (
                        <select
                          name="proyecto_id"
                          value={editData.proyecto_id}
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                        >
                          {proyectos.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.titulo}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span>{tarea.proyecto || "—"}</span>
                      )}
                    </td>

                    <td className="px-4 py-2 border-b space-x-4">
                      {editId === tarea.id ? (
                        <>
                          <button onClick={saveEdit} className="text-green-600 hover:underline">Guardar</button>
                          <button onClick={cancelEdit} className="text-gray-600 hover:underline">Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(tarea)} className="text-blue-600 hover:underline">Editar</button>
                          <button onClick={() => deleteTarea(tarea.id)} className="text-red-600 hover:underline">Eliminar</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CoordinadorLayout>
  );
};

export default Backlog;
