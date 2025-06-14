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

  const [currentPage, setCurrentPage] = useState(1);

  const cargarUsuarios = () => {
    fetch("http://localhost:5100/users/get-usuarios")
      .then((res) => res.json())
      .then((data) =>
        setUsuarios(data.filter((u) => u.rol_id !== 1 && u.rol_id !== 2))
      )
      .catch(() =>
        Swal.fire("Error", "No se pudieron cargar usuarios", "error")
      );
  };

  const cargarGrados = () => {
    fetch("http://localhost:5100/admin/get-grados")
      .then((res) => res.json())
      .then(setGrados)
      .catch(() =>
        Swal.fire("Error", "No se pudieron cargar los grados", "error")
      );
  };

  const cargarAsignaciones = (id) => {
    fetch(`http://localhost:5100/admin/get-grados-usuario/${id}`)
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
      const res = await fetch("http://localhost:5100/admin/asignar-grado", {
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
        `http://localhost:5100/admin/eliminar-asignacion/${usuarioSeleccionado}/${grado_id}`,
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

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginados = asignaciones.slice(startIndex, endIndex);
  const totalPages = Math.ceil(asignaciones.length / ITEMS_PER_PAGE);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
          Asignación de grados a profesores
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="flex justify-end">
          <button
            onClick={asignarGrado}
            disabled={!usuarioSeleccionado || !gradoSeleccionado}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Asignar grado
          </button>
        </div>

        {usuarioSeleccionado && (
          <div className="mt-6">
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
    </AdminLayout>
  );
};

export default AsignarGrados;
