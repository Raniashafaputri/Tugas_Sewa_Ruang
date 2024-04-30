import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCity,
  faHome,
  faSquarePlus,
  faMap,
  faAddressBook,
  faArrowRight,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
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
    <div className={`sidebar max-h-screen min-h-screen bg-[#40A2D8] min-w-[20%] text-white flex flex-col w-[270px] md:w-[64px] ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
      <button
        className="fixed top-4 left-4 z-50 block lg:hidden text-gray-500"
        onClick={toggleSidebar}
      >
        {showSidebar ? (
          <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
        ) : (
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        )}
      </button>
      <div className="header text-2xl font-bold mx-2 mt-4">Sewa Ruang.com</div>
      <hr className="mt-3" />
      <ul className="mt-4 mx-5">
        {/* Sidebar menu items */}
        <li
          className={`cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg hover:bg-gray-100 hover:text-black ${
            page === "dashboard" ? "bg-gray-100 text-black" : ""
          }`}
        >
          <a href="/dashboard" className="flex gap-5">
            <div>
              <FontAwesomeIcon icon={faHome} /> {/* Gunakan ikon rumah (home) */}
            </div>
            <div className="hidden md:block">Dashboard</div>
          </a>
        </li>
        <li
          className={`cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-gray-100 hover:text-black ${
            page === "guru" ? "bg-gray-100 text-black" : ""
          }`}
        >
          <a href="/DataRuang" className="flex gap-5">
            <div>
              <FontAwesomeIcon icon={faCity} /> {/* Gunakan ikon city */}
            </div>
            <div>Data Ruang</div>
          </a>
        </li>
        <li
          className={`cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-gray-100 hover:text-black ${
            page === "template" ? "bg-gray-100 text-black" : ""
          }`}
        >
          <a href="/Data-Pelanggan" className="flex gap-5">
            <div>
              <FontAwesomeIcon icon={faUsers} /> {/* Gunakan ikon users */}
            </div>
            <div>Data Pelanggan</div>
          </a>
        </li>
         <li
          className={`cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-gray-100 hover:text-black ${
            page === "template" ? "bg-gray-100 text-black" : ""
          }`}
        >
          <a href="/Tambahan Peminjaman" className="flex gap-5">
            <div>
            <FontAwesomeIcon icon={faSquarePlus} /> {/* Gunakan ikon users */}
             </div>
            <div>Menu Tambahan</div>
          </a>
        </li> 
        <li
          className={`cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-gray-100 hover:text-black ${
            page === "template" ? "bg-gray-100 text-black" : ""
          }`}
        >
          <a href="/Peminjaman Tempat" className="flex gap-5">
            <div>
            <FontAwesomeIcon icon={faMap}/> {/* Gunakan ikon users */}
            </div>
            <div>Peminjaman tmpt </div>
          </a>
        </li>
        <li
          className={`cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-gray-100 hover:text-black ${
            page === "template" ? "bg-gray-100 text-black" : ""
          }`}
        >
          <a href="/ReportSewa" className="flex gap-5">
            <div>
            <FontAwesomeIcon icon={faAddressBook}/> {/* Gunakan ikon users */}
            </div>
            <div>Report Sewa </div>
          </a>
        </li>
        {/* Other menu items... */}
      </ul>
      <ul className="mt-auto mb-3 mx-5">
        {/* Logout button */}
        <li className="cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-gray-100 hover:text-black">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            className="flex gap-5"
          >
            <div>
              <FontAwesomeIcon icon={faArrowRight} /> {/* Gunakan ikon arrow right */}
            </div>
            <div className="hidden md:block">Logout</div>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
