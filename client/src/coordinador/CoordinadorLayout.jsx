
import React from "react";
import CoordSidebar from "./CoordSidebar";

const CoordinadorLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <CoordSidebar />
      <main className="flex-grow p-6 bg-gray-50">{children}</main>
    </div>
  );
};

export default CoordinadorLayout;
