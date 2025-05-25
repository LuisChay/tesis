import React, { useState } from "react";
import EquipoLayout from "./EquipoLayout";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

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
  });

  const agregarTarea = () => {
    if (formData.titulo.trim() !== "") {
      const nueva = {
        id: `tarea-${Date.now()}`,
        ...formData,
      };

      setColumnas((prev) => ({
        ...prev,
        "Por hacer": [...prev["Por hacer"], nueva],
      }));

      setFormData({
        titulo: "",
        padre: "",
        descripcion: "",
        prioridad: "media",
      });
    }
  };

const onDragEnd = (result) => {
  const { source, destination } = result;
  if (!destination) return;

  const sourceCol = source.droppableId;
  const destCol = destination.droppableId;

  // No movimiento
  if (sourceCol === destCol && source.index === destination.index) return;

  const updatedSource = [...columnas[sourceCol]];
  const movedItem = updatedSource.splice(source.index, 1)[0]; // extraer tarea

  const updatedDest = [...columnas[destCol]];
  updatedDest.splice(destination.index, 0, { ...movedItem }); // insertar copia pura

  setColumnas((prev) => ({
    ...prev,
    [sourceCol]: updatedSource,
    [destCol]: updatedDest,
  }));
};


  return (
    <EquipoLayout>
      {/* Formulario */}
      <div className="mb-6 bg-white p-6 rounded-xl shadow space-y-4 max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-800">Nueva tarea</h3>
        <input
          value={formData.titulo}
          onChange={(e) =>
            setFormData({ ...formData, titulo: e.target.value })
          }
          placeholder="Título"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <input
          value={formData.padre}
          onChange={(e) =>
            setFormData({ ...formData, padre: e.target.value })
          }
          placeholder="Tarea del Backlog educativo"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <textarea
          value={formData.descripcion}
          onChange={(e) =>
            setFormData({ ...formData, descripcion: e.target.value })
          }
          placeholder="Descripción"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <select
          value={formData.prioridad}
          onChange={(e) =>
            setFormData({ ...formData, prioridad: e.target.value })
          }
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="alta">Alta prioridad</option>
          <option value="media">Media prioridad</option>
          <option value="baja">Baja prioridad</option>
        </select>
        <button
          onClick={agregarTarea}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Agregar
        </button>
      </div>

      {/* Tablero */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(columnas).map(([col, tareas]) => (
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
                      <Draggable
                        key={tarea.id}
                        draggableId={tarea.id}
                        index={idx}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`border-l-4 p-4 rounded-xl bg-white shadow-md transition-all hover:shadow-lg space-y-2 ${
                              tarea.prioridad === "alta"
                                ? "border-red-500"
                                : tarea.prioridad === "media"
                                ? "border-yellow-400"
                                : "border-green-500"
                            }`}
                          >
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
                                {tarea.prioridad.charAt(0).toUpperCase() +
                                  tarea.prioridad.slice(1)}
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
