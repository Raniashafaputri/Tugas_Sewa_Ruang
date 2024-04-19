import React, { useState } from "react";
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
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSiswa, setCurrentPageSiswa] = useState(1);
  const [itemsPerPage] = useState(5);

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
                <p className="font-bold">DATA RUANGAN</p>
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
                <p className="font-bold">DATA PELANGGAN</p>
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
                <p className="font-bold">ITEM TAMBAHAN</p>
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
                <p className="font-bold">REPORT SEWA</p>
              </div>
              <div className="my-auto">
                <FontAwesomeIcon icon={faBookOpen} />
              </div>
            </div>
          </div>
        </div>
        {/* Tabel Guru
        <div className="tabel-guru mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl">Tabel guru</h2>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faSearch} className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Cari guru..."
                value={searchTerm1}
                className="px-3 py-2 border rounded-md"
                onChange={(e) => setSearchTerm1(e.target.value)}
              />
            </div>
          </div>
          {/* Tabel Siswa */}
          {/* <div className="tabel-siswa mt-12 bg-white p-5 rounded-xl shadow-lg">
            <h2 className="text-xl">Tabel siswa</h2>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faSearch} className="mr-2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Cari siswa..."
                  value={searchTerm2}
                  className="px-3 py-2 border rounded-md"
                  onChange={(e) => setSearchTerm2(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div> */} 
      </div>
    </div>
  );
}

export default Dashboard;
