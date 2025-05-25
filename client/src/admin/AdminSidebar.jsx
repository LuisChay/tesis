import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass = (path) =>
    `block px-4 py-2 rounded-md font-medium transition ${
      location.pathname === path
        ? "bg-blue-100 text-blue-800"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  const cerrarSesion = () => {
    // Aquí puedes limpiar el token y redirigir
    localStorage.clear(); // o solo removeItem("token") si usas uno
    navigate("/");
  };

  return (
    <aside className="w-64 bg-white border-r shadow-sm min-h-screen p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Administrador</h2>
        <nav className="space-y-3">
          <Link to="/admin/reportes" className={linkClass("/admin/reportes")}>
            Reportes
          </Link>
          <Link to="/admin/crear-cuenta" className={linkClass("/admin/crear-cuenta")}>
            Crear cuentas
          </Link>
          <Link to="/admin/editar-usuarios" className={linkClass("/admin/editar-usuarios")}>
            Editar usuarios
          </Link>
        </nav>
      </div>

      <div className="mt-6">
        <button
          onClick={cerrarSesion}
          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md font-medium transition"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
