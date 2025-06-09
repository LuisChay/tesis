import React, { useEffect, useState } from "react";
import EquipoLayout from "./EquipoLayout";
import Swal from "sweetalert2";
import GradoSelector from "./GradoSelector";


const Retrospectiva = () => {
  const [form, setForm] = useState({
    puntos_buenos: "",
    puntos_mejorar: "",
    acciones_mejora: "",
    fecha: new Date().toISOString().split("T")[0],
  });

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const usuario_id = usuario?.id;


const [gradoFiltro, setGradoFiltro] = useState(""); // para filtrar historial
const [sprintSeleccionado, setSprintSeleccionado] = useState(""); // sprint elegido en formulario
const [gradoActual, setGradoActual] = useState(""); // grado del sprint seleccionado
  const [sprints, setSprints] = useState([]); // todos los sprints para el select

  const [retros, setRetros] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;
  const retrosPaginados = retros.slice((pagina - 1) * porPagina, pagina * porPagina);
  const totalPaginas = Math.ceil(retros.length / porPagina);

  useEffect(() => {
    fetch("http://localhost:5100/equipo/get-sprints")
      .then((res) => res.json())
      .then(setSprints)
      .catch(() => Swal.fire("Error", "No se pudieron cargar los sprints", "error"));
  }, []);

useEffect(() => {
  if (!usuario_id || !gradoFiltro) return;
  fetch(`http://localhost:5100/equipo/get-retrospectivas-usuario-grado/${usuario_id}/${gradoFiltro}`)
    .then((res) => res.json())
    .then(setRetros)
    .catch(() => Swal.fire("Error", "No se pudieron cargar las retrospectivas", "error"));
}, [usuario_id, gradoFiltro]);



const handleSprintChange = (e) => {
  const id = e.target.value;
  setSprintSeleccionado(id);
  const sprint = sprints.find((s) => s.id === Number(id));
  setGradoActual(sprint?.grado || "—");
};


  const formatearFecha = (fecha) => {
  if (!fecha) return "-";
  const d = new Date(fecha);
  const day = String(d.getDate()).padStart(2, "0");
  const month = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"][d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};


const guardar = () => {
  if (!form.puntos_buenos || !form.puntos_mejorar || !form.acciones_mejora || !sprintSeleccionado) {
    Swal.fire("Completa todos los campos", "", "warning");
    return;
  }

  fetch("http://localhost:5100/equipo/create-retrospectiva", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...form,
      sprint_id: sprintSeleccionado,
      usuario_id,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      Swal.fire("Guardado", "Retrospectiva guardada", "success");
      setForm({
        puntos_buenos: "",
        puntos_mejorar: "",
        acciones_mejora: "",
        fecha: new Date().toISOString().split("T")[0],
      });
      return fetch(`http://localhost:5100/equipo/get-retrospectivas-usuario-grado/${usuario_id}/${gradoFiltro}`);
    })
    .then((res) => res.json())
    .then(setRetros);
};

  const startEdit = (r) => {
    setEditId(r.id);
    setEditData({
      puntos_buenos: r.puntos_buenos,
      puntos_mejorar: r.puntos_mejorar,
      acciones_mejora: r.acciones_mejora,
      fecha: r.fecha?.slice(0, 10),
      sprint_id: r.sprint_id,
      usuario_id: r.usuario_id
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const saveEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:5100/equipo/update-retrospectiva/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setRetros((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...editData } : r))
      );
      cancelEdit();
      Swal.fire("Actualizado", "Retrospectiva actualizada correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const eliminar = (id) => {
    Swal.fire({
      title: "¿Eliminar retrospectiva?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then((res) => {
      if (res.isConfirmed) {
        fetch(`http://localhost:5100/equipo/delete-retrospectiva/${id}`, { method: "DELETE" })
          .then(() => {
            setRetros(retros.filter((r) => r.id !== id));
            Swal.fire("Eliminado", "", "success");
          });
      }
    });
  };

  return (
    <EquipoLayout>
      <div className="max-w-6xl mx-auto p-4">
        {/* FORMULARIO */}
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Registrar Retrospectiva</h1>
          <div className="grid gap-4">
<select
  className="border px-3 py-2 rounded"
  value={sprintSeleccionado}
  onChange={handleSprintChange}
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
              className="border px-3 py-2 rounded"
            />

            <textarea
              placeholder="¿Qué salió bien?"
              value={form.puntos_buenos}
              onChange={(e) => setForm({ ...form, puntos_buenos: e.target.value })}
              className="border px-3 py-2 rounded"
            />

            <textarea
              placeholder="¿Qué se puede mejorar?"
              value={form.puntos_mejorar}
              onChange={(e) => setForm({ ...form, puntos_mejorar: e.target.value })}
              className="border px-3 py-2 rounded"
            />

            <textarea
              placeholder="¿Qué acciones tomaremos?"
              value={form.acciones_mejora}
              onChange={(e) => setForm({ ...form, acciones_mejora: e.target.value })}
              className="border px-3 py-2 rounded"
            />

            <button onClick={guardar} className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Guardar
            </button>
          </div>
        </div>

        {/* TABLA */}
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">

<GradoSelector
  usuarioId={usuario_id}
  gradoSeleccionado={gradoFiltro}
  onSelect={setGradoFiltro}
/>


          <h2 className="text-xl font-bold mb-4 text-gray-800">Historial de Retrospectivas</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm border-collapse">
              <thead>
                <tr className="text-left bg-gray-100">
                  <th className="px-4 py-2 border-b">Fecha</th>
                  <th className="px-4 py-2 border-b">Grado</th>
                  <th className="px-4 py-2 border-b">Puntos Buenos</th>
                  <th className="px-4 py-2 border-b">A mejorar</th>
                  <th className="px-4 py-2 border-b">Acciones a tomar</th>
                  <th className="px-4 py-2 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {retrosPaginados.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">
                      {editId === r.id ? (
                        <input
                          type="date"
                          className="w-full border rounded px-2 py-1"
                          value={editData.fecha}
                          onChange={(e) => setEditData({ ...editData, fecha: e.target.value })}
                        />
                      ) : (
                        formatearFecha(r.fecha)
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">{r.grado || "—"}</td>
                    <td className="px-4 py-2 border-b">
                      {editId === r.id ? (
                        <textarea
                          className="w-full border rounded p-1"
                          value={editData.puntos_buenos}
                          onChange={(e) => setEditData({ ...editData, puntos_buenos: e.target.value })}
                        />
                      ) : (
                        r.puntos_buenos
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {editId === r.id ? (
                        <textarea
                          className="w-full border rounded p-1"
                          value={editData.puntos_mejorar}
                          onChange={(e) => setEditData({ ...editData, puntos_mejorar: e.target.value })}
                        />
                      ) : (
                        r.puntos_mejorar
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {editId === r.id ? (
                        <textarea
                          className="w-full border rounded p-1"
                          value={editData.acciones_mejora}
                          onChange={(e) => setEditData({ ...editData, acciones_mejora: e.target.value })}
                        />
                      ) : (
                        r.acciones_mejora
                      )}
                    </td>
                    <td className="px-4 py-2 border-b space-x-3">
                      {editId === r.id ? (
                        <>
                          <button onClick={() => saveEdit(r.id)} className="text-green-600 hover:underline">
                            Guardar
                          </button>
                          <button onClick={cancelEdit} className="text-gray-600 hover:underline">
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(r)} className="text-blue-600 hover:underline">
                            Editar
                          </button>
                          <button onClick={() => eliminar(r.id)} className="text-red-600 hover:underline">
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

          {/* Paginación */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPagina(pagina - 1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-semibold rounded disabled:opacity-50"
              disabled={pagina === 1}
            >
              Anterior
            </button>
            <span className="text-sm text-gray-700">
              Página {pagina} de {totalPaginas}
            </span>
            <button
              onClick={() => setPagina(pagina + 1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-semibold rounded disabled:opacity-50"
              disabled={pagina === totalPaginas}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </EquipoLayout>
  );
};

export default Retrospectiva;
