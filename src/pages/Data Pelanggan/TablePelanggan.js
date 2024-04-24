import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrashAlt, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
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

  const addPelanggan = async () => {
  const token = localStorage.getItem("token");

  const newPelanggan = {
    nama: "Nama Pelanggan Baru",
    noTelepon: "08123456789",
    email: "email@example.com",
  };

  try {
    const response = await axios.post(
      "http://localhost:2001/api/data-pelanggan/add",
      newPelanggan,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Setelah berhasil menambahkan, panggil getAllPelanggan() untuk memperbarui data
    getAllPelanggan();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Data berhasil ditambahkan",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.error("Error adding data pelanggan:", error);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Gagal menambahkan data",
      text: "Terjadi kesalahan saat menambahkan data. Silakan coba lagi.",
      showConfirmButton: false,
      timer: 1500,
    });
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
        await axios.delete(`http://localhost:2001/api/data-pelanggan/hapus`, {
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

        getAllPelanggan();
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
  const currentItems = pelanggan.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                        {/* Link untuk mengedit */}
                        <Link to={`/pelanggan/update/${pelangganData.id}`}>
                          <FontAwesomeIcon
                            icon={faPenSquare}
                            className="h-5 w-5 text-blue-500 cursor-pointer"
                          />
                        </Link>
                        {/* Tombol untuk menghapus (dengan onClick handler) */}
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="h-5 w-5 text-red-500 cursor-pointer"
                          onClick={() => deletePelanggan(pelangganData.id)}
                        />
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
  );
}

export default TableDataPelanggan;
