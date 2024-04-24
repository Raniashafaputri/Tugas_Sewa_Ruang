import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faTrashAlt,faPlus, faClipboard, faSearch, faUsers } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [dataRuang, setDataRuang] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    getAllRuang();
    getAllPelanggan();
  }, []);

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

  const getAllPelanggan = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:2001/api/data-pelanggan/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPelanggan(response.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const getAllReport = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:2001/api/report/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPelanggan = pelanggan.slice(indexOfFirstItem, indexOfLastItem);
  const currentReportData = reportData.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = reportData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteReport = async (id) => {
    try {
      await axios.delete(`http://localhost:2001/api/report/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getAllReport(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Dashboard</h1>
        {/* Card Section */}
        <div className="card-dashboard grid grid-cols-4 gap-4 mt-12">
          {/* Data Ruangan */}
          <div className="pl-1 h-20 bg-green-400 rounded-lg shadow-md">
            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
              <div className="my-auto">
                <p className="font-bold">DATA RUANGAN</p>
                <p className="text-lg">{dataRuang.length}</p>
              </div>
              <div className="my-auto">
                <FontAwesomeIcon icon={faUsers} />
              </div>
            </div>
          </div>
          {/* Data Pelanggan */}
          <div className="pl-1 h-20 bg-blue-500 rounded-lg shadow-md">
            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
              <div className="my-auto">
                <p className="font-bold">DATA PELANGGAN</p>
                <p className="text-lg">{pelanggan.length}</p>
              </div>
              <div className="my-auto">
                <FontAwesomeIcon icon={faUsers} />
              </div>
            </div>
          </div>
          {/* Item Tambahan */}
          <div className="pl-1 h-20 bg-purple-500 rounded-lg shadow-md">
            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
              <div className="my-auto">
                <p className="font-bold">ITEM TAMBAHAN</p>
              </div>
              <div className="my-auto">
                <FontAwesomeIcon icon={faClipboard} />
              </div>
            </div>
          </div>
          {/* Report Sewa */}
          <div className="pl-1 h-20 bg-yellow-400 rounded-lg shadow-md">
            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
              <div className="my-auto">
                <p className="font-bold">REPORT SEWA</p>
                <p className="text-lg">{reportData.length}</p>
              </div>
              <div className="my-auto">
                <FontAwesomeIcon icon={faBookOpen} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabel Ruangan */}
        <div className="tabel-ruang mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl flex justify-between items-center">
            Data Ruang
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

        {/* Tabel Pelanggan */}
        <div className="tabel-pelanggan mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl flex justify-between items-center">
            Data Pelanggan
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
                    NAMA
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    NO TELEPON
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    EMAIL
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
              {currentItems
                .filter((pelangganData) => {
                  // Periksa apakah properti nama tidak null atau undefined sebelum menggunakan toLowerCase()
                  return pelangganData.nama && pelangganData.nama.toLowerCase().includes(searchTerm.toLowerCase());
                })
                .map((pelangganData, index) => (
                  <tr key={index}>
                    {/* Kolom Index */}
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    {/* Kolom Nama */}
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {pelangganData.nama}
                    </td>
                    {/* Kolom No Telepon */}
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {pelangganData.noTelepon || '-'} {/* Tampilkan '-' jika noTelepon null atau undefined */}
                    </td>
                    {/* Kolom Email */}
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {pelangganData.email || '-'} {/* Tampilkan '-' jika email null atau undefined */}
                    </td>
                    {/* Kolom Aksi (Link Edit dan Tombol Hapus) */}
                    <td className="whitespace-nowrap px-4 py-2">
                      <div className="flex items-center space-x-4">
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <ul className="pagination">
              {Array(Math.ceil(pelanggan.length / itemsPerPage))
                .fill()
                .map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
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
    </div>
  );
}

export default Dashboard;
