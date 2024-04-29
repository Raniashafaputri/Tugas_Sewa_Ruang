import React, { useState } from 'react';
import { FaBars, FaBuilding, FaChartLine, FaSignInAlt, FaUsers, FaCalendarCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    function logout(event) {
        event.preventDefault();
    
        Swal.fire({
          title: 'Logout',
          text: 'Apakah Anda yakin ingin keluar?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Batal'
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("token");
            window.location.href = "/";
          }
        });
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <>
            <button
                className="fixed top-4 left-4 z-50 block lg:hidden text-gray-500"
                onClick={toggleSidebar}
            >
                {showSidebar ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
            <aside
                id="default-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-blue-900 dark:bg-blue-900 lg:translate-x-0 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-blue-500 dark:bg-blue-500">
                    <div className="flex items-center justify-center mb-3">
                        <span className="text-xl font-bold text-gray-800">Sewa Ruang</span>
                    </div>
                    <hr className="mt-3" />
                    <ul className="mt-4 mx-5">
                        <li className="cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-blue-100 hover:text-black">
                            <a href="/supervisor" 
                                className="flex items-center p-2 text-blue-200 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-blue-500 group">
                                <FaChartLine className="inline-block w-6 h-6 mr-2 -mt-2" />
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li>
                        <li className="cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-blue-100 hover:text-black">
                            <a href="/master_pelanggan" 
                                className="flex items-center p-2 text-blue-200 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-blue-500 group">
                                <FaUsers className="inline-block w-6 h-6 mr-2 -mt-2" />
                                <span className="ms-3">Data pelanggan</span>
                            </a>
                        </li>
                        <li className="cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-blue-100 hover:text-black">
                            <a href="/data_ruangan" 
                                className="flex items-center p-2 text-blue-200 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-blue-500 group">
                                <FaBuilding className="inline-block w-6 h-6 mr-2 -mt-2" />
                                <span className="ms-3">Data Ruang</span>
                            </a>
                        </li>
                        <li className="cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-blue-100 hover:text-black">
                            <a href="/peminjaman_tempat" 
                                className="flex items-center p-2 text-blue-200 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-blue-500 group">
                                <FaCalendarCheck className="inline-block w-6 h-6 mr-2 -mt-2" />
                                <span className="ms-3">Penyewaan Aula Acara</span>
                            </a>
                        </li>
                        <li className="cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-blue-100 hover:text-black">
                            <a href="/menu_tambahan" 
                                className="flex items-center p-2 text-blue-200 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-blue-500 group">
                                <FaBars className="inline-block w-6 h-6 mr-2 -mt-2" />
                                <span className="ms-3">Opsi Tambahan</span>
                            </a>
                        </li>
                    </ul>
                    <ul className="mt-auto mb-3 mx-5">
                        <li className="cursor-pointer text-[19px] px-3 pt-2 pb-1 rounded-lg mt-4 hover:bg-blue-100 hover:text-black">
                            <a href="/" 
                                className="flex items-center p-2 text-blue-200 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-blue-500 group"
                                onClick={logout}
                            >
                                <FaSignInAlt className="inline-block w-6 h-6 mr-2 -mt-2" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;