import {
  faAddressCard,
  faClipboard,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

  import {
    faArrowRightFromBracket,
    faBook,
    faChartLine,
    faUsers,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  
  import React from "react";
  import Swal from "sweetalert2";
  
  function Sidebar({ page }) {
    function logout() {
      // Tampilkan SweetAlert2 konfirmasi sebelum logout
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
          // Hapus item dari local storage saat logout
          localStorage.removeItem("token");
          // Tampilkan pesan berhasil logout
          Swal.fire({
            title: "Logout Berhasil",
            text: "Anda telah berhasil logout.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          }).then(() => {
            // Redirect ke halaman login setelah menekan tombol OK
            window.location.href = "/";
          });
        }
      });
    }
  
    return (
      <div className="sidebar max-h-screen min-h-screen bg-[#40A2D8] min-w-[20%] text-white flex flex-col w-[270px]">
        <div className="header text-2xl font-bold mx-2 mt-4">Sewa Ruang.com</div>
        <hr className="mt-3" />
        <ul className="mt-4 mx-5">
        <li
            className={`cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg hover:bg-gray-100 hover:text-black ${
              page === "dashboard" ? "bg-gray-100 text-black" : ""
            }`}
          >
            <a href="/dashboard" className="flex gap-5">
              <div>
                <FontAwesomeIcon icon={faChartLine} /> {/* Ikon grafik garis */}
              </div>
              <div>Dashboard</div>
            </a>
          </li>
          <li
            className={`cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-gray-100 hover:text-black ${
              page === "guru" ? "bg-gray-100 text-black" : ""
            }`}
          >
            <a href="/Data Ruang" className="flex gap-5">
              <div>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div>Data Ruang</div>
            </a>
          </li>
          <li
            className={`cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-gray-100 hover:text-black ${
              page === "template" ? "bg-gray-100 text-black" : ""
            }`}
          >
            <a href="/Data Pelanggan" className="flex gap-5">
              <div>
                <FontAwesomeIcon icon={faAddressCard} />
              </div>
              <div>Data Pelanggan</div>
            </a>
          </li>
          <li
            className={`cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-gray-100 hover:text-black ${
              page === "mapel" ? "bg-gray-100 text-black" : ""
            }`}
          >
            <a href="/Menu Tambahan" className="flex gap-5">
              <div>
                <FontAwesomeIcon icon={faBook} />
              </div>
              <div>Menu Tambahan</div>
            </a>
          </li>
          <li
            className={`cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-gray-100 hover:text-black ${
              page === "kelas" ? "bg-gray-100 text-black" : ""
            }`}
          >
            <a href="/Peminjaman Tempat" className="flex gap-5">
              <div>
                <FontAwesomeIcon icon={faClipboard} />
              </div>
              <div>Peminjaman Tempat</div>
            </a>
          </li>
          <li
            className={`cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-gray-100 hover:text-black ${
              page === "Report Sewa" ? "bg-gray-100 text-black" : ""
            }`}
          >
            <a href="/Report Sewa" className="flex gap-5">
              <div>
                <FontAwesomeIcon icon={faClipboard} />
              </div>
              <div>Report Sewa</div>
            </a>
          </li>
        </ul>
        <ul className="mt-auto mb-3 mx-5">
          <li className="cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-gray-100 hover:text-black">
            {/* Panggil fungsi logout saat tombol logout diklik */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              className="flex gap-5"
            >
              <div>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </div>
              <div>Logout</div>
            </a>
          </li>
        </ul>
      </div>
    );
  }
  
  export default Sidebar;