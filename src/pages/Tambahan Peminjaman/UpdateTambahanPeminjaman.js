import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateTambahanPeminjaman = () => {
    const { id } = useParams();
    const [nama_item, setNama_item] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [jenis, setJenis] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`http://localhost:2001/api/tambahan-peminjaman/${id}`, config);
                const dataTambahanPeminjaman = response.data;

                setNama_item(dataTambahanPeminjaman.nama_item || "");
                setDeskripsi(dataTambahanPeminjaman.deskripsi || "");
                setJenis(dataTambahanPeminjaman.jenis || "");
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
                Swal.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan",
                    text: `Gagal memuat data tambahan peminjaman: ${error.message}`,
                });
            }
        };

        fetchData();
    }, [id]);

    const submitActionHandler = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            await axios.put(
                `http://localhost:2001/api/tambahan-peminjaman/${id}`,
                {
                    nama_item,
                    deskripsi,
                    jenis,
                },
                config
            );

            Swal.fire({
                icon: "success",
                title: "Update Berhasil",
                showConfirmButton: false,
                timer: 1500,
            });

            // Redirect ke halaman "/Data-pelanggan"
            window.location.href = "/Tambahan Peminjaman";
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            // Tampilkan pesan kesalahan menggunakan library Swal atau alert
            Swal.fire({
                icon: "error",
                title: "Terjadi Kesalahan",
                text: `Gagal menyimpan perubahan: ${error.message}`,
            });
        }
    };

    const cancelHandler = () => {
        window.location.href = "/Tambahan Peminjaman";
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="content-page max-h-screen container p-8 min-h-screen">
                <h1 className="text-3xl font-semibold mb-8">Update Tambahan Peminjaman</h1>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <p className="text-lg font-medium mb-4">Update Tambahan Peminjaman</p>
                    <form onSubmit={submitActionHandler}>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="mb-4">
                                <label htmlFor="namaItem" className="block text-sm font-medium text-gray-900">
                                    Nama Item
                                </label>
                                <input
                                    type="text"
                                    id="namaItem"
                                    className="form-input w-full mt-1 rounded-lg border-gray-300 focus:border-blue-500"
                                    placeholder="Masukkan Nama Item"
                                    value={nama_item}
                                    onChange={(e) => setNama_item(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-900">
                                    Deskripsi
                                </label>
                                <input
                                    type="text"
                                    id="deskripsi"
                                    className="form-input w-full mt-1 rounded-lg border-gray-300 focus:border-blue-500"
                                    placeholder="Masukkan Deskripsi"
                                    value={deskripsi}
                                    onChange={(e) => setDeskripsi(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="jenis" className="block text-sm font-medium text-gray-900">
                                    Jenis
                                </label>
                                <input
                                    type="text"
                                    id="jenis"
                                    className="form-input w-full mt-1 rounded-lg border-gray-300 focus:border-blue-500"
                                    placeholder="Masukkan Jenis"
                                    value={jenis}
                                    onChange={(e) => setJenis(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={cancelHandler}
                                className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-black outline outline-red-500 text-sm sm:text-xs font-medium bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FaArrowLeft className="w-4 h-4" />
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-black outline outline-[#0b409c] text-sm sm:text-xs font-medium bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FaSave className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateTambahanPeminjaman;
