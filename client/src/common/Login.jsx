import React, { useState } from "react";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!correo || !contrasena) {
    return Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor ingresa tu correo y contraseña.",
    });
  }

  try {
    const response = await fetch("http://localhost:5100/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contrasena }),
    });

    const data = await response.json();

    if (!response.ok) {
      let mensajeError = "Error al iniciar sesión.";
      switch (data.error) {
        case "Usuario no encontrado":
          mensajeError = "El usuario no existe. Por favor verifica el correo.";
          break;
        case "Contraseña incorrecta":
          mensajeError = "La contraseña no es correcta. Intenta de nuevo.";
          break;
        case "Campos incompletos":
          mensajeError = "Por favor completa todos los campos.";
          break;
        case "Error interno del servidor":
          mensajeError = "Error del servidor, intenta más tarde.";
          break;
      }
      return Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: mensajeError,
      });
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: `Hola, ${data.usuario.nombre}`,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      switch (data.usuario.rol_id) {
        case 1:
          window.location.href = "/admin/marco";
          break;
        case 2:
          window.location.href = "/coordinador/marco";
          break;
        case 3:
          window.location.href = "/equipo/marco";
          break;
        default:
          window.location.href = "/";
      }
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error de conexión",
      text: "No se pudo conectar con el servidor. Intenta más tarde.",
    });
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6 hover:underline cursor-pointer">
          ¿Olvidaste tu contraseña?
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
