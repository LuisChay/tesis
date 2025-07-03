import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import AdminLayout from "./AdminLayout";

const ITEMS_PER_PAGE = 5;

const AdminProyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [grados, setGrados] = useState([]);
  const [responsables, setResponsables] = useState([]);

  const [currentPageProyectos, setCurrentPageProyectos] = useState(1);

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

  const startIndexProyectos = (currentPageProyectos - 1) * ITEMS_PER_PAGE;
  const endIndexProyectos = startIndexProyectos + ITEMS_PER_PAGE;
  const proyectosPaginados = proyectos.slice(
    startIndexProyectos,
    endIndexProyectos
  );
  const totalPagesProyectos = Math.ceil(proyectos.length / ITEMS_PER_PAGE);

  const cambiarPaginaProyectos = (page) => {
    if (page < 1 || page > totalPagesProyectos) return;
    setCurrentPageProyectos(page);
  };

  useEffect(() => {
    cargarGrados();
    cargarCoordinadores();
    cargarProyectos();
  }, []);

  const cargarGrados = () => {
    fetch("https://tesis-backend-3hgb.onrender.com/admin/get-grados")
      .then((res) => res.json())
      .then(setGrados)
      .catch(() =>
        Swal.fire("Error", "No se pudieron cargar los grados", "error")
      );
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "-";
    const [year, month, day] = fecha.split("-");
    const meses = [
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
    ];
    return `${day} ${meses[parseInt(month) - 1]} ${year}`;
  };

  const cargarCoordinadores = () => {
    fetch("https://tesis-backend-3hgb.onrender.com/users/get-usuarios")
      .then((res) => res.json())
      .then((usuarios) =>
        setResponsables(usuarios.filter((u) => u.rol_id === 2))
      )
      .catch(() =>
        Swal.fire("Error", "No se pudieron cargar los responsables", "error")
      );
  };

  const cargarProyectos = () => {
    fetch("https://tesis-backend-3hgb.onrender.com/admin/get-proyectos")
      .then((res) => res.json())
      .then((data) => {
        const proyectosFormateados = data.map((p) => ({
          ...p,
          fechaInicio: (p.fechaInicio || p.fecha_inicio || "").slice(0, 10),
          fechaFin: (p.fechaFin || p.fecha_fin || "").slice(0, 10),
        }));
        setProyectos(proyectosFormateados);
      })
      .catch(() =>
        Swal.fire("Error", "No se pudieron cargar los proyectos", "error")
      );
  };

  const handleChangeProyecto = (e) => {
    const { name, value } = e.target;
    setFormProyecto((f) => ({ ...f, [name]: value }));
  };

  const agregarProyecto = () => {
    const { titulo, objetivo, grado } = formProyecto;
    if (!titulo.trim() || !objetivo.trim() || !grado) {
      return Swal.fire(
        "Error",
        "Complete los campos obligatorios del proyecto",
        "warning"
      );
    }
    const data = {
      nombre: titulo.trim(),
      objetivos: objetivo.trim(),
      curso_id: Number(formProyecto.grado),
      responsable_id: formProyecto.responsable
        ? Number(formProyecto.responsable)
        : null,
      fecha_inicio: formProyecto.fechaInicio || null,
      fecha_fin: formProyecto.fechaFin || null,
      actividades: "",
    };
    fetch("https://tesis-backend-3hgb.onrender.com/admin/create-proyecto", {
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
      [name]: value,
    }));
  };

  const editarProyecto = async (proyecto) => {
    const gradoEncontrado = grados.find((g) => g.nombre === proyecto.grado);
    const responsableEncontrado = responsables.find(
      (r) => r.nombre_completo === proyecto.responsable
    );

    setEditProyectoId(proyecto.id);
    setEditProyectoData({
      titulo: proyecto.titulo || "",
      objetivo: proyecto.objetivo || "-",
      grado: gradoEncontrado?.id?.toString() || "",
      responsable: responsableEncontrado?.id?.toString() || "",
      fechaInicio: (proyecto.fechaInicio || proyecto.fecha_inicio || "").slice(
        0,
        10
      ),
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
      _original = {},
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
      const res = await fetch(
        `https://tesis-backend-3hgb.onrender.com/admin/update-proyecto/${editProyectoId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Error al actualizar");
      Swal.fire("Éxito", "Proyecto actualizado correctamente", "success");
      setEditProyectoId(null);
      await cargarProyectos();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

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
        const res = await fetch(
          `https://tesis-backend-3hgb.onrender.com/admin/delete-proyecto/${id}`,
          {
            method: "DELETE",
          }
        );
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
        {/* Formulario de creación de proyecto */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            Crear nuevo proyecto
          </h2>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            Proyectos existentes
          </h2>
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
                        {formatearFecha(proyecto.fechaInicio)} -{" "}
                        {formatearFecha(proyecto.fechaFin)}
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
};

export default AdminProyectos;