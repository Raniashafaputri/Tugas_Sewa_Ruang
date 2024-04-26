import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateReport = () => {
    const { id } = useParams();
    const [nama, setNama] = useState("");
    const [ruangan, setRuangan] = useState("");
    const [tambahan, setTambahan] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`http://localhost:2001/api/report/${id}`, config);
                const reportData = response.data;

                setNama(reportData.nama || "");
                setRuangan(reportData.ruangan || "");
                setTambahan(reportData.tambahan || "");
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
                Swal.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan",
                    text: `Gagal memuat data laporan: ${error.message}`,
                });
            }
        };

        fetchData();
    }, [id]);

    const submitActionHandler = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.put(
                `http://localhost:2001/api/report/${id}`,
                {
                    nama,
                    ruangan,
                    tambahan,
                },
                config
            );

            Swal.fire({
                icon: "success",
                title: "Update Berhasil",
                showConfirmButton: false,
                timer: 1500,
            });

            window.location.href = "/report";
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            Swal.fire({
                icon: "error",
                title: "Terjadi Kesalahan",
                text: `Gagal menyimpan perubahan: ${error.message}`,
            });
        }
    };

    const cancelHandler = () => {
        window.location.href = "/report";
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="content-page max-h-screen container p-8 min-h-screen">
                <h1 className="text-3xl font-semibold mb-8">Update Laporan</h1>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <p className="text-lg font-medium mb-4">Update Informasi Laporan</p>
                    <form onSubmit={submitActionHandler}>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="mb-4">
                                <label htmlFor="nama" className="block text-sm font-medium text-gray-900">
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    id="nama"
                                    className="form-input w-full mt-1 rounded-lg border-gray-300 focus:border-blue-500"
                                    placeholder="Masukkan Nama"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="ruangan" className="block text-sm font-medium text-gray-900">
                                    Ruangan
                                </label>
                                <input
                                    type="text"
                                    id="ruangan"
                                    className="form-input w-full mt-1 rounded-lg border-gray-300 focus:border-blue-500"
                                    placeholder="Masukkan Ruangan"
                                    value={ruangan}
                                    onChange={(e) => setRuangan(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="tambahan" className="block text-sm font-medium text-gray-900">
                                    Tambahan
                                </label>
                                <input
                                    type="text"
                                    id="tambahan"
                                    className="form-input w-full mt-1 rounded-lg border-gray-300 focus:border-blue-500"
                                    placeholder="Masukkan Tambahan"
                                    value={tambahan}
                                    onChange={(e) => setTambahan(e.target.value)}
                                    required
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

export default UpdateReport;
