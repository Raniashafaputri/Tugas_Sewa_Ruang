import React, { useState, useEffect } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

function AddGuru() {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [mata_pelajaran, setMata_pelajaran] = useState("");
  const [guru, setGuru] = useState([]);

  const addGuru = async (e) => {
    e.preventDefault();

    const newGuru = {
      nama,
      alamat,
      email,
      tanggalLahir,
      noTelepon,
      mata_pelajaran,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/Guru",
        newGuru,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Berhasil ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.href = "/guru";
      }, 1500);
    } catch (error) {
      console.error("Error adding guru:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: "Mohon coba lagi",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const getAllMapel = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:3030/Guru", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMata_pelajaran(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Tambah = () => {
    window.location.href = "/Tambah_guru";
  };
  
  const handleOpen = (id) => {
    window.location.href = `/Edit_guru/${id}`;
  };
  
  const deleteGuru = async (id) => {
    axios
      .delete(`http://localhost:8080/api/Guru/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("error deleting guru:", error);
      });
  };

  const batal = () => {
    window.location.href = "/guru";
  };

  useEffect(() => {
    getAllMapel();
  }, []);

  return (
    <div style={{ background: "#f8f9fa", padding: "20px" }}>
      <Card className="mb-4">
        <Card.Body>
          <h2 style={{ marginBottom: "20px", color: "#495057" }}>Daftar Guru</h2>
          <div style={{ marginBottom: "20px", textAlign: "right" }}>
            <Button variant="success" onClick={Tambah}>
              <FontAwesomeIcon icon={faPlus} /> Tambah Guru
            </Button>
          </div>
          <Table striped bordered hover responsive="md">
            <thead className="thead-dark" style={{ textAlign: "center" }}>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Email</th>
                <th>Tanggal Lahir</th>
                <th>No Telepon</th>
                <th>Mata Pelajaran</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {guru.map((teacher, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{teacher.nama}</td>
                  <td>{teacher.alamat}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.tanggal_lahir}</td>
                  <td>{teacher.no_telepon}</td>
                  <td>{teacher.mata_pelajaran.join(", ")}</td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Button
                        variant="primary"
                        onClick={() => handleOpen(teacher.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteGuru(teacher.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddGuru;
