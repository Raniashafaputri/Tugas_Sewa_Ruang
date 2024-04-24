import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrashAlt, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function TablePeminjamanTempat() {
  const [peminjaman, setPeminjaman] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

 
  useEffect(() => {
    getAllPeminjaman();
  }, []);

  const getAllPeminjaman = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:2001/api/data-peminjaman/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPeminjaman(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deletePeminjaman = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const result = await Swal.fire({
        title: "Anda yakin?",
        text: "Yakin ingin menghapus data ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:2001/api/data-peminjaman/hapus`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Data berhasil dihapus",
          showConfirmButton: false,
          timer: 1500,
        });

        getAllPeminjaman();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Gagal menghapus data",
        text: "Terjadi kesalahan saat menghapus data. Silakan coba lagi.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = peminjaman.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen">
      <Sidebar page="peminjaman" />
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Data Peminjaman Tempat</h1>
        <div className="tabel-peminjaman mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl flex justify-between items-center">
            Data Peminjaman Tempat
            <Link to="/AddpeminjamanTempat">
              <div className="rounded-lg shadow-xl px-3 py-3 bg-blue-100">
                <FontAwesomeIcon icon={faPlus} className="h-5 w-5 text-blue-500" />
              </div>
            </Link>
          </h2>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faSearch} className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Cari Data..."
                value={searchTerm}
                onChange={handleSearch}
                className="px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-s">
              <thead className="text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    NO
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Nama Peminjam
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Ruangan
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Tanggal Peminjaman
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
            {currentItems
              .filter((item) => {
                // Periksa apakah namaPeminjam tidak null atau undefined sebelum menggunakan toLowerCase()
                return item.namaPeminjam && item.namaPeminjam.toLowerCase().includes(searchTerm.toLowerCase());
              })
              .map((item, index) => (
                <tr key={index}>
                  {/* Kolom No */}
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {index + 1}
                  </td>
                  {/* Kolom Nama Peminjam */}
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.namaPeminjam}
                  </td>
                  {/* Kolom lainnya (contoh: Ruangan, Tanggal Peminjaman, Aksi) */}
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.ruangan}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.tanggalPeminjaman}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <div className="flex items-center space-x-4">
                      {/* Link untuk mengedit */}
                      <Link to={`/peminjaman/update/${item.id}`}>
                        <FontAwesomeIcon
                          icon={faPenSquare}
                          className="h-5 w-5 text-blue-500 cursor-pointer"
                        />
                      </Link>
                      {/* Tombol untuk menghapus (dengan onClick handler) */}
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="h-5 w-5 text-red-500 cursor-pointer"
                        onClick={() => deletePeminjaman(item.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <ul className="pagination">
              {Array(Math.ceil(peminjaman.length / itemsPerPage))
                .fill()
                .map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button onClick={() => paginate(index + 1)} className="page-link">
                      {index + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TablePeminjamanTempat;
