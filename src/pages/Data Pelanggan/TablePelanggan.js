import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrashAlt, faPlus, faSearch, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function TableDataPelanggan() {
  const [pelanggan, setPelanggan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    getAllPelanggan();
  }, []);

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

  const deletePelanggan = async (id) => {
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
        await axios.delete(`http://localhost:2001/api/data-pelanggan/hapus/${id}`, {
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

        getAllPelanggan(); // Perbarui data setelah penghapusan berhasil
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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pelanggan.slice(indexOfFirstItem, indexOfLastItem);

  const filteredData = currentItems.filter((pelangganData) => {
    const nama = pelangganData.nama ? pelangganData.nama.toLowerCase() : '';
    const noTelepon = pelangganData.noTelepon ? pelangganData.noTelepon.toLowerCase() : '';
    const email = pelangganData.email ? pelangganData.email.toLowerCase() : '';
  
    return nama.includes(searchTerm.toLowerCase()) ||
           noTelepon.includes(searchTerm.toLowerCase()) ||
           email.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex h-screen">
      <Sidebar page="pelanggan" />
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Data Pelanggan</h1>
        <div className="tabel-pelanggan mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl flex justify-between items-center">
            Data Pelanggan
            <Link to="/AddPelanggan">
              <div className="rounded-lg shadow-xl px-3 py-3 bg-blue-100">
                <FontAwesomeIcon icon={faPlus} className="h-5 w-5 text-blue-500" />
              </div>
            </Link>
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
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((pelangganData, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {indexOfFirstItem + index + 1}
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
                      <div className="flex items-center hover:space-x-1">
                        <Link to={`/Data-pelanggan/Updatepelanggan/${pelangganData.id}`}>
                                <button className="rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50">
                            <FontAwesomeIcon icon={faPenSquare} title="UpdatePelanggan" />
                          </button>
                        </Link>
                        <button className="rounded-full border-2 border-white bg-red-100 p-4 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50" onClick={() => deletePelanggan(pelangganData.id)}>
                          <FontAwesomeIcon icon={faTrashAlt} title="  deletePelanggan(pelangganData.id)}" />
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
                disabled={currentPage === Math.ceil(pelanggan.length / itemsPerPage)}
                className={`px-3 py-1 rounded-md bg-blue-500 text-white ${
                  currentPage === Math.ceil(pelanggan.length / itemsPerPage) ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FontAwesomeIcon icon={faAngleRight} className="inline-block" />
              </button>
            </div>
            <div>
              <p className="text-gray-600 text-sm">
                Page {currentPage} of {Math.ceil(pelanggan.length / itemsPerPage)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableDataPelanggan;
