import React, { useEffect, useState } from "react";

const GradoSelector = ({ usuarioId, onSelect, gradoSeleccionado }) => {
  const [grados, setGrados] = useState([]);

  useEffect(() => {
    if (!usuarioId) return;
    fetch(`http://localhost:5100/admin/get-grados-usuario/${usuarioId}`)
      .then((res) => res.json())
      .then(setGrados)
      .catch(() => setGrados([]));
  }, [usuarioId]);

  return (
    <select
      value={gradoSeleccionado}
      onChange={(e) => onSelect(e.target.value)}
      className="border px-4 py-2 rounded w-full max-w-xs"
    >
      <option value="">Seleccionar grado</option>
      {grados.map((g) => (
        <option key={g.id} value={g.id}>
          {g.nombre}
        </option>
      ))}
    </select>
  );
};

export default GradoSelector;
