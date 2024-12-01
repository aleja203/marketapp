import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="content-container">
        <Sidebar />
        <main className="main-content">
          <Outlet /> {/* Aquí se renderizan las rutas dinámicas */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
