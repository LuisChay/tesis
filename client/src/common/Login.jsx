import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      const response = await fetch("https://tesis-backend-3hgb.onrender.com/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await response.json();

      if (!response.ok) {
        let mensajeError = "Error al iniciar sesión.";
        switch (data.error) {
          case "Usuario no encontrado":
            mensajeError =
              "El usuario no existe. Por favor verifica el correo.";
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
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-xl relative">
        {/* Botón para regresar al inicio */}
        <Link
          to="/"
          className="absolute top-4 left-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Regresar al inicio"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 mt-4">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
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
      </div>
    </div>
  );
};

export default LoginPage;
