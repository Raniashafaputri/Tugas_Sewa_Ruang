import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddDataPelanggan() {
  const [nama, setNama] = useState("");
  const [no_telepon, setNo_telepon] = useState("");
  const [email, setEmail] = useState("");

  const addPelanggan = async (e) => {
    e.preventDefault();

    const newPelanggan = {
      pelanggan: {
        nama: nama,
        no_telepon: no_telepon,
        email: email,
      },
    };

    const token = localStorage.getItem("token");


    try {
      const response = await axios.post(
        "http://localhost:2001/api/data-pelanggan/add",
        newPelanggan,
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
        window.location.href = "/Data-Pelanggan";
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


  const batal = () => {
    // Reset input fields
    setNama("");
    setNo_telepon("");
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
              <label htmlFor="no_telepon" className="block text-sm font-medium text-gray-900">
                Nomor Telepon
              </label>
              <input
                type="text"
                id="no_telepon"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={no_telepon}
                onChange={(e) => setNo_telepon(e.target.value)}
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
