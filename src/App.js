// App.js

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/login";
import TablePelanggan from "./pages/Data Pelanggan/TablePelanggan";
import AddPelanggan from "./pages/Data Pelanggan/AddPelanggan";
import TablePeminjaman from "./pages/Tambahan Peminjaman/TablePeminjaman";
import AddPeminjaman from "./pages/Tambahan Peminjaman/AddPeminjaman";
import TableSewa from "./pages/ReportSewa/TableSewa";
import TableRuang from "./pages/DataRuang/TableRuang";
import AddRuang from "./pages/DataRuang/AddRuang";
import TablePeminjamanTempat from "./pages/Peminjaman Tempat/TablePeminjamanTempat";
import AddPeminjamanTempat from "./pages/Peminjaman Tempat/AddPeminjamanTempat";
import Dashboard from "./pages/dashboard/Dashboard";
import { isAuthenticated } from "./utils/auth";
// import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
          />y
           <Route
            path="/Data Pelanggan"
            element={isAuthenticated() ? <TablePelanggan /> : <Navigate to="/" />}
          />
            <Route
            path="/AddPelanggan"
            element={isAuthenticated() ? <AddPelanggan /> : <Navigate to="/" />}
          />
          <Route
            path="/Tambahan Peminjaman"
            element={isAuthenticated() ? <TablePeminjaman /> : <Navigate to="/" />}
          />
          <Route
            path="/AddPeminjaman"
            element={isAuthenticated() ? <AddPeminjaman /> : <Navigate to="/" />}
          />
            <Route
            path="/ReportSewa"
            element={isAuthenticated() ? <TableSewa /> : <Navigate to="/" />}
          />
           <Route
            path="/DataRuang"
            element={isAuthenticated() ? <TableRuang /> : <Navigate to="/" />}
          />
          <Route
            path="/AddRuang"
            element={isAuthenticated() ? <AddRuang /> : <Navigate to="/" />}
          />
             <Route
            path="/Peminjaman Tempat"
            element={isAuthenticated() ? <TablePeminjamanTempat /> : <Navigate to="/" />}
          />
             <Route
            path="/AddPeminjamanTempat"
            element={isAuthenticated() ? <AddPeminjamanTempat /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
