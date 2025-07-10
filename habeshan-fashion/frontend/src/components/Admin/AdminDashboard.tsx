import React from "react";
import  AdminMenu  from "../Admin/AdminMenu"; // This should be correct
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <AdminMenu />
      <main className="flex-1 p-6 ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;