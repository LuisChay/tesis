import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import AdminLayout from "./AdminLayout";

const rolMap = {
  1: "administrador",
  2: "coordinador",
  3: "equipo",
};

const rolInverseMap = {
  coordinador: 2,
  equipo: 3,
};

const EditarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({
    nombre_completo: "",
    correo: "",
    rol_id: 2,
  });

  const [currentPageUsuarios, setCurrentPageUsuarios] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5100/users/get-usuarios")
      .then((res) => res.json())
      .then(setUsuarios)
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error cargando usuarios",
        });
      });
  }, []);

  const startEdit = (user) => {
    setEditUserId(user.id);
    setEditData({
      nombre_completo: user.nombre_completo || user.nombre || "",
      correo: user.correo || "",
      rol_id: user.rol_id || 2,
    });
  };

  const cancelEdit = () => {
    setEditUserId(null);
    setEditData({ nombre_completo: "", correo: "", rol_id: 2 });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      if (editData.rol_id === 1) {
        editData.rol_id = 1; // Forzar rol de admin
      }

      const res = await fetch(
        `http://localhost:5100/users/update-usuario/${editUserId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        }
      );

      const resData = await res.json();

      if (!res.ok) throw new Error(resData.error || "Error actualizando usuario");

      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === editUserId
            ? { ...u, ...editData, rol: rolMap[editData.rol_id] || "coordinador" }
            : u
        )
      );

      Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        timer: 1500,
        showConfirmButton: false,
      });

      cancelEdit();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "No se pudo actualizar el usuario",
      });
    }
  };

  const deleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el usuario permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:5100/users/delete-usuario/${id}`, {
        method: "DELETE",
      });
      const resData = await res.json();

      if (!res.ok) throw new Error(resData.error || "No se pudo eliminar el usuario");

      setUsuarios((prev) => prev.filter((u) => u.id !== id));

      Swal.fire({
        icon: "success",
        title: "Usuario eliminado",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "No se pudo eliminar el usuario",
      });
    }
  };

  const startIndexUsuarios = (currentPageUsuarios - 1) * 5;
  const endIndexUsuarios = startIndexUsuarios + 5;
  const usuariosPaginados = usuarios.slice(startIndexUsuarios, endIndexUsuarios);
  const totalPagesUsuarios = Math.ceil(usuarios.length / 5);

  const cambiarPaginaUsuarios = (page) => {
    if (page < 1 || page > totalPagesUsuarios) return;
    setCurrentPageUsuarios(page);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Editar Usuarios
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm border-t pt-4">
            <thead>
                            <tr className="text-left bg-gray-100">

                <th className="px-4 py-2 border-b">Nombre</th>
                <th className="px-4 py-2 border-b">Correo</th>
                <th className="px-4 py-2 border-b">Rol</th>
                <th className="px-4 py-2 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosPaginados.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b font-medium text-gray-800">
                    {editUserId === user.id ? (
                      <input
                        type="text"
                        name="nombre_completo"
                        value={editData.nombre_completo}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      user.nombre_completo || user.nombre
                    )}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {editUserId === user.id ? (
                      <input
                        type="email"
                        name="correo"
                        value={editData.correo}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      user.correo
                    )}
                  </td>
                  <td className="px-4 py-3 border-b capitalize text-gray-700">
                    {editUserId === user.id ? (
                      user.rol_id === 1 ? (
                        <span className="font-semibold text-red-600">Administrador</span>
                      ) : (
                        <select
                          name="rol_id"
                          value={editData.rol_id}
                          onChange={handleChange}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        >
                          <option value={2}>Coordinador</option>
                          <option value={3}>Equipo</option>
                        </select>
                      )
                    ) : (
                      rolMap[user.rol_id] || user.rol || "coordinador"
                    )}
                  </td>
                  <td className="px-4 py-3 border-b space-x-4">
                    {editUserId === user.id ? (
                      <>
                        <button
                          onClick={saveEdit}
                          className="text-green-600 hover:underline"
                          type="button"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-gray-600 hover:underline"
                          type="button"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(user)}
                          className="text-blue-600 hover:underline"
                          type="button"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
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
              onClick={() => cambiarPaginaUsuarios(currentPageUsuarios - 1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-semibold rounded disabled:opacity-50"
              disabled={currentPageUsuarios === 1}
            >
              Anterior
            </button>

            <span className="text-sm text-gray-700">
              Página {currentPageUsuarios} de {totalPagesUsuarios}
            </span>

            <button
              onClick={() => cambiarPaginaUsuarios(currentPageUsuarios + 1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-semibold rounded disabled:opacity-50"
              disabled={currentPageUsuarios === totalPagesUsuarios}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditarUsuarios;
