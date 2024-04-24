import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrashAlt, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function TableDataRuang() {
  const [dataRuang, setDataRuang] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const getAllRuang = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:2001/DataRuang/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDataRuang(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteRuang = async (id) => {
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
        await axios.delete(`http://localhost:2001/DataRuang/hapus/${id}`, {
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
  
        // Perbarui data ruangan setelah berhasil menghapus
        getAllRuang();
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
  const currentItems = dataRuang.slice(indexOfFirstItem, indexOfLastItem);
  
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen">
      <Sidebar page="DataRuang" />
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Data Ruang</h1>
        <div className="tabel-ruang mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl flex justify-between items-center">
            Data Ruang
            <Link to={`/AddRuang`}>
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
                placeholder="Cari Ruangan..."
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
                    NOMOR LANTAI
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    RUANGAN
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    KETERANGAN
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    AKSI
                  </th>
                </tr>
                </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((ruang, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                     {/* Kolom Nama */}
                     <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {ruang.nomor_lantai}
                    </td>
                    {/* Kolom No Telepon */}
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {ruang.ruangan || '-'} {/* Tampilkan '-' jika noTelepon null atau undefined */}
                    </td>
                    {/* Kolom Email */}
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {ruang.keterangan || '-'} {/* Tampilkan '-' jika email null atau undefined */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/dataRuang/edit/${ruang.id}`}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        <FontAwesomeIcon icon={faPenSquare} />
                      </Link>
                      <button
                        onClick={() => deleteRuang(ruang.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
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
              {Array(Math.ceil(dataRuang.length / itemsPerPage))
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

export default TableDataRuang;
