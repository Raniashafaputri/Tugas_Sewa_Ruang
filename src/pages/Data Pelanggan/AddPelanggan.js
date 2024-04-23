import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddDataPelanggan() {
  const [nama, setNama] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [email, setEmail] = useState("");

  const addPelanggan = async (e) => {
    e.preventDefault();

    const newPelanggan = {
      pelanggan: {
        nama: nama,
        noTelepon: noTelepon,
        email: email,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:2001/api/data-pelanggan/add",
        newPelanggan
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Data Pelanggan berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset input fields after successful addition
      setNama("");
      setNoTelepon("");
      setEmail("");
    } catch (error) {
      console.error("Error adding Pelanggan:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: "Gagal menambahkan data Pelanggan. Mohon coba lagi.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const batal = () => {
    // Reset input fields
    setNama("");
    setNoTelepon("");
    setEmail("");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Tambah Data Pelanggan</h1>
        <div className="add-pelanggan mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl mb-5 font-medium">Tambah Pelanggan</h2>
          <form onSubmit={addPelanggan} onReset={batal}>
            <div className="mb-4">
              <label htmlFor="nama" className="block text-sm font-medium text-gray-900">
                Nama Pelanggan
              </label>
              <input
                type="text"
                id="nama"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="noTelepon" className="block text-sm font-medium text-gray-900">
                Nomor Telepon
              </label>
              <input
                type="text"
                id="noTelepon"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={noTelepon}
                onChange={(e) => setNoTelepon(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default AddDataPelanggan;
