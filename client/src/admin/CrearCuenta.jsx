import React, { useState } from "react";
import Swal from "sweetalert2";
import AdminLayout from "./AdminLayout";

const CrearCuenta = () => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("coordinador");
  const [contrasena, setContrasena] = useState("");

  const rolMap = {
    coordinador: 2,
    equipo: 3
    };

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    nombre_completo: nombreCompleto,
    correo,
    contrasena,
    rol_id: rolMap[rol] || 2,
  };

  try {
    const response = await fetch("http://localhost:5100/users/create-usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resData = await response.json();

    if (!response.ok) {
      let mensajeError = "Error al crear usuario";
      switch (response.status) {
        case 400:
          mensajeError = "Por favor complete todos los campos.";
          break;
        case 409:
          mensajeError = "El correo ya está registrado.";
          break;
        case 500:
          mensajeError = "Error interno del servidor, intenta más tarde.";
          break;
      }

      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: mensajeError,
      });
    }

    Swal.fire({
      icon: "success",
      title: "¡Éxito!",
      text: "Usuario creado correctamente.",
      timer: 1800,
      showConfirmButton: false,
    });

    setNombreCompleto("");
    setCorreo("");
    setContrasena("");
    setRol("coordinador");

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error de conexión",
      text: "No se pudo conectar con el servidor.",
    });
  }
};


  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Crear Cuenta
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Juan Pérez"
              required
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="usuario@colegio.com"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Rol
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            >
              <option value="coordinador">Coordinador</option>
              <option value="profesor">Profesor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Crear
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CrearCuenta;
