import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faTrashAlt, faPlus, faClipboard, faSearch, faUsers } from "@fortawesome/free-solid-svg-icons";
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
    getAllReport();
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
      const response = await axios.get(`http://localhost:2001/api/data-pelanggan/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPelanggan(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const filteredData = pelanggan.filter((pelangganData) => {
    const nama = pelangganData.nama ? pelangganData.nama.toLowerCase() : '';
    const noTelepon = pelangganData.noTelepon ? pelangganData.noTelepon.toLowerCase() : '';
    const email = pelangganData.email ? pelangganData.email.toLowerCase() : '';
    return (
      nama.includes(searchTerm.toLowerCase()) ||
      noTelepon.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())
    );
  });

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
          Item Tambahan
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

        {/* Tabel Pelanggan */}
        <div className="tabel-pelanggan mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl flex justify-between items-center">
            Data Pelanggan
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
          </h2>
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
                {filteredData.map((pelangganData, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {pelangganData.nama}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {pelangganData.noTelepon || '-'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {pelangganData.email || '-'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <div className="flex items-center space-x-4">
                        {/* Tambahkan tombol aksi di sini */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
