import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus, faSearch, faPenSquare, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function TableRuang() {
  const [ruang, setRuang] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    getAllRuang();
  }, []);

  const getAllRuang = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:2001/DataRuang/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRuang(response.data);
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

        getAllRuang(); // Ambil ulang data setelah penghapusan
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
    setCurrentPage(1); // Reset halaman saat melakukan pencarian
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = ruang.filter((item) =>
    item.ruangan.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > Math.ceil(filteredData.length / itemsPerPage)) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen">
      <Sidebar page="DataRuang" responsive />
      <div className="content-page max-h-screen container p-5 min-h-screen overflow-x-auto">
        <h1 className="judul text-3xl font-semibold">Data Ruang</h1>
        <div className="tabel-ruang mt-12 bg-white p-5 rounded-xl shadow-lg max-w-full">
          <h2 className="text-xl flex justify-between items-center">
            Data Ruang
            <Link to="/AddRuang">
              <div className="rounded-lg shadow-xl px-3 py-3 bg-blue-100">
                <FontAwesomeIcon icon={faPlus} className="h-5 w-5 text-blue-500" />
              </div>
            </Link>
          </h2>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center w-full">
              <FontAwesomeIcon icon={faSearch} className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Cari Data..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4 max-w-full">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-s">
              <thead className="text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">NO</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">NOMOR LANTAI</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">RUANGAN</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">KETERANGAN</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((ruang, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{indexOfFirstItem + index + 1}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ruang.nomor_lantai}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ruang.ruangan || '-'}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ruang.keterangan || '-'}</td>
                    <td className="whitespace-nowrap text-center py-2">
                      <div className="flex items-center justify-center space-x-2">
                        <Link to={`/DataRuang/UpdateRuang/${ruang.id}`}>
                          <button className="rounded-full border-2 border-white bg-blue-100 p-2 text-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50" title="Edit">
                            <FontAwesomeIcon icon={faPenSquare} />
                          </button>
                        </Link>
                        <button
                          className="rounded-full border-2 border-white bg-red-100 p-2 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                          onClick={() => deleteRuang(ruang.id)}
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                className={`px-3 py-1 rounded-md bg-blue-500 text-white ${
                  currentPage === Math.ceil(filteredData.length / itemsPerPage) ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FontAwesomeIcon icon={faAngleRight} className="inline-block" />
              </button>
            </div>
            <div>
              <p className="text-gray-600 text-sm">
                Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableRuang;
