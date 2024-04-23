import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddRuang() {
  const [nomorLantai, setNomorLantai] = useState("");
  const [namaRuangan, setNamaRuangan] = useState("");
  const [fotoRuang, setFotoRuang] = useState(null);

  const addRoom = async (e) => {
    e.preventDefault();

    const newAddRuang = {
      nomor_lantai: nomorLantai,
      nama_ruangan: namaRuangan,
      foto_ruang: fotoRuang,
    };

    // Mendapatkan token dari local storage
    const token = localStorage.getItem("token");

    try {
      // Menambahkan header Authorization dengan token ke dalam permintaan
      const response = await axios.post(
        "http://localhost:2001/DataRuang/add",
        newAddRuang,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Berhasil ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.href = "/guru";
      }, 1500);
    } catch (error) {
      console.error("Error adding ruang:", error);
      if (error.response) {
        // Error response received from server
        console.error("Server responded with status:", error.response.status);
        console.error("Server responded with data:", error.response.data);
      }
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: "Mohon coba lagi atau hubungi administrator",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleFileChange = (e) => {
    // Set the selected file for fotoRuang
    setFotoRuang(e.target.files[0]);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Tambah Data Ruang</h1>
        <div className="add-room mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl mb-5 font-medium">Tambah Data Ruang</h2>
          <form onSubmit={addRoom}>
            <div className="mb-4">
              <label htmlFor="nomorLantai" className="block text-sm font-medium text-gray-900">
                Nomor Lantai
              </label>
              <input
                type="text"
                id="nomorLantai"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={nomorLantai}
                onChange={(e) => setNomorLantai(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="namaRuangan" className="block text-sm font-medium text-gray-900">
                Nama Ruangan
              </label>
              <input
                type="text"
                id="namaRuangan"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={namaRuangan}
                onChange={(e) => setNamaRuangan(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fotoRuang" className="block text-sm font-medium text-gray-900">
                Foto Ruang
              </label>
              <input
                type="file"
                id="fotoRuang"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="block w-20 rounded-lg text-white bg-blue-500 py-3 text-sm font-medium flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRuang;
