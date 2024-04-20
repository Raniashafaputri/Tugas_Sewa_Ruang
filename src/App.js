// App.js

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/login";
import Data_Pelanggan from "./pages/Data Pelanggan/Data_Pelanggan";
import Tambahan_Peminjaman from "./pages/Tambahan_Peminjaman/Tambahan_Peminjaman";
import PeminjamanTempat from './pages/PeminjamanTempat/Peminjaman_Tempat';
import Report_Sewa from "./pages/ReportSewa/Report_Sewa";
import Data_Ruang from "./pages/DataRuang/Data_Ruang"
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
          <Route path="/Data Pelanggan" element={<Data_Pelanggan />} />
          <Route path="/Tambahan Peminjaman" element={<Tambahan_Peminjaman />} />
          <Route path="/PeminjamanTempat" element={<PeminjamanTempat />} />
          <Route path="/ReportSewa" element={<Report_Sewa />} />
          <Route path="/DataRuang" element={<Data_Ruang />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
