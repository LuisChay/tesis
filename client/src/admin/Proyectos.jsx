import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import AdminLayout from "./AdminLayout";

const ITEMS_PER_PAGE = 5;

const AdminProyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [grados, setGrados] = useState([]);
  const [responsables, setResponsables] = useState([]);

  const [nuevoGrado, setNuevoGrado] = useState("");
  const [editGradoId, setEditGradoId] = useState(null);
  const [editGradoNombre, setEditGradoNombre] = useState("");

     const [currentPage, setCurrentPage] = useState(1);

  // Calcular índices para slice
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const gradosPaginados = grados.slice(startIndex, endIndex);

  // Número total de páginas
  const totalPages = Math.ceil(grados.length / ITEMS_PER_PAGE);

  // Función para cambiar página
  const cambiarPagina = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const [formProyecto, setFormProyecto] = useState({
    titulo: "",
    objetivo: "",
    grado: "",
    responsable: "",
    fechaInicio: "",
    fechaFin: "",
  });

  useEffect(() => {
    cargarGrados();
    cargarCoordinadores();
    cargarProyectos();
  }, []);

  const cargarGrados = () => {
    fetch("http://localhost:5100/admin/get-grados")
      .then((res) => res.json())
      .then(setGrados)
      .catch(() => Swal.fire("Error", "No se pudieron cargar los grados", "error"));
  };

  const cargarCoordinadores = () => {
    fetch("http://localhost:5100/users/get-usuarios")
      .then((res) => res.json())
      .then((usuarios) => setResponsables(usuarios.filter((u) => u.rol_id === 2)))
      .catch(() => Swal.fire("Error", "No se pudieron cargar los responsables", "error"));
  };

  const cargarProyectos = () => {
    fetch("http://localhost:5100/admin/get-proyectos")
      .then((res) => res.json())
      .then(setProyectos)
      .catch(() => Swal.fire("Error", "No se pudieron cargar los proyectos", "error"));
  };

  // Crear grado
  const agregarGrado = () => {
    if (!nuevoGrado.trim()) {
      return Swal.fire("Error", "Debe ingresar el nombre del grado", "warning");
    }
    fetch("http://localhost:5100/admin/create-grado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nuevoGrado.trim() }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error creando grado");
        Swal.fire("Éxito", "Grado creado correctamente", "success");
        setNuevoGrado("");
        cargarGrados();
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };

  // Inicio edición grado
  const iniciarEdicionGrado = (grado) => {
    setEditGradoId(grado.id);
    setEditGradoNombre(grado.nombre);
  };

  // Cancelar edición grado
  const cancelarEdicionGrado = () => {
    setEditGradoId(null);
    setEditGradoNombre("");
  };

  // Guardar edición grado
  const guardarEdicionGrado = () => {
    if (!editGradoNombre.trim()) {
      return Swal.fire("Error", "El nombre del grado no puede estar vacío", "warning");
    }
    fetch(`http://localhost:5100/admin/update-grado/${editGradoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: editGradoNombre.trim() }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error actualizando grado");
        Swal.fire("Éxito", "Grado actualizado correctamente", "success");
        cancelarEdicionGrado();
        cargarGrados();
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };

  // Eliminar grado
  const eliminarGrado = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el grado permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Eliminando grado con ID:", id);
        try {
          const res = await fetch(`http://localhost:5100/admin/delete-grado/${id}`, { method: "DELETE" });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Error eliminando grado");
          Swal.fire("Eliminado", "Grado eliminado correctamente", "success");
          if (editGradoId === id) cancelarEdicionGrado();
          cargarGrados();
        } catch (err) {
          Swal.fire("Error", err.message, "error");
        }
      }
    });
  };

  // Manejo formulario proyecto
  const handleChangeProyecto = (e) => {
    const { name, value } = e.target;
    setFormProyecto((f) => ({ ...f, [name]: value }));
  };

  // Crear proyecto
  const agregarProyecto = () => {
    const { titulo, objetivo, grado } = formProyecto;
    if (!titulo.trim() || !objetivo.trim() || !grado) {
      return Swal.fire("Error", "Complete los campos obligatorios del proyecto", "warning");
    }
    const data = {
      nombre: titulo.trim(),
      objetivos: objetivo.trim(),
      curso_id: Number(formProyecto.grado),
      responsable_id: formProyecto.responsable ? Number(formProyecto.responsable) : null,
      fecha_inicio: formProyecto.fechaInicio || null,
      fecha_fin: formProyecto.fechaFin || null,
      actividades: "",
    };
    fetch("http://localhost:5100/admin/create-proyecto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const resp = await res.json();
        if (!res.ok) throw new Error(resp.error || "Error creando proyecto");
        Swal.fire("Éxito", "Proyecto creado correctamente", "success");
        setFormProyecto({
          titulo: "",
          objetivo: "",
          grado: "",
          responsable: "",
          fechaInicio: "",
          fechaFin: "",
        });
        cargarProyectos();
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };

  // Editar proyecto (modal simple con solo título para demo, se puede mejorar)
  const editarProyecto = async (proyecto) => {
    const { value: titulo } = await Swal.fire({
      title: "Editar Título del proyecto",
      input: "text",
      inputLabel: "Título",
      inputValue: proyecto.titulo,
      showCancelButton: true,
      inputValidator: (v) => !v && "El título es obligatorio",
    });

    if (titulo) {
      try {
        const res = await fetch(`http://localhost:5100/admin/update-proyecto/${proyecto.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...proyecto, nombre: titulo }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error actualizando proyecto");
        Swal.fire("Éxito", "Proyecto actualizado", "success");
        cargarProyectos();
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  // Eliminar proyecto
  const eliminarProyecto = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el proyecto permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5100/admin/delete-proyecto/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Error eliminando proyecto");
          Swal.fire("Eliminado", "Proyecto eliminado correctamente", "success");
          cargarProyectos();
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });

 
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto p-6 space-y-10">

        {/* Crear grado y gestión con edición en tabla */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Gestión de grados</h2>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Nuevo grado"
              className="flex-grow border px-4 py-2 rounded-md"
              value={nuevoGrado}
              onChange={(e) => setNuevoGrado(e.target.value)}
              disabled={editGradoId !== null}
            />
            <button
              onClick={agregarGrado}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={editGradoId !== null}
            >
              Agregar Grado
            </button>
          </div>

          {/* Tabla grados con paginación */}
<table className="w-full table-auto text-sm border-t pt-4">
  <thead>
    <tr className="text-left bg-gray-100">
      <th className="py-2 px-3">Nombre</th>
      <th className="py-2 px-3">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {gradosPaginados.length === 0 ? (
      <tr>
        <td colSpan={2} className="text-center py-4 text-gray-500">
          No hay grados creados aún.
        </td>
      </tr>
    ) : (
      gradosPaginados.map((grado) => (
        <tr key={grado.id} className="border-t">
          <td className="py-2 px-3">
            {editGradoId === grado.id ? (
              <input
                type="text"
                value={editGradoNombre}
                onChange={(e) => setEditGradoNombre(e.target.value)}
                className="w-full border px-2 py-1 rounded"
              />
            ) : (
              grado.nombre
            )}
          </td>
          <td className="py-2 px-3 space-x-3">
            {editGradoId === grado.id ? (
              <>
                <button
                  onClick={guardarEdicionGrado}
                  className="text-yellow-600 hover:underline"
                >
                  Guardar
                </button>
                <button
                  onClick={cancelarEdicionGrado}
                  className="text-gray-600 hover:underline"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => iniciarEdicionGrado(grado)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarGrado(grado.id)}
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

{/* Controles de paginación */}
<div className="flex justify-center space-x-4 mt-4">
  <button
    onClick={() => cambiarPagina(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Anterior
  </button>
  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i + 1}
      onClick={() => cambiarPagina(i + 1)}
      className={`px-3 py-1 rounded ${
        currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
      }`}
    >
      {i + 1}
    </button>
  ))}
  <button
    onClick={() => cambiarPagina(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Siguiente
  </button>
</div>


          
        </div>

        {/* Formulario creación proyecto */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Crear nuevo proyecto</h2>
          <input
            name="titulo"
            value={formProyecto.titulo}
            onChange={handleChangeProyecto}
            className="w-full border px-4 py-2 rounded-md mb-3"
            placeholder="Título del proyecto"
          />
          <textarea
            name="objetivo"
            value={formProyecto.objetivo}
            onChange={handleChangeProyecto}
            className="w-full border px-4 py-2 rounded-md mb-3"
            placeholder="Objetivo general"
          />
          <select
            name="grado"
            value={formProyecto.grado}
            onChange={handleChangeProyecto}
            className="w-full border px-4 py-2 rounded-md mb-3"
          >
            <option value="">-- Seleccione grado o área --</option>
            {grados.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nombre}
              </option>
            ))}
          </select>
          <select
            name="responsable"
            value={formProyecto.responsable}
            onChange={handleChangeProyecto}
            className="w-full border px-4 py-2 rounded-md mb-3"
          >
            <option value="">-- Seleccione responsable --</option>
            {responsables.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nombre_completo}
              </option>
            ))}
          </select>
          <div className="flex gap-4 mb-3">
            <input
              type="date"
              name="fechaInicio"
              value={formProyecto.fechaInicio}
              onChange={handleChangeProyecto}
              className="w-full border px-4 py-2 rounded-md"
            />
            <input
              type="date"
              name="fechaFin"
              value={formProyecto.fechaFin}
              onChange={handleChangeProyecto}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>
          <button
            onClick={agregarProyecto}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Guardar proyecto
          </button>
        </div>

        {/* Tabla proyectos */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Proyectos existentes</h2>
          <table className="w-full table-auto text-sm border-t">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="py-2 px-3">Título</th>
                <th className="py-2 px-3">Grado / Área</th>
                <th className="py-2 px-3">Responsable</th>
                <th className="py-2 px-3">Fechas</th>
                <th className="py-2 px-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No hay proyectos creados aún.
                  </td>
                </tr>
              ) : (
                proyectos.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="py-2 px-3">{p.titulo}</td>
                    <td className="py-2 px-3">{p.grado}</td>
                    <td className="py-2 px-3">{p.responsable || "-"}</td>
                    <td className="py-2 px-3">
                      {p.fechaInicio
                        ? new Date(p.fechaInicio).toLocaleDateString("es-GT", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}{" "}
                      -{" "}
                      {p.fechaFin
                        ? new Date(p.fechaFin).toLocaleDateString("es-GT", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="py-2 px-3 space-x-3">
                      <button
                        onClick={() => editarProyecto(p)}
                        className="text-blue-600 hover:underline"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarProyecto(p.id)}
                        className="text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProyectos;
