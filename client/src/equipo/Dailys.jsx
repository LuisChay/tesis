import React, { useState, useEffect } from "react";
import EquipoLayout from "./EquipoLayout";
import Swal from "sweetalert2";
import GradoSelector from "./GradoSelector";

const DailyEntry = () => {
  const [entradas, setEntradas] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [form, setForm] = useState({
    ayer: "",
    avances: "",
    bloqueos: "",
    fecha: new Date().toISOString().split("T")[0],
  });

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const usuario_id = usuario?.id;

  const [sprints, setSprints] = useState([]);
  const [sprint_id, setSprintId] = useState("");
  const [gradoActual, setGradoActual] = useState("");

  const [gradoFiltro, setGradoFiltro] = useState("");
  const [gradoFormulario, setGradoFormulario] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const entradasPaginadas = entradas.slice(startIndex, endIndex);
  const totalPages = Math.ceil(entradas.length / ITEMS_PER_PAGE);
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
    if (!gradoFormulario) return;

    fetch(`https://tesis-backend-3hgb.onrender.com/equipo/get-sprints-grado/${gradoFormulario}`)
      .then((res) => res.json())
      .then((data) => {
        setSprints(data);
        if (data.length > 0) {
          setSprintId(data[0].id);
          setGradoActual(data[0].grado || "—");
        }
      })
      .catch(() =>
        Swal.fire(
          "Error",
          "No se pudieron cargar los sprints del grado",
          "error"
        )
      );
  }, [gradoFormulario]);

  useEffect(() => {
    if (usuario_id && gradoFiltro) {
      fetch(
        `https://tesis-backend-3hgb.onrender.com/equipo/get-dailys-usuario-grado/${usuario_id}/${gradoFiltro}`
      )
        .then((res) => res.json())
        .then(setEntradas)
        .catch(() =>
          Swal.fire("Error", "No se pudieron cargar las entradas", "error")
        );
    }
  }, [usuario_id, gradoFiltro]);

  useEffect(() => {
    fetch("https://tesis-backend-3hgb.onrender.com/equipo/get-sprints")
      .then((res) => res.json())
      .then((data) => {
        setSprints(data);
        if (data.length > 0) setSprintId(data[0].id);
      })
      .catch(() =>
        Swal.fire("Error", "No se pudieron cargar los sprints", "error")
      );
  }, []);

  useEffect(() => {
    if (!gradoFormulario && gradoFiltro) {
      setGradoFormulario(gradoFiltro);
    }
  }, [gradoFiltro, gradoFormulario]);

  const agregarEntrada = async () => {
    if (!form.ayer || !form.avances || !form.bloqueos || !sprint_id) {
      return Swal.fire(
        "Campos incompletos",
        "Llena todos los campos",
        "warning"
      );
    }

    try {
      const res = await fetch("https://tesis-backend-3hgb.onrender.com/equipo/create-daily", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          sprint_id: parseInt(sprint_id),
          usuario_id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const nuevasEntradas = await fetch(
        `https://tesis-backend-3hgb.onrender.com/equipo/get-dailys/${usuario_id}`
      ).then((res) => res.json());
      setEntradas(nuevasEntradas);
      setForm({
        ayer: "",
        avances: "",
        bloqueos: "",
        fecha: new Date().toISOString().split("T")[0],
      });

      Swal.fire("Guardado", "Entrada diaria registrada", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const startEdit = (entrada) => {
    setEditId(entrada.id);
    setEditData({
      fecha: entrada.fecha?.split("T")[0],
      ayer: entrada.ayer,
      avances: entrada.avances,
      bloqueos: entrada.bloqueos,
      sprint_id,
      usuario_id,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(
        `https://tesis-backend-3hgb.onrender.com/equipo/update-daily/${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const nuevasEntradas = await fetch(
        `https://tesis-backend-3hgb.onrender.com/equipo/get-dailys/${usuario_id}`
      ).then((res) => res.json());
      setEntradas(nuevasEntradas);
      setEditId(null);
      Swal.fire("Actualizado", "Entrada modificada correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const eliminarEntrada = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar entrada?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `https://tesis-backend-3hgb.onrender.com/equipo/delete-daily/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setEntradas((prev) => prev.filter((e) => e.id !== id));
      Swal.fire("Eliminado", "Entrada eliminada correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <EquipoLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Reunión diaria (Daily)
        </h1>

        {mostrarAlerta && (
          <div className="mb-6">
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md">
              <p className="text-sm">
                📅 Recuerda que estas reuniones diarias deben realizarse cada{" "}
                <strong>martes a jueves con una duración de 15 minutos</strong>{" "}
                para sincronizar avances, identificar obstáculos y planificar el
                día.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4 mb-8">
          <select
            value={sprint_id}
            onChange={(e) => {
              const id = e.target.value;
              setSprintId(id);
              const sprint = sprints.find((s) => s.id === Number(id));
              setGradoActual(sprint?.grado || "—");
            }}
            className="w-full border rounded px-4 py-2"
          >
            <option value="">Selecciona un sprint</option>
            {sprints.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre}
              </option>
            ))}
          </select>

          {gradoActual && (
            <p className="text-sm text-gray-700 italic">
              Grado asignado: <strong>{gradoActual}</strong>
            </p>
          )}

          <input
            type="date"
            value={form.fecha}
            onChange={(e) => setForm({ ...form, fecha: e.target.value })}
            className="w-full border rounded px-4 py-2"
          />

          <textarea
            value={form.ayer}
            onChange={(e) => setForm({ ...form, ayer: e.target.value })}
            placeholder="¿Qué hiciste ayer?"
            className="w-full border rounded px-4 py-2"
          />

          <textarea
            value={form.avances}
            onChange={(e) => setForm({ ...form, avances: e.target.value })}
            placeholder="¿Qué harás hoy?"
            className="w-full border rounded px-4 py-2"
          />

          <textarea
            value={form.bloqueos}
            onChange={(e) => setForm({ ...form, bloqueos: e.target.value })}
            placeholder="¿Tienes algún impedimento?"
            className="w-full border rounded px-4 py-2"
          />

          <button
            onClick={agregarEntrada}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar entrada
          </button>
        </div>
      </div>

      {/* TABLA DE ENTRADAS */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <div className="mb-4">
          <GradoSelector
            usuarioId={usuario_id}
            gradoSeleccionado={gradoFiltro}
            onSelect={setGradoFiltro}
          />
        </div>

        <h2 className="text-lg font-semibold mb-4">Dailys registradas</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm border-collapse">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="px-4 py-2 border-b">Fecha</th>
                <th className="px-4 py-2 border-b">Grado</th>
                <th className="px-4 py-2 border-b">Sprint</th>
                <th className="px-4 py-2 border-b">Ayer</th>
                <th className="px-4 py-2 border-b">Avances</th>
                <th className="px-4 py-2 border-b">Bloqueos</th>
                <th className="px-4 py-2 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {entradasPaginadas.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">
                    {editId === e.id ? (
                      <input
                        type="date"
                        name="fecha"
                        value={editData.fecha}
                        onChange={handleEditChange}
                        className="w-full border rounded px-2 py-1"
                      />
                    ) : (
                      formatearFecha(e.fecha)
                    )}
                  </td>

                  <td className="px-4 py-2 border-b">{e.grado}</td>
                  <td className="px-4 py-2 border-b">{e.sprint}</td>

                  <td className="px-4 py-2 border-b">
                    {editId === e.id ? (
                      <textarea
                        name="ayer"
                        value={editData.ayer}
                        onChange={handleEditChange}
                        className="w-full border rounded px-2"
                      />
                    ) : (
                      e.ayer
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {editId === e.id ? (
                      <textarea
                        name="avances"
                        value={editData.avances}
                        onChange={handleEditChange}
                        className="w-full border rounded px-2"
                      />
                    ) : (
                      e.avances
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {editId === e.id ? (
                      <textarea
                        name="bloqueos"
                        value={editData.bloqueos}
                        onChange={handleEditChange}
                        className="w-full border rounded px-2"
                      />
                    ) : (
                      e.bloqueos
                    )}
                  </td>
                  <td className="px-4 py-2 border-b space-x-2">
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
                          onClick={() => eliminarEntrada(e.id)}
                          className="text-red-600 hover:underline"
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
        </div>

        {/* Paginador */}
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

export default DailyEntry;
