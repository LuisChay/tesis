import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-6 bg-gray-50">{children}</main>
    </div>
  );
};

export default AdminLayout;
