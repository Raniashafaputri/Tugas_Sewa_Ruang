import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddPeminjamanTempat() {
  const [namaPeminjam, setNamaPeminjam] = useState("");
  const [ruangan, setRuangan] = useState("");
  const [tanggalPeminjaman, setTanggalPeminjaman] = useState("");

  const addPeminjamanTempat = async (e) => {
    e.preventDefault();

    const newPeminjaman = {
      namaPeminjam,
      ruangan,
      tanggalPeminjaman,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/peminjaman",
        newPeminjaman
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Peminjaman tempat berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset input fields after successful addition
      setNamaPeminjam("");
      setRuangan("");
      setTanggalPeminjaman("");
    } catch (error) {
      console.error("Error adding Peminjaman Tempat:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: "Gagal menambahkan peminjaman tempat. Mohon coba lagi.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Tambah Peminjaman Tempat</h1>
        <div className="add-menu mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl mb-5 font-medium">Tambah Peminjaman Tempat</h2>
          <form onSubmit={addPeminjamanTempat}>
            <div className="mb-4">
              <label htmlFor="namaPeminjam" className="block text-sm font-medium text-gray-900">
                Nama Peminjam
              </label>
              <input
                type="text"
                id="namaPeminjam"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={namaPeminjam}
                onChange={(e) => setNamaPeminjam(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ruangan" className="block text-sm font-medium text-gray-900">
                Ruangan
              </label>
              <input
                type="text"
                id="ruangan"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={ruangan}
                onChange={(e) => setRuangan(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tanggalPeminjaman" className="block text-sm font-medium text-gray-900">
                Tanggal Peminjaman
              </label>
              <input
                type="date"
                id="tanggalPeminjaman"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={tanggalPeminjaman}
                onChange={(e) => setTanggalPeminjaman(e.target.value)}
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

export default AddPeminjamanTempat;
