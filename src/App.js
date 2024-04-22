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
          />
          <Route path="/Data Pelanggan" element={<TablePelanggan />} />
          <Route path="/Data Pelanggan" element={<AddPelanggan />} />
          <Route path="/Tambahan Peminjaman" element={<TablePeminjaman />} />
          <Route path="/Tambahan Peminjaman" element={<AddPeminjaman />} />
          <Route path="/ReportSewa" element={<TableSewa />} />
          <Route path="/DataRuang" element={<TableRuang />} />
          <Route path="/DataRuang" element={<AddRuang />} />
          <Route path="/Peminjaman Tempat" element={<AddPeminjamanTempat />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
