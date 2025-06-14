import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const ReportesAdmin = () => {
  const [proyectos, setProyectos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [retros, setRetros] = useState([]);
  const [backlog, setBacklog] = useState([]);
  const [estadoProy, setEstadoProy] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [cumplimiento, setCumplimiento] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5100/admin/reporte-proyectos")
      .then((res) => res.json())
      .then(setProyectos);
    fetch("http://localhost:5100/admin/reporte-tareas")
      .then((res) => res.json())
      .then(setTareas);
    fetch("http://localhost:5100/admin/reporte-evaluaciones")
      .then((res) => res.json())
      .then(setEvaluaciones);
    fetch("http://localhost:5100/admin/reporte-retrospectivas")
      .then((res) => res.json())
      .then(setRetros);
    fetch("http://localhost:5100/admin/reporte-backlog")
      .then((res) => res.json())
      .then(setBacklog);
    fetch("http://localhost:5100/admin/reporte-proyectos-estado")
      .then((res) => res.json())
      .then(setEstadoProy);
    fetch("http://localhost:5100/admin/reporte-desempeno")
      .then((res) => res.json())
      .then(setRanking);
    fetch("http://localhost:5100/admin/reporte-cumplimiento-sprint")
      .then((res) => res.json())
      .then(setCumplimiento);
    fetch("http://localhost:5100/admin/reporte-feedback")
      .then((res) => res.json())
      .then(setFeedback);
  }, []);

  const grados = proyectos.map((p) => p.grado);

  const proyectosData = {
    labels: grados,
    datasets: [
      {
        label: "Proyectos",
        data: proyectos.map((p) => p.total_proyectos),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const tareasData = {
    labels: grados,
    datasets: [
      {
        label: "Tareas Totales",
        data: tareas.map((t) => t.total_tareas),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Completadas",
        data: tareas.map((t) => t.tareas_completadas),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const evaluacionesData = {
    labels: grados,
    datasets: [
      {
        label: "Promedio Evaluación",
        data: evaluaciones.map((e) => e.promedio_nota),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.3)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const retroData = {
    labels: retros.map((r) => r.sprint),
    datasets: [
      {
        label: "Retrospectivas",
        data: retros.map((r) => r.total_retrospectivas),
        backgroundColor: "rgba(255, 205, 86, 0.7)",
      },
    ],
  };

  const backlogData = {
    labels: backlog.map((b) => b.grado),
    datasets: [
      {
        label: "Totales",
        data: backlog.map((b) => b.total_tareas),
        backgroundColor: "rgba(201, 203, 207, 0.6)",
      },
      {
        label: "Completadas",
        data: backlog.map((b) => b.tareas_completadas),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const estadoData = {
    labels: estadoProy.map((e) => e.grado),
    datasets: [
      {
        label: "Activos",
        data: estadoProy.map((e) => e.activos),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Finalizados",
        data: estadoProy.map((e) => e.finalizados),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const rankingData = {
    labels: ranking.map((r) => r.grado),
    datasets: [
      {
        label: "Promedio",
        data: ranking.map((r) => r.promedio_nota),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const cumplimientoData = {
    labels: cumplimiento.map((c) => c.sprint),
    datasets: [
      {
        label: "Totales",
        data: cumplimiento.map((c) => c.tareas_totales),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
      {
        label: "Completadas",
        data: cumplimiento.map((c) => c.tareas_completadas),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const feedbackData = {
    labels: feedback.map((f) => f.grado),
    datasets: [
      {
        label: "Con retroalimentación",
        data: feedback.map((f) => f.con_retroalimentacion),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Total Evaluaciones",
        data: feedback.map((f) => f.total_evaluaciones),
        backgroundColor: "rgba(255, 205, 86, 0.6)",
      },
    ],
  };

  const Card = ({ title, children }) => (
    <div className="bg-white border border-gray-100 rounded-xl shadow-md p-4 min-h-[280px]">
      <h3 className="text-center text-gray-800 font-semibold mb-3">{title}</h3>
      <div className="h-[220px]">{children}</div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-8 my-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Reportes del Sistema
        </h1>
        <p className="text-gray-600 mb-6 text-base">
          Visualiza un resumen de proyectos, tareas y desempeño por grado
          académico basado en la gestión ágil.
        </p>

        {/* Sección: Proyectos y tareas */}
        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2 border-b pb-1">
          Resumen General
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Proyectos por Grado">
            <Bar
              data={proyectosData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>
          <Card title="Tareas Totales vs Completadas">
            <Bar
              data={tareasData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>
          <Card title="Promedio de Evaluaciones">
            <Line
              data={evaluacionesData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>
        </div>

        {/* Sección: Evaluación ágil */}
        <h2 className="text-xl font-semibold text-gray-700 mt-10 mb-2 border-b pb-1">
          Evaluación Ágil
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Retrospectivas por Sprint">
            <Bar
              data={retroData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>
          <Card title="Progreso Backlog por Grado">
            <Bar
              data={backlogData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>
          <Card title="Ranking de Desempeño por Grado">
            <Bar
              data={rankingData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>
        </div>

        {/* Sección: Estado y cumplimiento */}
        <h2 className="text-xl font-semibold text-gray-700 mt-10 mb-2 border-b pb-1">
          Estado de Proyectos y Sprints
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <Card title="Proyectos Activos vs Finalizados">
            <Bar
              data={estadoData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>
          <Card title="Cumplimiento por Sprint">
            <Bar
              data={cumplimientoData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>
        </div>

        {/* Sección: Feedback */}
        <h2 className="text-xl font-semibold text-gray-700 mt-10 mb-2 border-b pb-1">
          Retroalimentación
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Evaluaciones con Retroalimentación">
            <Bar
              data={feedbackData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReportesAdmin;
