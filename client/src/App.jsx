import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute";

import LandingPage from './common/Landing';
import LoginPage from './common/Login';

import ReportesAdmin from './admin/ReportesAdmin';
import CrearCuenta from './admin/CrearCuenta';
import EditarUsuarios from './admin/EditarUsuarios';
import AdminProyectos from './admin/Proyectos';
import ConoceElMarcoAdmin from './admin/MarcoAdmin';

import ReportesCoord from './coordinador/ReportesCoord';
import Backlog from './coordinador/Backlog';
import EvaluacionContinua from './coordinador/Evaluacion';
import ConoceElMarcoCoordinador from './coordinador/MarcoCoordinador';

import KanbanBoard from './equipo/Board';
import ReportesEquipo from './equipo/ReportesEquipo';
import SprintPlanner from './equipo/Sprints';
import DailyEntry from './equipo/Dailys';
import Retrospectiva from './equipo/Retrospectiva';
import ConoceElMarcoEquipo from './equipo/MarcoEquipo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin */}
        <Route element={<PrivateRoute roles={[1]} />}>
          <Route path="/admin/reportes" element={<ReportesAdmin />} />
          <Route path="/admin/crear-cuenta" element={<CrearCuenta />} />
          <Route path="/admin/editar-usuarios" element={<EditarUsuarios />} />
          <Route path="/admin/proyectos" element={<AdminProyectos />} />
          <Route path="/admin/marco" element={<ConoceElMarcoAdmin />} />
        </Route>

        {/* Coordinador */}
        <Route element={<PrivateRoute roles={[2]} />}>
          <Route path="/coordinador/reportes" element={<ReportesCoord />} />
          <Route path="/coordinador/actividades" element={<Backlog />} />
          <Route path="/coordinador/evaluacion" element={<EvaluacionContinua />} />
          <Route path="/coordinador/marco" element={<ConoceElMarcoCoordinador />} />
        </Route>

        {/* Equipo */}
        <Route element={<PrivateRoute roles={[3]} />}>
          <Route path="/equipo/tablero" element={<KanbanBoard />} />
          <Route path="/equipo/reportes" element={<ReportesEquipo />} />
          <Route path="/equipo/sprints" element={<SprintPlanner />} />
          <Route path="/equipo/dailys" element={<DailyEntry />} />
          <Route path="/equipo/retrospectiva" element={<Retrospectiva />} />
          <Route path="/equipo/marco" element={<ConoceElMarcoEquipo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
