import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './common/Landing'
import LoginPage from './common/Login'
import ReportesAdmin from './admin/ReportesAdmin'
import CrearCuenta from './admin/CrearCuenta'
import EditarUsuarios from './admin/EditarUsuarios'
import ReportesCoord from './coordinador/ReportesCoord'
import Backlog from './coordinador/Backlog'
import KanbanBoard from './equipo/Board'
import ReportesEquipo from './equipo/ReportesEquipo'
import AdminProyectos from './admin/Proyectos'
import SprintPlanner from "./equipo/Sprints"
import DailyEntry from "./equipo/Dailys"
import EvaluacionContinua from "./coordinador/Evaluacion";
import Retrospectiva from "./equipo/Retrospectiva";
import ConoceElMarcoAdmin from './admin/MarcoAdmin'
import ConoceElMarcoCoordinador from './coordinador/MarcoCoordinador'
import ConoceElMarcoEquipo from './equipo/MarcoEquipo'

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/reportes" element={<ReportesAdmin />} />
        <Route path="/admin/crear-cuenta" element={<CrearCuenta />} />
        <Route path="/admin/editar-usuarios" element={<EditarUsuarios />} />
        <Route path="/coordinador/reportes" element={<ReportesCoord />} />
        <Route path="/coordinador/actividades" element={<Backlog />} />
        <Route path="/equipo/tablero" element={<KanbanBoard />} />
        <Route path="/equipo/reportes" element={<ReportesEquipo />} />
        <Route path="/admin/proyectos" element={<AdminProyectos />} />
        <Route path="/equipo/sprints" element={<SprintPlanner />} />
        <Route path="/equipo/dailys" element={<DailyEntry />} />
        <Route path="/coordinador/evaluacion" element={<EvaluacionContinua />} />
        <Route path="/equipo/retrospectiva" element={<Retrospectiva />} />
        <Route path="/admin/marco" element={<ConoceElMarcoAdmin />} />
        <Route path="/coordinador/marco" element={<ConoceElMarcoCoordinador />} />
        <Route path="/equipo/marco" element={<ConoceElMarcoEquipo />} />
      </Routes>
    </Router>
  )

}

export default App