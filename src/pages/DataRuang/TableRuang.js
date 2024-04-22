import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrashAlt, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function TableDataRuang() {
  const [dataRuang, setDataRuang] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Mengambil data ruang dari API saat komponen dimuat
  useEffect(() => {
    getAllRuang();
  }, []);

  // Fungsi untuk mengambil semua data ruang dari API
  const getAllRuang = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:8080/api/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDataRuang(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fungsi untuk menghapus data ruang berdasarkan ID
  const deleteRuang = async (id) => {
    const token = localStorage.getItem("token");

    await Swal.fire({
      title: "Anda yakin?",
      text: "Yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/rooms/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Berhasil Menghapus!!",
              showConfirmButton: false,
              timer: 1500,
            });
            getAllRuang(); // Memuat data ruang kembali setelah menghapus
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      }
    });
  };

  // Fungsi untuk melakukan pencarian
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Menghitung indeks item pada halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataRuang
    .filter((ruang) =>
      ruang.roomName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk navigasi halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar page="DataRuang" />

      {/* Konten Tabel Ruang */}
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Data Ruang</h1>
        <div className="tabel-ruang mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl flex justify-between items-center">
            Data Ruang
            <Link to={`/rooms/add-room`}>
              <div className="rounded-lg shadow-xl px-3 py-3 bg-slate-100">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="h-5 w-5 text-blue-500"
                />
              </div>
            </Link>
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
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Ruangan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((ruang, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ruang.roomName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/rooms/edit/${ruang.id}`}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        <FontAwesomeIcon icon={faPenSquare} />
                      </Link>
                      <button
                        onClick={() => deleteRuang(ruang.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
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
        </div>
      </div>
    </div>
  );
}

export default TableDataRuang;
