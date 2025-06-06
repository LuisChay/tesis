import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ roles }) => {
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!token || !usuario) return <Navigate to="/" />;

  if (!roles.includes(usuario.rol_id)) return <Navigate to="/" />;

  return <Outlet />;
};

export default PrivateRoute;
