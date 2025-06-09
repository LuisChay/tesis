import React, { useEffect, useState } from "react";
import EquipoLayout from "./EquipoLayout";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const Card = ({ title, children }) => (
  <div className="bg-white border border-gray-100 rounded-xl shadow-md p-4 min-h-[280px]">
    <h3 className="text-center font-medium text-gray-700 mb-3">{title}</h3>
    <div className="h-[200px]">{children}</div>
  </div>
);

const ReportesEquipo = () => {
  const usuario_id = JSON.parse(localStorage.getItem("usuario")).id;

  const [tareas, setTareas] = useState([]);
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [dailys, setDailys] = useState([]);
  const [promedios, setPromedios] = useState([]);
  const [retros, setRetros] = useState([]);
  const [feedback, setFeedback] = useState({
    total_evaluaciones: 0,
    con_retroalimentacion: 0,
    grado: "",
  });
  const [sprints, setSprints] = useState([]);
  const [antiguas, setAntiguas] = useState([]);
  const [racha, setRacha] = useState(0);
  const [promedioGrado, setPromedioGrado] = useState([]);

  const [grados, setGrados] = useState([]);
  const [gradoSeleccionado, setGradoSeleccionado] = useState("");

  // Obtener los grados del usuario (profesor/equipo)
  useEffect(() => {
    fetch(`http://localhost:5100/admin/get-grados-usuario/${usuario_id}`)
      .then((res) => res.json())
      .then(setGrados)
      .catch(() => console.error("Error al cargar grados"));
  }, []);

  useEffect(() => {
    if (!gradoSeleccionado) return;

    const base = `http://localhost:5100/equipo/reportes`;

    fetch(`${base}/tareas-por-grado/${gradoSeleccionado}`)
      .then((res) => res.json())
      .then(setTareas);
    fetch(`${base}/evaluaciones-promedio/${gradoSeleccionado}`)
      .then((res) => res.json())
      .then(setEvaluaciones);
    fetch(`${base}/reporte-dailys-grado/${gradoSeleccionado}`)
      .then((res) => res.json())
      .then(setDailys);
    fetch(`${base}/reporte-promedio-grado/${gradoSeleccionado}`)
      .then((res) => res.json())
      .then(setPromedioGrado);
    fetch(`${base}/retrospectivas-por-sprint/${gradoSeleccionado}`)
      .then((res) => res.json())
      .then(setRetros);
    fetch(`${base}/feedback-por-grado/${gradoSeleccionado}`)
      .then((res) => res.json())
      .then(setFeedback)
      .catch(() =>
        setFeedback({
          total_evaluaciones: 0,
          con_retroalimentacion: 0,
          grado: "",
        })
      );
    fetch(`${base}/sprints-finalizados/${gradoSeleccionado}`)
      .then((res) => res.json())
      .then(setSprints);
    fetch(`${base}/tareas-antiguas/${gradoSeleccionado}`)
      .then((res) => res.json())
      .then(setAntiguas);
    fetch(`${base}/racha-dailys/${gradoSeleccionado}`)
      .then((res) => res.json())
      .then((data) => setRacha(data.dias_consecutivos || 0));
  }, [gradoSeleccionado]);

  const tareasData = {
    labels: tareas.map((t) => t.estado),
    datasets: [
      {
        label: "Cantidad",
        data: tareas.map((t) => t.total),
        backgroundColor: ["#60a5fa", "#f87171", "#facc15", "#34d399"],
      },
    ],
  };

  const evaluacionesData = {
    labels: evaluaciones.map((e) => e.grado),
    datasets: [
      {
        label: "Promedio de Nota",
        data: evaluaciones.map((e) => parseFloat(e.promedio_nota)),
        backgroundColor: "#a78bfa",
      },
    ],
  };

  const dailysData = {
    labels: dailys.map((d) => d.grado),
    datasets: [
      {
        label: "Total Dailys",
        data: dailys.map((d) => d.total_dailys),
        backgroundColor: "#38bdf8",
      },
    ],
  };

  const promedioGradoData = {
    labels: promedioGrado.map((p) => p.grado),
    datasets: [
      {
        label: "Promedio del grado",
        data: promedioGrado.map((p) => p.promedio),
        backgroundColor: "#60a5fa",
      },
    ],
  };

  const retroData = {
    labels: retros.map((r) => r.sprint),
    datasets: [
      {
        label: "Retrospectivas",
        data: retros.map((r) => r.total_retrospectivas),
        backgroundColor: "#fbbf24",
      },
    ],
  };

  const feedbackData = {
    labels: ["Total Evaluaciones", "Con Retroalimentación"],
    datasets: [
      {
        label: `Feedback - ${feedback.grado || "Grado"}`,
        data: [feedback.total_evaluaciones, feedback.con_retroalimentacion],
        backgroundColor: ["#3b82f6", "#10b981"],
      },
    ],
  };

  return (
    <EquipoLayout>

      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
              <div className="mb-6 flex justify-start">
        <select
          value={gradoSeleccionado}
          onChange={(e) => setGradoSeleccionado(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md"
        >
          <option value="">Selecciona un grado</option>
          {grados.map((g) => (
            <option key={g.id} value={g.id}>
              {g.nombre}
            </option>
          ))}
        </select>
      </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Reportes del Equipo
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <Card title="Progreso de Tareas">
            <Bar
              data={tareasData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>
          <Card title="Evaluaciones Recibidas">
            <Bar
              data={evaluacionesData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>
          <Card title="Participación en Dailys">
            <Bar
              data={dailysData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>
          <Card title="Promedio General del Grado">
            <Bar
              data={promedioGradoData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>

          <Card title="Retrospectivas">
            <Bar
              data={retroData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>
          <Card title="Retroalimentación Recibida">
            <Bar
              data={feedbackData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>

          <Card title="Sprints Finalizados">
            <ul className="text-sm list-disc pl-4">
              {sprints.map((s) => (
                <li key={s.id}>
                  {s.nombre} —{" "}
                  {s.fecha_fin
                    ? new Date(s.fecha_fin).toLocaleDateString("es-GT")
                    : "Sin fecha"}
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Tareas Pendientes más Antiguas">
            <ul className="text-sm list-disc pl-4">
              {antiguas.map((t) => (
                <li key={t.id}>
                  {t.titulo} — {new Date(t.fecha_creacion).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </Card>
        </div>


      </div>
    </EquipoLayout>
  );
};

export default ReportesEquipo;
