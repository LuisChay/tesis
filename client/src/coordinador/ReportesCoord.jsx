import React, { useEffect, useState } from "react";
import CoordinadorLayout from "./CoordinadorLayout";
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
    <div className="h-[220px]">{children}</div>
  </div>
);

const ReportesCoord = () => {
  const coordinador_id = JSON.parse(localStorage.getItem("usuario")).id;
  const [tareasEstado, setTareasEstado] = useState([]);
  const [dailys, setDailys] = useState([]);
  const [promedios, setPromedios] = useState([]);
  const [retros, setRetros] = useState([]);
  const [actividad, setActividad] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [cumplimiento, setCumplimiento] = useState([]);
  const [tareasAntiguas, setTareasAntiguas] = useState([]);
  const [participacionGrados, setParticipacionGrados] = useState([]);

  useEffect(() => {
    const base = `http://localhost:5100/coord`;
    fetch(`${base}/reporte-tareas-estado/${coordinador_id}`)
      .then((res) => res.json())
      .then(setTareasEstado);
    fetch(`${base}/reporte-participacion-grado/`)
      .then((res) => res.json())
      .then(setParticipacionGrados);
    fetch(`${base}/reporte-promedio-estudiantes/${coordinador_id}`)
      .then((res) => res.json())
      .then(setPromedios);
    fetch(`${base}/reporte-retrospectivas/${coordinador_id}`)
      .then((res) => res.json())
      .then(setRetros);
    fetch(`${base}/reporte-actividad-backlog/${coordinador_id}`)
      .then((res) => res.json())
      .then(setActividad);
    fetch(`${base}/reporte-ranking-estudiantes/${coordinador_id}`)
      .then((res) => res.json())
      .then(setRanking);
    fetch(`${base}/reporte-cumplimiento-tareas/${coordinador_id}`)
      .then((res) => res.json())
      .then(setCumplimiento);
    fetch(`${base}/reporte-tareas-antiguas/${coordinador_id}`)
      .then((res) => res.json())
      .then(setTareasAntiguas);
  }, []);

  const agrupadoPorGrado = tareasEstado.reduce((acc, cur) => {
    if (!acc[cur.grado]) acc[cur.grado] = {};
    acc[cur.grado][cur.estado] = cur.total;
    return acc;
  }, {});

  const grados = Object.keys(agrupadoPorGrado);
  const estados = ["Por hacer", "En proceso", "En revisión", "Culminado"];

  const tareasEstadoData = {
    labels: grados,
    datasets: estados.map((estado, i) => ({
      label: estado,
      data: grados.map((g) => agrupadoPorGrado[g][estado] || 0),
      backgroundColor: `rgba(${80 + i * 30}, ${99 + i * 25}, ${
        255 - i * 25
      }, 0.6)`,
    })),
  };

  const participacionData = {
    labels: participacionGrados.map((g) => g.grado),
    datasets: [
      {
        label: "Total de Dailys",
        data: participacionGrados.map((g) => g.total_dailys),
        backgroundColor: "#60a5fa",
      },
    ],
  };

  const promediosData = {
    labels: promedios.map((p) => p.grado),
    datasets: [
      {
        label: "Promedio por grado",
        data: promedios.map((p) => p.promedio),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const rankingData = {
    labels: ranking.map((r) => r.grado),
    datasets: [
      {
        label: "Ranking por promedio",
        data: ranking.map((r) => r.promedio),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const dailysGradoData = {
    labels: dailys.map((d) => d.grado),
    datasets: [
      {
        label: "Total de Dailys",
        data: dailys.map((d) => d.total_dailys),
        backgroundColor: "#93c5fd",
      },
    ],
  };

  const retroData = {
    labels: retros.map((r) => r.sprint),
    datasets: [
      {
        label: "Retrospectivas",
        data: retros.map((r) => r.total_retrospectivas),
        backgroundColor: "rgba(255, 206, 86, 0.7)",
      },
    ],
  };

  const actividadData = {
    labels: actividad.map((a) => a.grado),
    datasets: [
      {
        label: "Tareas creadas",
        data: actividad.map((a) => a.tareas_creadas),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const cumplimientoData = {
    labels: cumplimiento.map((c) => c.estudiante),
    datasets: [
      {
        label: "Asignadas",
        data: cumplimiento.map((c) => c.tareas_asignadas),
        backgroundColor: "rgba(201, 203, 207, 0.6)",
      },
      {
        label: "Cumplidas",
        data: cumplimiento.map((c) => c.tareas_cumplidas),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const tareasAntiguasListado = tareasAntiguas.map((t) => (
    <li key={t.titulo} className="text-sm text-gray-700">
      {t.titulo} — {t.grado} —{" "}
      <span className="text-gray-500">
        {new Date(t.fecha_creacion).toLocaleDateString()}
      </span>
    </li>
  ));

  return (
    <CoordinadorLayout>
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Reportes del Área
        </h1>
        <p className="text-gray-600 mb-6">
          En esta sección puedes consultar los indicadores de avance por curso,
          grado académico o Sprint.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Tareas por grado y estado">
            <Bar
              data={tareasEstadoData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>

          <Card title="Participación por Grado">
            <Bar
              data={participacionData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>

          <Card title="Promedios de Evaluación">
            <Bar
              data={promediosData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>

          <Card title="Retrospectivas por Sprint">
            <Bar
              data={retroData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>

          <Card title="Actividad en Backlog">
            <Bar
              data={actividadData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>

          <Card title="Ranking de Grados">
            <Bar
              data={rankingData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>

          <div className="bg-white border border-gray-100 rounded-xl shadow-md p-4 md:col-span-2">
            <h3 className="text-center font-medium text-gray-700 mb-3">
              Tareas más antiguas sin cerrar
            </h3>
            <ul className="list-disc px-4">{tareasAntiguasListado}</ul>
          </div>
        </div>
      </div>
    </CoordinadorLayout>
  );
};

export default ReportesCoord;
