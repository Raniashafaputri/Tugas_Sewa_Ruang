import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

function AddPeminjamanTempat() {
  const [nama, setNama] = useState("");
  const [ruangan, setRuangan] = useState("");
  const [kodeBooking, setKodeBooking] = useState("");
  const [tambahan, setTambahan] = useState("");
  const [totalBooking, setTotalBooking] = useState("");
  const [jumlah_orang, setJumlah_orang] = useState(""); // Default jumlah orang adalah 1

  const addPeminjamanTempat = async (e) => {
    e.preventDefault();

    const newPeminjaman = {
      nama,
      ruangan,
      kode_booking: kodeBooking,
      tambahan,
      total_booking: totalBooking,
      jumlah_orang: jumlah_orang,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:2001/api/data-peminjaman/add",
        newPeminjaman,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Peminjaman tempat berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.href = "/Peminjaman Tempat";
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

  // // Fungsi untuk menangani perubahan nilai input jumlah orang
  // const handleChangeJumlahOrang = (e) => {
  //   const value = parseInt(e.target.value); // Ubah nilai menjadi integer
  //   setJumlah_orang(value);
  // };

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
              <label htmlFor="nama" className="block text-sm font-medium text-gray-900">
                Nama Peminjam
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
              <label htmlFor="kodeBooking" className="block text-sm font-medium text-gray-900">
                Kode Booking
              </label>
              <input
                type="text"
                id="kodeBooking"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={kodeBooking}
                onChange={(e) => setKodeBooking(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tambahan" className="block text-sm font-medium text-gray-900">
                Tambahan
              </label>
              <input
                type="text"
                id="tambahan"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={tambahan}
                onChange={(e) => setTambahan(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="totalBooking" className="block text-sm font-medium text-gray-900">
                Total Booking
              </label>
              <input
                type="text"
                id="totalBooking"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={totalBooking}
                onChange={(e) => setTotalBooking(e.target.value)}
                required
              />
            </div>
            {/* Input field untuk jumlah orang */}
            <div className="mb-4">
              <label htmlFor="jumlah_orang" className="block text-sm font-medium text-gray-900">
                jumlah orang
              </label>
              <input
                type="text"
                id="jumlah_orang"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={jumlah_orang}
                onChange={(e) => setJumlah_orang(e.target.value)}
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
