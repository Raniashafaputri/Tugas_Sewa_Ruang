import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faSearch, faPenSquare, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

function TableReportSewa() {
  const [reportData, setReportData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    getAllReport();
  }, []);

  const getAllReport = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:2001/api/report/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteReport = async (id) => {
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
        await axios.delete(`http://localhost:2001/api/report/hapus/${id}`, {
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

        getAllReport(); // Perbarui data setelah penghapusan berhasil
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
  const currentItems = reportData
    .filter((item) => item.nama.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen">
      <Sidebar page="mapel" />
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Report Sewa</h1>
        <div className="tabel-mapel mt-12 bg-white p-5 rounded-xl shadow-lg overflow-x-auto">
          <h2 className="text-xl flex justify-between items-center">Report Sewa</h2>
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
          <div className="table-container">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-s">
              <thead className="text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-gray-900">NO</th>
                  <th className="px-4 py-2 font-medium text-gray-900">Nama</th>
                  <th className="px-4 py-2 font-medium text-gray-900">Ruangan</th>
                  <th className="px-4 py-2 font-medium text-gray-900">Kode</th>
                  <th className="px-4 py-2 font-medium text-gray-900">Tambahan</th>
                  <th className="px-4 py-2 font-medium text-gray-900">Total Booking</th>
                  <th className="px-4 py-2 font-medium text-gray-900">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((reportData, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                    <td className="px-4 py-2 text-gray-700">{reportData.nama}</td>
                    <td className="px-4 py-2 text-gray-700">{reportData.ruangan}</td>
                    <td className="px-4 py-2 text-gray-700">{reportData.kode_booking}</td>
                    <td className="px-4 py-2 text-gray-700">{reportData.tambahan}</td>
                    <td className="px-4 py-2 text-gray-700">{reportData.total_booking}</td>
                    <td className="text-center py-2">
                      <div className="flex items-center space-x-1">
                        <Link to={`/ReportSewa/UpdateReport/${reportData.id}`}>
                          <button className="rounded-full border-2 border-white bg-blue-100 p-2 text-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50">
                            <FontAwesomeIcon icon={faPenSquare} title="Edit" />
                          </button>
                        </Link>
                        <button
                          className="rounded-full border-2 border-white bg-red-100 p-2 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                          onClick={() => deleteReport(reportData.id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} title="Delete" />
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
                disabled={currentPage === Math.ceil(reportData.length / itemsPerPage)}
                className={`px-3 py-1 rounded-md bg-blue-500 text-white ${
                  currentPage === Math.ceil(reportData.length / itemsPerPage) ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FontAwesomeIcon icon={faAngleRight} className="inline-block" />
              </button>
            </div>
            <div>
              <p className="text-gray-600 text-sm">
                Page {currentPage} of {Math.ceil(reportData.length / itemsPerPage)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableReportSewa;
