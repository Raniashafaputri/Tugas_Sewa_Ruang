// Tambah.jsx

import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Tambah = ({ setSiswa }) => {
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [alamat, setAlamat] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nama: nama,
      kelas: kelas,
      alamat: alamat,
    };

    try {
      const response = await axios.post(`http://localhost:8080/Tambah`, data);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil menambah data",
          showConfirmButton: false,
          timer: 1500,
        });

        // Update state dengan data siswa baru
        setSiswa(prevSiswa => [...prevSiswa, response.data]);

        // Redirect user to Siswa page after successful addition
        setTimeout(() => {
          navigate("/Siswa");
        }, 1500);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Data tidak dapat ditambahkan",
      });
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Tambah Siswa</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNama">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama siswa"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formKelas">
              <Form.Label>Kelas</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan kelas siswa"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAlamat">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan alamat siswa"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Tambah Data
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Tambah;
