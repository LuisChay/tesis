import React from "react";
import {
  BookOpen,
  Users,
  Target,
  BarChart3,
  Clock,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Zap,
  Heart,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navbar mejorado */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg px-6 py-4 flex justify-between items-center border-b border-blue-100 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            EduÁgil
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="/sobre-nosotros"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            ¿Qué es Gestión Ágil?
          </a>
          <a
            href="/login"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Iniciar sesión
          </a>
        </div>
      </nav>

      {/* Hero Section mejorado */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 z-10"></div>
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
          <div className="max-w-4xl px-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Transforma la
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                {" "}
                Educación{" "}
              </span>
              con Agilidad
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Un marco ágil especialmente adaptado para proyectos educativos que
              mejora la colaboración, transparencia y eficiencia en los procesos
              académicos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/login"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                Comenzar ahora
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/sobre-nosotros"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Conocer más
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Características principales */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              ¿Por qué elegir metodologías ágiles en educación?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestro marco combina los principios de Scrum y Kanban adaptados
              específicamente para el entorno educativo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Colaboración Mejorada
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Fomenta la colaboración efectiva entre docentes, estudiantes y
                personal administrativo a través de roles claramente definidos.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Objetivos Claros
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Define metas específicas por Sprint semanal con seguimiento
                continuo del progreso y retroalimentación constante.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Transparencia Total
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Visualiza el progreso en tiempo real con tableros Kanban
                interactivos y reportes detallados por área.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Beneficios para tu institución educativa
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Planificación Eficiente
                  </h3>
                  <p className="text-gray-600">
                    Organiza el trabajo en Sprints semanales con objetivos
                    claros y alcanzables.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Reuniones Estructuradas
                  </h3>
                  <p className="text-gray-600">
                    Planificación semanal, reuniones diarias y retrospectivas
                    para mejora continua.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Adaptabilidad
                  </h3>
                  <p className="text-gray-600">
                    Responde rápidamente a cambios y nuevas necesidades del
                    entorno educativo.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Mejora Continua
                </h3>
                <p className="text-gray-600 mb-6">
                  Nuestro marco está diseñado para evolucionar constantemente,
                  adaptándose a las necesidades específicas de cada institución
                  educativa.
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">
                    "La educación del futuro requiere metodologías que se
                    adapten al cambio constante"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <Heart className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para transformar tu institución educativa?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a la revolución educativa y descubre cómo las metodologías
            ágiles pueden mejorar la experiencia de aprendizaje en tu
            institución.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Comenzar ahora
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/sobre-nosotros"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Aprender más
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">EduÁgil</span>
              </div>
              <p className="text-gray-400">
                Marco ágil para la gestión de proyectos en el sector educativo.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Marco Ágil</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Roles educativos</li>
                <li>Sprints semanales</li>
                <li>Tableros Kanban</li>
                <li>Retrospectivas</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Información</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="/sobre-nosotros"
                    className="hover:text-white transition-colors"
                  >
                    ¿Qué es Gestión Ágil?
                  </a>
                </li>
                <li>Universidad de San Carlos</li>
                <li>Facultad de Ingeniería</li>
                <li>2025</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 EduÁgil. Tesis de Luis Manuel Chay Marroquín -
              Universidad de San Carlos de Guatemala.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
