import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EquipoSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass = (path) =>
    `block px-4 py-2 rounded-md font-medium transition ${
      location.pathname === path
        ? "bg-blue-100 text-blue-800"
        : "text-gray-700 hover:bg-gray-100"
    }`;

const cerrarSesion = () => {
  Swal.fire({
    title: "¿Deseas cerrar sesión?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, cerrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        showConfirmButton: false,
        timer: 1200,
      }).then(() => {
        navigate("/login");
      });
    }
  });
};


  return (
<aside className="w-64 bg-white border-r shadow-sm sticky top-0 h-screen p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Equipo</h2>
        <nav className="space-y-3">
          <Link to="/equipo/marco" className={linkClass("/equipo/marco")}>
            Conoce el marco
          </Link>
          <Link to="/equipo/tablero" className={linkClass("/equipo/tablero")}>
            Tablero Kanban
          </Link>
          <Link to="/equipo/sprints" className={linkClass("/equipo/sprints")}>
            Planificación de Sprints
          </Link>
          <Link to="/equipo/dailys" className={linkClass("/equipo/dailys")}>
            Reunión diaria
          </Link>
          <Link to="/equipo/retrospectiva" className={linkClass("/equipo/retrospectiva")}>
            Retrospectiva
          </Link>
          <Link to="/equipo/reportes" className={linkClass("/equipo/reportes")}>
            Reportes
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

export default EquipoSidebar;
