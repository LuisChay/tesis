import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CoordSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón hamburguesa - solo visible en móvil */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-lg border"
        aria-label="Abrir menú"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen
        w-80 lg:w-64 
        bg-white border-r shadow-lg lg:shadow-sm
        p-6 flex flex-col justify-between
        transform lg:transform-none transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header con botón cerrar en móvil */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Coordinador</h2>
            <button
              onClick={closeSidebar}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
              aria-label="Cerrar menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-3">
            <Link 
              to="/coordinador/marco" 
              className={linkClass("/coordinador/marco")}
              onClick={closeSidebar}
            >
              Conoce el marco
            </Link>
            <Link 
              to="/coordinador/actividades" 
              className={linkClass("/coordinador/actividades")}
              onClick={closeSidebar}
            >
              Actividades del ciclo
            </Link>
            <Link 
              to="/coordinador/evaluacion" 
              className={linkClass("/coordinador/evaluacion")}
              onClick={closeSidebar}
            >
              Evaluación continua
            </Link>
            <Link 
              to="/coordinador/reportes" 
              className={linkClass("/coordinador/reportes")}
              onClick={closeSidebar}
            >
              Reportes
            </Link>
          </nav>
        </div>

        <div className="mt-6">
          <button
            onClick={() => {
              cerrarSesion();
              closeSidebar();
            }}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md font-medium transition"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
};

export default CoordSidebar;