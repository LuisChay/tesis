import React from "react";
import EquipoSidebar from "./EquipoSidebar";

const EquipoLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <EquipoSidebar />
      <main className="flex-grow p-6 bg-gray-50">{children}</main>
    </div>
  );
};

export default EquipoLayout;
