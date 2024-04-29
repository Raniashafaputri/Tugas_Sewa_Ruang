import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddRuang() {
  const [nomor_lantai, setnomor_lantai] = useState("");
  const [ruangan, setRuangan] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const addRuang = async (e) => {
    e.preventDefault();

    const newRuang = {
      nomor_lantai: nomor_lantai,
      ruangan: ruangan,
      keterangan: keterangan,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:2001/DataRuang/add",
        newRuang,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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
        window.location.href = "/DataRuang";
      }, 1500);
    } catch (error) {
      console.error("Error adding ruang:", error);

      if (error.response) {
        // Server memberikan respons dengan status error
        console.error("Server responded with status:", error.response.status);
        console.error("Server responded with data:", error.response.data);

        Swal.fire({
          position: "center",
          icon: "error",
          title: "Terjadi Kesalahan!",
          text: error.response.data.message || "Mohon coba lagi atau hubungi administrator",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // Error tanpa respons dari server
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Terjadi Kesalahan!",
          text: "Gagal menambahkan ruang. Mohon coba lagi atau hubungi administrator",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Tambah Data Ruang</h1>
        <div className="add-room mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl mb-5 font-medium">Tambah Data Ruang</h2>
          <form onSubmit={addRuang}>
            <div className="mb-4">
              <label htmlFor="Nomor_Lantai" className="block text-sm font-medium text-gray-900">
                Nomor Lantai
              </label>
              <input
                type="text"
                id="Nomor_Lantai"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={nomor_lantai}
                onChange={(e) => setnomor_lantai(e.target.value)}
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
              <label htmlFor="keterangan" className="block text-sm font-medium text-gray-900">
                Keterangan
              </label>
              <input
                type="text"
                id="keterangan"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
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
