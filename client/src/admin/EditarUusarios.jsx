import React from "react";
import AdminLayout from "./AdminLayout";

const EditarUsuarios = () => {
  const usuarios = [
    { id: 1, nombre: "María López", rol: "coordinador" },
    { id: 2, nombre: "Carlos Pérez", rol: "equipo" },
    { id: 3, nombre: "Ana Torres", rol: "admin" },
  ];

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Editar Usuarios
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 uppercase text-xs">
                <th className="px-4 py-2 border-b">Nombre</th>
                <th className="px-4 py-2 border-b">Rol</th>
                <th className="px-4 py-2 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b font-medium text-gray-800">
                    {user.nombre}
                  </td>
                  <td className="px-4 py-3 border-b capitalize text-gray-700">
                    {user.rol}
                  </td>
                  <td className="px-4 py-3 border-b space-x-4">
                    <button className="text-blue-600 hover:underline">Editar</button>
                    <button className="text-red-600 hover:underline">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditarUsuarios;
