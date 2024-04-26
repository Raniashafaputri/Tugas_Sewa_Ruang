import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTrashAlt,
   faPlus,
    faSearch,
    faAngleLeft ,
    faAngleRight,
    faPenSquare
  } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function TableTambahanPeminjaman() {
  const [TambahanPeminjaman, setTambahanPeminjaman] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    getAllTambahanPeminjaman();
  }, []);

  const getAllTambahanPeminjaman = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:2001/api/tambahan-peminjaman/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTambahanPeminjaman(response.data);
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
        await axios.delete(`http://localhost:2001/api/tambahan-peminjaman/hapus/${id}`, {
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

        getAllTambahanPeminjaman(); // Memuat data kembali setelah menghapus
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
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = TambahanPeminjaman.slice(indexOfFirstItem, indexOfLastItem);

const filteredData = currentItems.filter((item) => {
  const nama = item.nama ? item.nama.toLowerCase() : '';
  const noTelepon = item.noTelepon ? item.noTelepon.toLowerCase() : '';
  const email = item.email ? item.email.toLowerCase() : '';

  return nama.includes(searchTerm.toLowerCase()) ||
         noTelepon.includes(searchTerm.toLowerCase()) ||
         email.includes(searchTerm.toLowerCase());
});

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar page="TambahanPeminjaman" />

      {/* Konten Tabel */}
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Tambahan Peminjaman</h1>
        <div className="tabel-TambahanPeminjaman mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl flex justify-between items-center">
            Tambahan Peminjaman
            <Link to="/AddPeminjaman">
              <div className="rounded-lg shadow-xl px-3 py-3 bg-slate-100">
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
                    Nama Item
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Deskripsi
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Jenis
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                  <tr key={index}>
                    {/* Kolom Index */}
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    {/* Kolom Nama Item */}
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {item.nama_item}
                    </td>
                    {/* Kolom Deskripsi */}
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {item.deskripsi || "-"} {/* Tampilkan '-' jika deskripsi null atau undefined */}
                    </td>
                    {/* Kolom Jenis */}
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {item.jenis || "-"} {/* Tampilkan '-' jika jenis null atau undefined */}
                    </td>
                    {/* Kolom Aksi (Tombol Hapus) */}
                    <td className="whitespace-nowrap text-center py-2">
                      <div className="flex items-center hover:space-x-1">
                        <Link to={`/Tambahan Peminjaman/UpdateTambahanPeminjaman/${item.id}`}>
                                <button className="rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50">
                            <FontAwesomeIcon icon={faPenSquare} title="UpdatePelanggan" />
                          </button>
                        </Link>
                        <button className="rounded-full border-2 border-white bg-red-100 p-4 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50" onClick={() => deletePeminjaman(TambahanPeminjaman.id)}>
                          <FontAwesomeIcon icon={faTrashAlt} title="  deletePelanggan(TambahanPeminjaman.id)}" />
                        </button>
                      </div>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 mr-2 rounded-md bg-blue-500 text-white ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FontAwesomeIcon icon={faAngleLeft} className="inline-block" />
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(TambahanPeminjaman.length / itemsPerPage)}
                className={`px-3 py-1 rounded-md bg-blue-500 text-white ${
                  currentPage === Math.ceil(TambahanPeminjaman.length / itemsPerPage) ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FontAwesomeIcon icon={faAngleRight} className="inline-block" />
              </button>
            </div>
            <div>
              <p className="text-gray-600 text-sm">
                Page {currentPage} of {Math.ceil(TambahanPeminjaman.length / itemsPerPage)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableTambahanPeminjaman;
