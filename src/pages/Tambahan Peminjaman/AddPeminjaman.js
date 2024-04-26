import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

function AddMenuItem() {
  const [nama_item, setnama_item] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [jenis, setJenis] = useState("");

  const addMenuItem = async (e) => {
    e.preventDefault();

    const newItem = {
      nama_item: nama_item,
      deskripsi: deskripsi,
      jenis: jenis,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:2001/api/tambahan-peminjaman/add",
        newItem,
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
        title: "Menu berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.href = "/Tambahan Peminjaman";
      }, 1500);
    } catch (error) {
      console.error("Error adding Peminjaman:", error);

      if (error.response) {
        // Server memberikan respons dengan status error
        console.error("Server responded with status:", error.response.status);
        console.error("Server responded with data:", error.response.data);

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
        <h1 className="judul text-3xl font-semibold">Tambah Menu</h1>
        <div className="add-menu mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl mb-5 font-medium">Tambah Menu</h2>
          <form onSubmit={addMenuItem}>
            <div className="mb-4">
              <label htmlFor="namaItem" className="block text-sm font-medium text-gray-900">
                Nama Item
              </label>
              <input
                type="text"
                id="nama_item"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={nama_item}
                onChange={(e) => setnama_item(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-900">
                Deskripsi
              </label>
              <textarea
                id="deskripsi"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="jenis" className="block text-sm font-medium text-gray-900">
                Jenis
              </label>
              <input
                type="text"
                id="jenis"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
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

export default AddMenuItem;
