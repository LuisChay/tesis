import React, { useState, useEffect } from "react";
import EquipoLayout from "./EquipoLayout";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import GradoSelector from "./GradoSelector";

const columnasIniciales = {
  "Por hacer": [],
  "En proceso": [],
  "En revisión": [],
  Hecho: [],
};



const KanbanBoard = () => {
  const [columnas, setColumnas] = useState(columnasIniciales);
const [formData, setFormData] = useState({
  titulo: "",
  padre: "",
  descripcion: "",
  prioridad: "media",
  grado_id: "",
});
const [tareasOcultas, setTareasOcultas] = useState([]);


  const [alerta, setAlerta] = useState(null);
  const [grados, setGrados] = useState([]);
  const [gradoSeleccionado, setGradoSeleccionado] = useState("");

  useEffect(() => {
    fetch("http://localhost:5100/admin/get-grados")
      .then((res) => res.json())
      .then(setGrados)
      .catch(() => console.error("Error al cargar grados"));
  }, []);

  const [backlog, setBacklog] = useState([]);

useEffect(() => {
  fetch("http://localhost:5100/coord/get-backlog")
    .then((res) => res.json())
    .then(setBacklog)
    .catch(() => console.error("Error al cargar backlog"));
}, []);


  useEffect(() => {
  if (!gradoSeleccionado) return;

  fetch(`http://localhost:5100/equipo/get-tareas/${gradoSeleccionado}`)
    .then((res) => res.json())
    .then((tareas) => {
      // Organiza las tareas por estado
      const nuevasColumnas = {
        "Por hacer": [],
        "En proceso": [],
        "En revisión": [],
        "Hecho": [],
      };

      tareas.forEach((t) => {
        if (nuevasColumnas[t.estado]) {
          nuevasColumnas[t.estado].push(t);
        }
      });
      setColumnas(nuevasColumnas);
    })
    .catch(() => console.error("Error al cargar tareas"));
}, [gradoSeleccionado]);


const finalizarTarea = async (id) => {
  try {
    const res = await fetch(`http://localhost:5100/equipo/culminar-tarea/${id}`, {
      method: "PUT",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    // Visualmente eliminarla del estado
    setColumnas((prev) => {
      const nuevas = { ...prev };
      for (const col of Object.keys(nuevas)) {
        nuevas[col] = nuevas[col].filter((t) => t.id !== id);
      }
      return nuevas;
    });
  } catch (err) {
    console.error("Error al marcar como culminada:", err.message);
  }
};



  const [mostrarModal, setMostrarModal] = useState(false);

const agregarTarea = async () => {
  if (formData.titulo.trim() === "" || !formData.padre) {
    return setAlerta("Faltan campos requeridos");
  }

  try {
    const nuevaTarea = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      prioridad: formData.prioridad,
      estado: "Por hacer",
      backlog_id: formData.padre,  // ← corregido
      sprint_id: null,             // si no estás usando sprint aún
      asignado_a: null             // si aún no hay asignación
    };

    const res = await fetch("http://localhost:5100/equipo/create-tarea", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaTarea),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    // Buscamos info extra del backlog (para mostrar en la tarjeta)
    const tareaBacklog = backlog.find(b => b.id === parseInt(formData.padre));

    setColumnas((prev) => ({
      ...prev,
      "Por hacer": [
        ...prev["Por hacer"],
        {
          id: data.id,
          ...nuevaTarea,
          padre: tareaBacklog?.titulo || "",
          grado_id: tareaBacklog?.curso_id || "",
        },
      ],
    }));

    setFormData({
      titulo: "",
      padre: "",
      descripcion: "",
      prioridad: "media",
      grado_id: "",
    });

    setMostrarModal(false);
    setAlerta(null);
  } catch (err) {
    setAlerta("Error al crear tarea: " + err.message);
  }
};



const onDragEnd = async (result) => {
  const { source, destination } = result;
  if (!destination) return;

  const sourceCol = source.droppableId;
  const destCol = destination.droppableId;

  if (sourceCol === destCol && source.index === destination.index) return;

  // Validar límite para columna En proceso
  if (
    destCol === "En proceso" &&
    columnas["En proceso"].length >= 4 &&
    sourceCol !== "En proceso"
  ) {
    setAlerta("La columna 'En proceso' solo puede contener hasta 4 tareas.");
    setTimeout(() => setAlerta(null), 3000);
    return;
  }

  const updatedSource = [...columnas[sourceCol]];
  const movedItem = updatedSource.splice(source.index, 1)[0];

  const updatedDest = [...columnas[destCol]];
  updatedDest.splice(destination.index, 0, { ...movedItem, estado: destCol });

  // Actualizar visualmente
  setColumnas((prev) => ({
    ...prev,
    [sourceCol]: updatedSource,
    [destCol]: updatedDest,
  }));

  // Guardar en la base de datos
  try {
    const res = await fetch(`http://localhost:5100/equipo/update-estado/${movedItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: destCol }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
  } catch (err) {
    console.error("Error al actualizar estado:", err);
    setAlerta("No se pudo actualizar el estado en la base de datos");
  }
};

const columnasFiltradas = Object.fromEntries(
  Object.entries(columnas).map(([estado, tareas]) => [
    estado,
    gradoSeleccionado
      ? tareas.filter((t) => parseInt(t.grado_id) === parseInt(gradoSeleccionado))
      : tareas,
  ])
);


  return (
    <EquipoLayout>

      <div className="max-w-6xl mx-auto mb-4 flex justify-between items-center">
  <button
    onClick={() => setMostrarModal(true)}
    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
  >
    Nueva tarea
  </button>

<GradoSelector
  usuarioId={JSON.parse(localStorage.getItem("usuario"))?.id}
  gradoSeleccionado={gradoSeleccionado}
  onSelect={setGradoSeleccionado}
/>

</div>


      {/* Modal */}
{mostrarModal && (
<div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[9999]">
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg space-y-4 relative">
      <button
        onClick={() => setMostrarModal(false)}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>

      <h3 className="text-xl font-semibold text-gray-800">Nueva tarea</h3>

      <input
        value={formData.titulo}
        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
        placeholder="Título"
        className="w-full border border-gray-300 rounded-md px-4 py-2"
      />

      <select
        value={formData.padre}
        onChange={(e) => {
          const selectedId = e.target.value;
          const tarea = backlog.find((b) => b.id === parseInt(selectedId));
          setFormData({
            ...formData,
            padre: selectedId,
            grado_id: tarea?.curso_id || "",
          });
        }}
        className="w-full border border-gray-300 rounded-md px-4 py-2"
      >
        <option value="">Selecciona una tarea del Backlog</option>
        {backlog.map((b) => (
          <option key={b.id} value={b.id}>
            {b.titulo}
          </option>
        ))}
      </select>

      {/* Mostrar grado como texto */}
      {formData.grado_id && (
        <p className="text-sm text-gray-600 italic">
          Grado asociado: <strong>{grados.find(g => g.id === parseInt(formData.grado_id))?.nombre || "—"}</strong>
        </p>
      )}

      <textarea
        value={formData.descripcion}
        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        placeholder="Descripción"
        className="w-full border border-gray-300 rounded-md px-4 py-2"
      />

      <select
        value={formData.prioridad}
        onChange={(e) => setFormData({ ...formData, prioridad: e.target.value })}
        className="w-full border border-gray-300 rounded-md px-4 py-2"
      >
        <option value="alta">Alta prioridad</option>
        <option value="media">Media prioridad</option>
        <option value="baja">Baja prioridad</option>
      </select>

      <div className="flex justify-end">
        <button
          onClick={agregarTarea}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Agregar tarea
        </button>
      </div>
    </div>
  </div>
)}


      {/* Alerta */}
      {alerta && (
        <div className="max-w-2xl mx-auto mb-4">
          <div className="flex items-center justify-between bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-md shadow">
            <p className="text-sm">{alerta}</p>
            <button
              onClick={() => setAlerta(null)}
              className="text-sm font-semibold hover:underline ml-4"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}





      {/* Tablero */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(columnasFiltradas).map(([col, tareas]) => (
            <Droppable key={col} droppableId={col}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-50 border rounded-xl p-4 min-h-[400px] flex flex-col shadow-sm"
                >
                  <h3 className="text-center text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
                    {col}
                  </h3>
                  <div className="flex-grow space-y-3">
{tareas.map((tarea, idx) => (
<Draggable key={String(tarea.id)} draggableId={String(tarea.id)} index={idx}>
  {(provided) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`relative border-l-4 p-4 rounded-xl bg-white shadow-md transition-all hover:shadow-lg space-y-2 ${
        tarea.prioridad === "alta"
          ? "border-red-500"
          : tarea.prioridad === "media"
          ? "border-yellow-400"
          : "border-green-500"
      }`}
    >
      {/* Botón "X" */}
      <button
        className="absolute top-2 right-3 text-gray-400 hover:text-green-600 font-bold"
        onClick={() => finalizarTarea(tarea.id)}
        title="Marcar como finalizada"
      >
        ✕
      </button>

      {/* Contenido de la tarjeta */}
      <h4 className="text-base font-semibold text-gray-800">
        {tarea.titulo}
      </h4>
      <p className="text-xs text-gray-500 italic">
        Backlog: {tarea.padre || "Sin asignar"}
      </p>
      <p className="text-sm text-gray-700">{tarea.descripcion}</p>
      <div className="flex justify-end">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            tarea.prioridad === "alta"
              ? "bg-red-100 text-red-700"
              : tarea.prioridad === "media"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {tarea.prioridad.charAt(0).toUpperCase() + tarea.prioridad.slice(1)}
        </span>
      </div>
    </div>
  )}
</Draggable>

))}

                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </EquipoLayout>
  );
};

export default KanbanBoard;
