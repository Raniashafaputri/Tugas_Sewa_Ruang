import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function TableTambahanPeminjaman() {
  const [TambahanPeminjaman, setIteTambahanPeminjaman] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    getAllTambahanPeminjaman();
  }, []);

  const getAllTambahanPeminjaman = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:2001/api/tambahan-peminjaman/all
      `, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIteTambahanPeminjaman(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteItem = async (id) => {
    const token = localStorage.getItem("token");

    await Swal.fire({
      title: "Anda yakin?",
      text: "Yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:2001/api/tambahan-peminjaman/hapus/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Berhasil Menghapus!!",
              showConfirmButton: false,
              timer: 1500,
            });
            getAllTambahanPeminjaman(); // Memuat data kembali setelah menghapus
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      }
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = TambahanPeminjaman.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <Link to={'/AddPeminjaman'}>
              <div className="rounded-lg shadow-xl px-3 py-3 bg-slate-100">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="h-5 w-5 text-blue-500"
                />
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
              {currentItems
                .filter((item) => {
                  // Periksa apakah item tidak null atau undefined sebelum menggunakan properti nama
                  return item && item.nama && item.nama.toLowerCase().includes(searchTerm.toLowerCase());
                })
                .map((item, index) => (
                  <tr key={index}>
                    {/* Kolom Index */}
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    {/* Kolom Nama */}
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {item.nama}
                    </td>
                    {/* Kolom Deskripsi */}
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {item.deskripsi || '-'} {/* Tampilkan '-' jika deskripsi null atau undefined */}
                    </td>
                    {/* Kolom Jenis */}
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {item.jenis || '-'} {/* Tampilkan '-' jika jenis null atau undefined */}
                    </td>
                    {/* Kolom Aksi (Tombol Hapus) */}
                    <td className="whitespace-nowrap text-center py-2">
                      <button
                        className="rounded-full border-2 border-white bg-red-100 p-4 text-red-700 active:bg-red-50"
                        onClick={() => deleteItem(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <ul className="pagination">
              {Array(Math.ceil(TableTambahanPeminjaman.length / itemsPerPage))
                .fill()
                .map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={() => paginate(index + 1)}
                      className="page-link"
                    >
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

export default TableTambahanPeminjaman;
