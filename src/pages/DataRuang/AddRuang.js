import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function AddRoomData() {
  const [floorNumber, setFloorNumber] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomPhoto, setRoomPhoto] = useState(null);

  const addRoom = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("floorNumber", floorNumber);
    formData.append("roomName", roomName);
    formData.append("roomPhoto", roomPhoto);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/rooms",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type for FormData
          },
        }
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Data Ruang berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset input fields after successful addition
      setFloorNumber("");
      setRoomName("");
      setRoomPhoto(null); // Reset file input
    } catch (error) {
      console.error("Error adding Room Data:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: "Gagal menambahkan data ruang. Mohon coba lagi.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleFileChange = (e) => {
    // Set the selected file for roomPhoto
    setRoomPhoto(e.target.files[0]);
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
              <label htmlFor="floorNumber" className="block text-sm font-medium text-gray-900">
                Nomor Lantai
              </label>
              <input
                type="text"
                id="floorNumber"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={floorNumber}
                onChange={(e) => setFloorNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="roomName" className="block text-sm font-medium text-gray-900">
                Nama Ruangan
              </label>
              <input
                type="text"
                id="roomName"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="roomPhoto" className="block text-sm font-medium text-gray-900">
                Foto Ruang
              </label>
              <input
                type="file"
                id="roomPhoto"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="flex justify-between">
              <Link to="/rooms" className="btn bg-gray-400">
                Batal
              </Link>
              <button type="submit" className="btn bg-blue-500 text-white">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRoomData;
