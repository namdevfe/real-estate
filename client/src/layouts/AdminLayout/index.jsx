import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "~/components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="text-primary-900 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Page */}
      <Outlet />
    </div>
  );
};

export default AdminLayout;
