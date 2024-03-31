import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComp from './components/Navbar';
import Login from './auth/Login';
import Register from './auth/Register';
import Siswa from './components/Siswa';
import Home from './components/Home';
import Tambah from './components/Tambah';
import Guru from './components/Guru';
import Tambah_guru from './components/Tambah_guru';
import Mapel from './components/Mapel';
import Tambah_Mapel from './components/Tambah_mapel';
import Kelas from './components/Kelas';
import Tambah_Kelas from './components/Tambah_kelas';

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComp />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Siswa" element={<Siswa />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Tambah" element={<Tambah />} />
          <Route path="/Guru" element={<Guru />} />
          <Route path="/Tambah_guru" element={<Tambah_guru />} />
          <Route path="/Mapel" element={<Mapel />} />
          <Route path="/Tambah_Mapel" element={<Tambah_Mapel />} />
          <Route path="/Kelas" element={<Kelas />} />
          <Route path="/Tambah_Kelas" element={<Tambah_Kelas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
