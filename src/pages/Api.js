import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faClipboard,
  faSearch,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Dashboard() {
  const [guru, setGuru] = useState([]);
  const [siswa, setSiswa] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [mapel, setMapel] = useState([]);

  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSiswa, setCurrentPageSiswa] = useState(1); // State untuk halaman saat ini data siswa
  const [itemsPerPage] = useState(5);

  const getAllGuru = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:8080/api/data_guru`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGuru(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllSiswa = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:8080/api/data_siswa`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSiswa(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllMapel = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:8080/api/mapel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setKelas(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getAllKelas = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:8080/api/data_kelas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMapel(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllMapel();
    getAllKelas();
    getAllSiswa();
    getAllGuru();
  }, []);

  // Search function for guru
  const handleSearch1 = (event) => {
    setSearchTerm1(event.target.value);
  };

  // Search function for siswa
  const handleSearch2 = (event) => {
    setSearchTerm2(event.target.value);
  };

  // Pagination for guru
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = guru
    .slice(indexOfFirstItem, indexOfLastItem)
    .filter((guruData) =>
      guruData.nama.toLowerCase().includes(searchTerm1.toLowerCase())
    );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination for siswa
  const indexOfLastItemSiswa = currentPageSiswa * itemsPerPage;
  const indexOfFirstItemSiswa = indexOfLastItemSiswa - itemsPerPage;
  const currentItemsSiswa = siswa
    .slice(indexOfFirstItemSiswa, indexOfLastItemSiswa)
    .filter((siswaData) =>
      siswaData.nama_siswa.toLowerCase().includes(searchTerm2.toLowerCase())
    );

  const paginateSiswa = (pageNumber) => setCurrentPageSiswa(pageNumber);

  return (
    <div className="flex h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Dashboard</h1>
        <div className="card-dashboard grid grid-cols-4 gap-4 mt-12">
          {/* Data Guru */}
          <div className="pl-1 h-20 bg-green-400 rounded-lg shadow-md">
            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
              <div className="my-auto">
                <p className="font-bold">DATA GURU</p>
                <p className="text-lg">{guru.length}</p>
              </div>
              <div className="my-auto">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>
          </div>
          {/* Data Siswa */}
          <div className="pl-1 h-20 bg-blue-500 rounded-lg shadow-md">
            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
              <div className="my-auto">
                <p className="font-bold">DATA SISWA</p>
                <p className="text-lg">{siswa.length}</p>
              </div>
              <div className="my-auto">
                <FontAwesomeIcon icon={faUsers} />
              </div>
            </div>
          </div>
          {/* Data Kelas */}
          <div className="pl-1 h-20 bg-purple-500 rounded-lg shadow-md">
            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
              <div className="my-auto">
                <p className="font-bold">DATA KELAS</p>
                <p className="text-lg">{kelas.length}</p>
              </div>
              <div className="my-auto">
                <FontAwesomeIcon icon={faClipboard} />
              </div>
            </div>
          </div>
          {/* Data Mapel */}
          <div className="pl-1 h-20 bg-yellow-400 rounded-lg shadow-md">
            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
              <div className="my-auto">
                <p className="font-bold">DATA MAPEL</p>
                <p className="text-lg">{mapel.length}</p>
              </div>
              <div className="my-auto">
                <FontAwesomeIcon icon={faBookOpen} />
              </div>
            </div>
          </div>
        </div>
        {/* Tabel Guru */}
        <div className="tabel-guru mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl">Tabel guru</h2>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faSearch} className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Cari guru..."
                value={searchTerm1}
                onChange={handleSearch1}
                className="px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    No
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Nama
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Jabatan
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Mapel
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {currentItems.map((guruData, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {guruData.nama}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {guruData.jabatan}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {guruData.mapelModel && guruData.mapelModel.namaMapel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <ul className="pagination">
              {Array(Math.ceil(guru.length / itemsPerPage))
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
        {/* Tabel Siswa */}
        <div className="tabel-siswa mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl">Tabel siswa</h2>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faSearch} className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Cari siswa..."
                value={searchTerm2}
                onChange={handleSearch2}
                className="px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    No
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Nama
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Jurusan
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Kelas
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {currentItemsSiswa.map((siswaData, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {indexOfFirstItemSiswa + index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {siswaData.nama_siswa}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {siswaData.kelasModel.nama_jurusan}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {siswaData.kelasModel.nama_kelas}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <ul className="pagination">
              {Array(Math.ceil(siswa.length / itemsPerPage))
                .fill()
                .map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPageSiswa === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={() => paginateSiswa(index + 1)}
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

export default Dashboard;