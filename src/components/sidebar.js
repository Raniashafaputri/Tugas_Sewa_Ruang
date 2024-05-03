import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCity, faHome, faSquarePlus, faMap, faAddressBook, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function Sidebar({ page }) {
  const [showSidebar, setShowSidebar] = useState(false);

  function logout() {
    Swal.fire({
      title: "Logout",
      text: "Apakah Anda yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire({
          title: "Logout Berhasil",
          text: "Anda telah berhasil logout.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/login";
        });
      }
    });
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex flex-col h-full bg-blue-500 text-white">
      <div className="header text-3xl font-bold mx-4 mt-6 mb-4">
        Sewa Ruang.com
      </div>
      <hr className="mt-3" />
      <ul className="mt-4 mx-6 flex-grow">
        {/* Sidebar menu items */}
        <li
          className={`cursor-pointer text-lg px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-black ${
            page === "dashboard" ? "bg-gray-100 text-black" : ""
          }`}
        >
          <a href="/dashboard" className="flex items-center gap-3">
            <FontAwesomeIcon icon={faHome} size="lg" />
            <span className="hidden md:block text-lg">Dashboard</span>
          </a>
        </li>
        <li
          className={`cursor-pointer text-lg px-4 py-2 rounded-lg mt-3 hover:bg-gray-100 hover:text-black ${
            page === "guru" ? "bg-gray-100 text-black" : ""
          }`}
        >
          <a href="/DataRuang" className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCity} size="lg" />
            <span className="hidden md:block text-lg">Data Ruang</span>
          </a>
        </li>
        <li
          className={`cursor-pointer text-lg px-4 py-2 rounded-lg mt-3 hover:bg-gray-100 hover:text-black ${
            page === "template" ? "bg-gray-100 text-black" : ""
          }`}
        >
          <a href="/Data-Pelanggan" className="flex items-center gap-3">
            <FontAwesomeIcon icon={faUsers} size="lg" />
            <span className="hidden md:block text-lg">Data Pelanggan</span>
          </a>
        </li>
        <li
          className={`cursor-pointer text-lg px-4 py-2 rounded-lg mt-3 hover:bg-gray-100 hover:text-black ${
            page === "template" ? "bg-gray-100 text-black" : ""
          }`}
        >
          <a href="/Tambahan Peminjaman" className="flex items-center gap-3">
            <FontAwesomeIcon icon={faSquarePlus} size="lg" />
            <span className="hidden md:block text-lg">Menu Tambahan</span>
          </a>
        </li>
        <li
          className={`cursor-pointer text-lg px-4 py-2 rounded-lg mt-3 hover:bg-gray-100 hover:text-black ${
            page === "template" ? "bg-gray-100 text-black" : ""
          }`}
        >
          <a href="/Peminjaman Tempat" className="flex items-center gap-3">
            <FontAwesomeIcon icon={faMap} size="lg" />
            <span className="hidden md:block text-lg">Peminjaman Tempat</span>
          </a>
        </li>
        <li
          className={`cursor-pointer text-lg px-4 py-2 rounded-lg mt-3 hover:bg-gray-100 hover:text-black ${
            page === "template" ? "bg-gray-100 text-black" : ""
          }`}
        >
          <a href="/ReportSewa" className="flex items-center gap-3">
            <FontAwesomeIcon icon={faAddressBook} size="lg" />
            <span className="hidden md:block text-lg">Report Sewa</span>
          </a>
        </li>
        {/* Other menu items... */}
      </ul>
      <ul className="mt-auto mb-3 mx-6">
        {/* Logout button */}
        <li className="cursor-pointer text-lg px-4 py-2 rounded-lg mt-3 hover:bg-gray-100 hover:text-black">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            className="flex items-center gap-3"
          >
            <FontAwesomeIcon icon={faArrowRight} size="lg" />
            <span className="hidden md:block text-lg">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
