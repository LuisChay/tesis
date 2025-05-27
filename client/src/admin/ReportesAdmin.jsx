import React from "react";
import AdminLayout from "./AdminLayout";

const ReportesAdmin = () => {
  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          Reportes del Sistema
        </h1>
        <p className="text-gray-600 mb-4">
          Aquí se mostrarán los reportes generales relacionados a los proyectos, tareas y avances de los equipos educativos. Puedes extender esta sección con filtros por rango de fecha, tipo de proyecto o grado académico.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <h2 className="text-sm text-gray-500 uppercase mb-1">Proyectos activos</h2>
            <p className="text-3xl font-bold text-blue-700">12</p>
          </div>
          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <h2 className="text-sm text-gray-500 uppercase mb-1">Tareas completadas</h2>
            <p className="text-3xl font-bold text-green-700">148</p>
          </div>
          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <h2 className="text-sm text-gray-500 uppercase mb-1">Sprints activos</h2>
            <p className="text-3xl font-bold text-yellow-600">4</p>
          </div>
          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <h2 className="text-sm text-gray-500 uppercase mb-1">Usuarios registrados</h2>
            <p className="text-3xl font-bold text-gray-700">32</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReportesAdmin;
