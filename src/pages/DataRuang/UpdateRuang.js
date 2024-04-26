import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdatePelanggan = () => {
    const { id } = useParams();
    const [nomor_lantai, setNomor_lantai] = useState("");
    const [ruangan, setRuangan] = useState("");
    const [keterangan, setKeterangan] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(
                    `http://localhost:2001/DataRuang/${id}`,
                    config
                );
                const dataPelanggan = response.data;

                // Mengisi state dengan data yang didapatkan dari API
                setNomor_lantai(dataPelanggan.nomor_lantai || "");
                setRuangan(dataPelanggan.ruangan || "");
                setKeterangan(dataPelanggan.keterangan || "");
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
                // Tampilkan pesan kesalahan menggunakan library Swal atau alert
                Swal.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan",
                    text: `Gagal memuat data pelanggan: ${error.message}`,
                });
            }
        };

        fetchData();
    }, [id]);

    const nomorLantaiChangeHandler = (event) => {
        setNomor_lantai(event.target.value);
    };

    const ruanganChangeHandler = (event) => {
        setRuangan(event.target.value);
    };

    const keteranganChangeHandler = (event) => {
        setKeterangan(event.target.value);
    };

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
                `http://localhost:2001/DataRuang/${id}`,
                {
                    nomor_lantai,
                    ruangan,
                    keterangan,
                },
                config
            );

            // Jika permintaan berhasil, tampilkan pesan sukses
            Swal.fire({
                icon: "success",
                title: "Edit Berhasil",
                showConfirmButton: false,
                timer: 1500,
            });

            // Redirect ke halaman "/Data-pelanggan"
            window.location.href = "/DataRuang";
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
        // Redirect ke halaman "/Data-Pelanggan"
        window.location.href = "/DataRuang";
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="content-page max-h-screen container p-8 min-h-screen">
                <h1 className="text-3xl font-semibold mb-8">Update Ruang</h1>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <p className="text-lg font-medium mb-4">Update Ruang</p>
                    <form onSubmit={submitActionHandler}>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="mb-4">
                                <label htmlFor="nomor_lantai" className="block text-sm font-medium text-gray-900">
                                    Nomor Lantai
                                </label>
                                <input
                                    type="text"
                                    id="nomor_lantai"
                                    className="form-input w-full mt-1 rounded-lg border-gray-300 focus:border-blue-500"
                                    placeholder="Masukkan Nomor Lantai"
                                    value={nomor_lantai}
                                    onChange={nomorLantaiChangeHandler}
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
                                    onChange={ruanganChangeHandler}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="keterangan" className="block text-sm font-medium text-gray-900">
                                    Keterangan
                                </label>
                                <input
                                    type="text"
                                    id="keterangan"
                                    className="form-input w-full mt-1 rounded-lg border-gray-300 focus:border-blue-500"
                                    placeholder="Masukkan Keterangan"
                                    value={keterangan}
                                    onChange={keteranganChangeHandler}
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
