import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 5;

const AsignarGrados = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [grados, setGrados] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [gradoSeleccionado, setGradoSeleccionado] = useState("");

  // Estados para gestión de grados
  const [nuevoGrado, setNuevoGrado] = useState("");
  const [editGradoId, setEditGradoId] = useState(null);
  const [editGradoNombre, setEditGradoNombre] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageGrados, setCurrentPageGrados] = useState(1);

  const cargarUsuarios = () => {
    fetch("https://tesis-backend-3hgb.onrender.com/users/get-usuarios")
      .then((res) => res.json())
      .then((data) =>
        setUsuarios(data.filter((u) => u.rol_id !== 1 && u.rol_id !== 2))
      )
      .catch(() =>
        Swal.fire("Error", "No se pudieron cargar usuarios", "error")
      );
  };

  const cargarGrados = () => {
    fetch("https://tesis-backend-3hgb.onrender.com/admin/get-grados")
      .then((res) => res.json())
      .then(setGrados)
      .catch(() =>
        Swal.fire("Error", "No se pudieron cargar los grados", "error")
      );
  };

  const cargarAsignaciones = (id) => {
    fetch(`https://tesis-backend-3hgb.onrender.com/admin/get-grados-usuario/${id}`)
      .then((res) => res.json())
      .then(setAsignaciones)
      .catch(() => setAsignaciones([]));
  };

  useEffect(() => {
    cargarUsuarios();
    cargarGrados();
  }, []);

  useEffect(() => {
    if (usuarioSeleccionado) cargarAsignaciones(usuarioSeleccionado);
  }, [usuarioSeleccionado]);

  // Funciones para gestión de grados
  const agregarGrado = () => {
    if (!nuevoGrado.trim()) {
      return Swal.fire("Error", "Debe ingresar el nombre del grado", "warning");
    }
    fetch("https://tesis-backend-3hgb.onrender.com/admin/create-grado", {
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
      return Swal.fire(
        "Error",
        "El nombre del grado no puede estar vacío",
        "warning"
      );
    }
    fetch(`https://tesis-backend-3hgb.onrender.com/admin/update-grado/${editGradoId}`, {
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
          const res = await fetch(
            `https://tesis-backend-3hgb.onrender.com/admin/delete-grado/${id}`,
            { method: "DELETE" }
          );
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

  const asignarGrado = async () => {
    if (!usuarioSeleccionado || !gradoSeleccionado) {
      return Swal.fire(
        "Atención",
        "Debe seleccionar usuario y grado",
        "warning"
      );
    }

    const body = {
      usuario_id: usuarioSeleccionado,
      grado_id: gradoSeleccionado,
    };

    try {
      const res = await fetch("https://tesis-backend-3hgb.onrender.com/admin/asignar-grado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      Swal.fire("Éxito", "Grado asignado correctamente", "success");
      setGradoSeleccionado("");
      cargarAsignaciones(usuarioSeleccionado);
    } catch (err) {
      Swal.fire("Error", err.message || "No se pudo asignar", "error");
    }
  };

  const eliminarAsignacion = async (grado_id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar asignación?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `https://tesis-backend-3hgb.onrender.com/admin/eliminar-asignacion/${usuarioSeleccionado}/${grado_id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Error al eliminar");
      Swal.fire("Eliminado", "Asignación eliminada correctamente", "success");
      cargarAsignaciones(usuarioSeleccionado);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // Paginación para asignaciones
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginados = asignaciones.slice(startIndex, endIndex);
  const totalPages = Math.ceil(asignaciones.length / ITEMS_PER_PAGE);

  // Paginación para grados
  const startIndexGrados = (currentPageGrados - 1) * ITEMS_PER_PAGE;
  const endIndexGrados = startIndexGrados + ITEMS_PER_PAGE;
  const gradosPaginados = grados.slice(startIndexGrados, endIndexGrados);
  const totalPagesGrados = Math.ceil(grados.length / ITEMS_PER_PAGE);

  const cambiarPaginaGrados = (page) => {
    if (page < 1 || page > totalPagesGrados) return;
    setCurrentPageGrados(page);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto p-6 space-y-10">
        {/* Gestión de grados */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            Gestión de grados
          </h2>
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

          {/* Controles de paginación para grados */}
          {totalPagesGrados > 1 && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => cambiarPaginaGrados(currentPageGrados - 1)}
                disabled={currentPageGrados === 1}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-semibold rounded disabled:opacity-50"
              >
                Anterior
              </button>

              <span className="text-sm text-gray-700">
                Página {currentPageGrados} de {totalPagesGrados}
              </span>

              <button
                onClick={() => cambiarPaginaGrados(currentPageGrados + 1)}
                disabled={currentPageGrados === totalPagesGrados}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-semibold rounded disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>

        {/* Asignación de grados a profesores */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">
            Asignación de grados a profesores
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <select
              value={usuarioSeleccionado}
              onChange={(e) => setUsuarioSeleccionado(e.target.value)}
              className="border rounded px-4 py-2"
            >
              <option value="">Seleccionar usuario</option>
              {usuarios.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombre_completo}
                </option>
              ))}
            </select>

            <select
              value={gradoSeleccionado}
              onChange={(e) => setGradoSeleccionado(e.target.value)}
              className="border rounded px-4 py-2"
              disabled={!usuarioSeleccionado}
            >
              <option value="">Seleccionar grado</option>
              {grados.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end mb-6">
            <button
              onClick={asignarGrado}
              disabled={!usuarioSeleccionado || !gradoSeleccionado}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Asignar grado
            </button>
          </div>

          {usuarioSeleccionado && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Grados asignados</h3>

              {asignaciones.length === 0 ? (
                <p className="text-gray-500">
                  Este usuario no tiene grados asignados.
                </p>
              ) : (
                <table className="w-full table-auto border-t">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="py-2 px-3">Grado</th>
                      <th className="py-2 px-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginados.map((g) => (
                      <tr key={g.id} className="border-t hover:bg-gray-50">
                        <td className="py-2 px-3">{g.nombre}</td>
                        <td className="py-2 px-3">
                          <button
                            onClick={() => eliminarAsignacion(g.id)}
                            className="text-red-600 hover:underline"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <span className="text-sm text-gray-700">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AsignarGrados;