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

const [currentPageGrados, setCurrentPageGrados] = useState(1);  // Paginación para grados
const [currentPageProyectos, setCurrentPageProyectos] = useState(1);  // Paginación para proyectos

  const [formProyecto, setFormProyecto] = useState({
    titulo: "",
    objetivo: "",
    grado: "",
    responsable: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const [editProyectoId, setEditProyectoId] = useState(null);
  const [editProyectoData, setEditProyectoData] = useState({
    titulo: "",
    objetivo: "",
    grado: "",
    responsable: "",
    fechaInicio: "",
    fechaFin: "",
  });

const startIndexGrados = (currentPageGrados - 1) * ITEMS_PER_PAGE;
const endIndexGrados = startIndexGrados + ITEMS_PER_PAGE;
const gradosPaginados = grados.slice(startIndexGrados, endIndexGrados);
const totalPagesGrados = Math.ceil(grados.length / ITEMS_PER_PAGE);

const startIndexProyectos = (currentPageProyectos - 1) * ITEMS_PER_PAGE;
const endIndexProyectos = startIndexProyectos + ITEMS_PER_PAGE;
const proyectosPaginados = proyectos.slice(startIndexProyectos, endIndexProyectos);
const totalPagesProyectos = Math.ceil(proyectos.length / ITEMS_PER_PAGE);



const cambiarPaginaGrados = (page) => {
  if (page < 1 || page > totalPagesGrados) return;
  setCurrentPageGrados(page);
};

const cambiarPaginaProyectos = (page) => {
  if (page < 1 || page > totalPagesProyectos) return;
  setCurrentPageProyectos(page);
};

  useEffect(() => {
    cargarGrados();
    cargarCoordinadores();
    cargarProyectos();
  }, []);

  // Cargar grados desde el backend
  const cargarGrados = () => {
    fetch("http://localhost:5100/admin/get-grados")
      .then((res) => res.json())
      .then(setGrados)
      .catch(() => Swal.fire("Error", "No se pudieron cargar los grados", "error"));
  };

const formatearFecha = (fecha) => {
  if (!fecha) return "-";
  const [year, month, day] = fecha.split("-");
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${day} ${meses[parseInt(month) - 1]} ${year}`;
};


  // Cargar coordinadores desde el backend
  const cargarCoordinadores = () => {
    fetch("http://localhost:5100/users/get-usuarios")
      .then((res) => res.json())
      .then((usuarios) => setResponsables(usuarios.filter((u) => u.rol_id === 2)))
      .catch(() => Swal.fire("Error", "No se pudieron cargar los responsables", "error"));
  };

  // Cargar proyectos desde el backend
const cargarProyectos = () => {
  fetch("http://localhost:5100/admin/get-proyectos")
    .then((res) => res.json())
    .then((data) => {
      const proyectosFormateados = data.map(p => ({
        ...p,
        fechaInicio: (p.fechaInicio || p.fecha_inicio || "").slice(0, 10),
        fechaFin: (p.fechaFin || p.fecha_fin || "").slice(0, 10),
      }));
      setProyectos(proyectosFormateados);
      console.log("Proyectos cargados:", proyectosFormateados);
    })
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

  // Funciones para manejar la edición de grados
  const iniciarEdicionGrado = (grado) => {
    setEditGradoId(grado.id);
    setEditGradoNombre(grado.nombre);
  };

  const cancelarEdicionGrado = () => {
    setEditGradoId(null);
    setEditGradoNombre("");
  };

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

  // Función para eliminar grado
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

  // Funciones para manejar la edición de proyectos
  const handleChangeProyecto = (e) => {
    const { name, value } = e.target;
    setFormProyecto((f) => ({ ...f, [name]: value }));
  };

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

const handleChangeEditProyecto = (e) => {
  const { name, value } = e.target;
  setEditProyectoData((prev) => ({
    ...prev,
    [name]: value
  }));
};

const editarProyecto = async (proyecto) => {
  const gradoEncontrado = grados.find(g => g.nombre === proyecto.grado);
  const responsableEncontrado = responsables.find(r => r.nombre_completo === proyecto.responsable);

  setEditProyectoId(proyecto.id);
  setEditProyectoData({
    titulo: proyecto.titulo || "",
    objetivo: proyecto.objetivo || "-",
    grado: gradoEncontrado?.id?.toString() || "", // ← usamos el ID
    responsable: responsableEncontrado?.id?.toString() || "",
    fechaInicio: (proyecto.fechaInicio || proyecto.fecha_inicio || "").slice(0, 10),
    fechaFin: (proyecto.fechaFin || proyecto.fecha_fin || "").slice(0, 10),
  });
};

const guardarEdicionProyecto = async () => {
  const {
    titulo,
    objetivo,
    grado,
    responsable,
    fechaInicio,
    fechaFin,
    _original = {}
  } = editProyectoData;

  if (!titulo.trim()) {
    return Swal.fire("Error", "El título es obligatorio", "error");
  }

  const data = {
    nombre: titulo.trim(),
    objetivos: objetivo || "-",
    curso_id: Number(grado || _original.grado),
    responsable_id: Number(responsable || _original.responsable),
    fecha_inicio: fechaInicio || _original.fechaInicio,
    fecha_fin: fechaFin || _original.fechaFin,
    actividades: "",
  };

  try {
    const res = await fetch(`http://localhost:5100/admin/update-proyecto/${editProyectoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Error al actualizar");
    Swal.fire("Éxito", "Proyecto actualizado correctamente", "success");
    setEditProyectoId(null);
    await cargarProyectos();
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
};

  // Agregar la función para cancelar la edición de un proyecto
const cancelarEdicionProyecto = () => {
  setEditProyectoId(null);
  setEditProyectoData({
    titulo: "",
    objetivo: "",
    grado: "",
    responsable: "",
    fechaInicio: "",
    fechaFin: "",
  });
};


  const eliminarProyecto = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el proyecto permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
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
  };
  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto p-6 space-y-10">

        {/* Crear grado y gestión con edición en tabla */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Gestión de grados</h2>
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
          <div className="flex justify-between items-center mt-4">

              <button
    onClick={() => cambiarPaginaGrados(currentPageGrados - 1)}
    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-semibold rounded disabled:opacity-50"
    disabled={currentPageGrados === 1}
  >
    Anterior
  </button>

  <span className="text-sm text-gray-700">
    Página {currentPageGrados} de {totalPagesGrados}
  </span>

  <button
    onClick={() => cambiarPaginaGrados(currentPageGrados + 1)}
    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-semibold rounded disabled:opacity-50"
    disabled={currentPageGrados === totalPagesGrados}
  >
    Siguiente
  </button>

          </div>
        </div>

        {/* Formulario de creación de proyecto */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Crear nuevo proyecto</h2>
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
            <option value="">Seleccione grado o área</option>
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
            <option value="">Seleccione responsable</option>
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

        {/* Tabla de proyectos */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Proyectos existentes</h2>
            <table className="w-full table-auto text-sm border-collapse">
          <thead>
                          <tr className="text-left bg-gray-100">

              <th className="px-4 py-2 border-b">Título</th>
              <th className="px-4 py-2 border-b">Grado</th>
              <th className="px-4 py-2 border-b">Responsable</th>
              <th className="px-4 py-2 border-b">Fechas</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
<tbody>
  {proyectosPaginados.map((proyecto) => (
    <tr key={proyecto.id} className="hover:bg-gray-50">
      <td className="px-4 py-3 border-b">
        {editProyectoId === proyecto.id ? (
          <input
            type="text"
            name="titulo"
            value={editProyectoData.titulo}
            onChange={handleChangeEditProyecto}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        ) : (
          proyecto.titulo
        )}
      </td>
      <td className="px-4 py-3 border-b">
        {editProyectoId === proyecto.id ? (
          <select
            name="grado"
            value={editProyectoData.grado}
            onChange={handleChangeEditProyecto}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="">Seleccionar grado</option>
            {grados.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nombre}
              </option>
            ))}
          </select>
        ) : (
          proyecto.grado
        )}
      </td>
      <td className="px-4 py-3 border-b">
        {editProyectoId === proyecto.id ? (
          <select
            name="responsable"
            value={editProyectoData.responsable}
            onChange={handleChangeEditProyecto}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="">Seleccionar responsable</option>
            {responsables.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nombre_completo}
              </option>
            ))}
          </select>
        ) : (
          proyecto.responsable
        )}
      </td>
      <td className="px-4 py-3 border-b">
        {editProyectoId === proyecto.id ? (
          <>
            <input
              type="date"
              name="fechaInicio"
              value={editProyectoData.fechaInicio}
              onChange={handleChangeEditProyecto}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
            <input
              type="date"
              name="fechaFin"
              value={editProyectoData.fechaFin}
              onChange={handleChangeEditProyecto}
              className="border border-gray-300 rounded px-2 py-1 w-full mt-2"
            />
          </>
        ) : (
          <>
            {formatearFecha(proyecto.fechaInicio)} - {formatearFecha(proyecto.fechaFin)}
          </>
        )}
      </td>
      <td className="px-4 py-3 border-b space-x-3">
        {editProyectoId === proyecto.id ? (
          <>
            <button
              onClick={guardarEdicionProyecto}
              className="text-green-600 hover:underline"
              type="button"
            >
              Guardar
            </button>
            <button
              onClick={cancelarEdicionProyecto}
              className="text-gray-600 hover:underline"
              type="button"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => editarProyecto(proyecto)}
              className="text-blue-600 hover:underline"
              type="button"
            >
              Editar
            </button>
            <button
              onClick={() => eliminarProyecto(proyecto.id)}
              className="text-red-600 hover:underline"
              type="button"
            >
              Eliminar
            </button>
          </>
        )}
      </td>
    </tr>
  ))}
</tbody>

        </table>

        {/* Paginador */}
<div className="flex justify-between items-center mt-4">
  <button
    onClick={() => cambiarPaginaProyectos(currentPageProyectos - 1)}
    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-semibold rounded"
    disabled={currentPageProyectos === 1}
  >
    Anterior
  </button>

  <span className="text-sm text-gray-700">
    Página {currentPageProyectos} de {totalPagesProyectos}
  </span>

  <button
    onClick={() => cambiarPaginaProyectos(currentPageProyectos + 1)}
    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-semibold rounded"
    disabled={currentPageProyectos === totalPagesProyectos}
  >
    Siguiente
  </button>
</div>


        </div>
      </div>
    </AdminLayout>
  );  
}
export default AdminProyectos;
