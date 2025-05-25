import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-800">Colegio</span>
        </div>
        <div>
          <a
            href="/login"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Iniciar sesión
          </a>
        </div>
      </nav>

      {/* Banner */}
      <div className="relative h-96 w-full bg-gray-100">
        <img
          src="/src/assets/banner.png"
          alt="Banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 right-0 p-4 text-xs text-white italic drop-shadow">
          “Texto opcional o frase aquí”
        </div>
      </div>

      {/* Título centrado */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800">Bienvenidos al sistema de gestión educativa</h2>
        <p className="text-gray-500 mt-2 text-sm">Transformando la educación con agilidad y colaboración</p>
      </section>
    </div>
  );
};

export default LandingPage;
