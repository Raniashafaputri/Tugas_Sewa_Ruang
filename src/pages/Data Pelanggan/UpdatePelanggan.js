import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdatePelanggan = () => {
    const { id } = useParams();
    const [nama, setNama] = useState("");
    const [noTelepon, setNoTelepon] = useState(""); // Ubah penulisan dari noTelepon menjadi noTelepon
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`http://localhost:2001/api/data-pelanggan/${id}`, config);
                const dataPelanggan = response.data;

                // Mengisi state dengan data yang didapatkan dari API
                setNama(dataPelanggan.nama || "");
                setNoTelepon(dataPelanggan.noTelepon || ""); // Ubah penulisan dari noTelepon menjadi noTelepon
                setEmail(dataPelanggan.email || "");
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
                Swal.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan",
                    text: `Gagal memuat data pelanggan: ${error.message}`,
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
                `http://localhost:2001/api/data-pelanggan/${id}`,
                {
                    nama,
                    noTelepon: noTelepon, // Gunakan noTelepon untuk field nomor_telepon
                    email,
                },
                config
            );

            Swal.fire({
                icon: "success",
                title: "Update Berhasil",
                showConfirmButton: false,
                timer: 1500,
            });

            // Redirect ke halaman "/Data-Pelanggan"
            window.location.href = "/Data-Pelanggan";
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
        // Redirect ke halaman "/Data-Pelanggan"
        window.location.href = "/Data-Pelanggan";
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="content-page max-h-screen container p-8 min-h-screen">
                <h1 className="text-3xl font-semibold mb-8">Update Pelanggan</h1>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <p className="text-lg font-medium mb-4">Update Pelanggan</p>
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
                                <label htmlFor="noTelepon" className="block text-sm font-medium text-gray-900">
                                    Nomor Telepon
                                </label>
                                <input
                                    type="text"
                                    id="noTelepon"
                                    className="form-input w-full mt-1 rounded-lg border-gray-300 focus:border-blue-500"
                                    placeholder="Masukkan Nomor Telepon"
                                    value={noTelepon}
                                    onChange={(e) => setNoTelepon(e.target.value)} // Gunakan setNoTelepon untuk handler
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-input w-full mt-1 rounded-lg border-gray-300 focus:border-blue-500"
                                    placeholder="Masukkan Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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

export default UpdatePelanggan;
