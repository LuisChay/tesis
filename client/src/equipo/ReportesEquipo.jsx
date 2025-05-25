import React from "react";
import EquipoLayout from "./EquipoLayout";

const ReportesEquipo = () => {
  return (
    <EquipoLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Reportes de Participación
        </h1>
        <p className="text-gray-600 mb-6">
          Aquí puedes visualizar tus estadísticas y avances dentro del equipo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <h2 className="text-sm text-gray-500 uppercase mb-1">Tareas completadas</h2>
            <p className="text-3xl font-bold text-green-700">24</p>
          </div>
          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <h2 className="text-sm text-gray-500 uppercase mb-1">Tareas en curso</h2>
            <p className="text-3xl font-bold text-blue-700">6</p>
          </div>
          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <h2 className="text-sm text-gray-500 uppercase mb-1">Sprints activos</h2>
            <p className="text-3xl font-bold text-yellow-600">2</p>
          </div>
          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <h2 className="text-sm text-gray-500 uppercase mb-1">Colaboraciones</h2>
            <p className="text-3xl font-bold text-gray-800">18</p>
          </div>
        </div>
      </div>
    </EquipoLayout>
  );
};

export default ReportesEquipo;
