import React, { useState, useEffect } from "react";
import EquipoLayout from "./EquipoLayout";
import Swal from "sweetalert2";

const DailyEntry = () => {
  const [entradas, setEntradas] = useState([]);
  const [form, setForm] = useState({
    ayer: "",
    avances: "", // Se cambió de hoy a avances
    bloqueos: "",
    fecha: new Date().toISOString().split("T")[0],
  });

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const usuario_id = usuario?.id;

  const [sprints, setSprints] = useState([]);
  const [sprint_id, setSprintId] = useState("");

  // Cargar sprints disponibles
  useEffect(() => {
    fetch("http://localhost:5100/equipo/get-sprints")
      .then((res) => res.json())
      .then((data) => {
        setSprints(data);
        if (data.length > 0) {
          setSprintId(data[0].id); // Seleccionar el primer sprint por defecto
        }
      })
      .catch(() => Swal.fire("Error", "No se pudieron cargar los sprints", "error"));
  }, []);

  // Cargar todas las entradas diarias del usuario
  useEffect(() => {
    if (usuario_id) {
      fetch(`http://localhost:5100/equipo/get-dailys/${usuario_id}`)
        .then((res) => res.json())
        .then(setEntradas)
        .catch(() => Swal.fire("Error", "No se pudieron cargar las entradas diarias", "error"));
    }
  }, [usuario_id]);

  const agregarEntrada = () => {
    if (!form.ayer || !form.avances || !form.bloqueos || !sprint_id) {
      Swal.fire("Campos incompletos", "Por favor completa todos los campos", "warning");
      return;
    }

    const nuevaEntrada = {
      fecha: form.fecha,
      ayer: form.ayer,
      avances: form.avances, // Usamos avances en lugar de hoy
      bloqueos: form.bloqueos,
      usuario_id: usuario_id,
      sprint_id: parseInt(sprint_id, 10),
    };

    fetch("http://localhost:5100/equipo/create-daily", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaEntrada),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error desconocido");

        // Si fue exitoso, recargar lista de dailys
        setForm({
          ayer: "",
          avances: "", // Limpiar avances
          bloqueos: "",
          fecha: new Date().toISOString().split("T")[0],
        });

        // Recargar todas las entradas diarias para que aparezca la nueva
        fetch(`http://localhost:5100/equipo/get-dailys/${usuario_id}`)
          .then((res) => res.json())
          .then(setEntradas);

        Swal.fire("¡Éxito!", "Entrada diaria registrada correctamente", "success");
      })
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
      });
  };

  return (
    <EquipoLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Reunión diaria (Daily)
        </h1>

        <div className="space-y-4 mb-8">
          <select
            value={sprint_id}
            onChange={(e) => setSprintId(e.target.value)}
            className="w-full border rounded px-4 py-2"
          >
            <option value="">Selecciona un sprint</option>
            {sprints.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre}
              </option>
            ))}
          </select>

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
            value={form.avances} // Usamos avances aquí
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

        <h2 className="text-lg font-semibold mb-3">Entradas registradas</h2>
        <ul className="space-y-3">
          {entradas.map((e) => (
            <li key={e.id} className="p-4 border rounded shadow-sm bg-gray-50">
              <p className="text-sm text-gray-700">
                <strong>Fecha:</strong> {e.fecha}
              </p>
              <p className="text-sm"><strong>Ayer:</strong> {e.ayer}</p>
              <p className="text-sm"><strong>Avances:</strong> {e.avances}</p> {/* Cambié "Hoy" por "Avances" */}
              <p className="text-sm"><strong>Bloqueos:</strong> {e.bloqueos}</p>
            </li>
          ))}
        </ul>
      </div>
    </EquipoLayout>
  );
};

export default DailyEntry;
